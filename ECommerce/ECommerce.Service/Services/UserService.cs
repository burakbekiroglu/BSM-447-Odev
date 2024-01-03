using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ECommerce.Service.Dtos;
using ECommerce.Service.Entities.ECommerceDB;
using ECommerce.Service.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ECommerce.Service.Services
{
    public interface IUserService
    {
        Task<GeneralDto.Response> SaveAsync(UserDto.SaveRequest model);
        Task<GeneralDto.Response> LoginAsync(UserDto.LoginRequest model);
        Task<GeneralDto.Response<UserDto.Authorized>> GetUserByTokenAsync(int userId);
        Task<GeneralDto.Response> GetUserAsync(int id);

    }
    public class UserService : IUserService
    {
        private readonly ECommerceDbContext _context;
        private readonly AppSettings _appSettings;
        public UserService(ECommerceDbContext context, IOptions<AppSettings> options)
        {
            _context = context;
            _appSettings = options.Value;
        }

        public async Task<GeneralDto.Response> LoginAsync(UserDto.LoginRequest model)
        {
            var user = await _context.User
                .FirstOrDefaultAsync(f => f.Email == model.Email && f.Password == model.Password);

            if (user == null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Incorrect email or password!"
            };


            return new GeneralDto.Response
            {
                Error = false,
                Data = GetJtwToken(user),
            };
        }
        private string GetJtwToken(User user)
        {
            var claimsList = new List<Claim>
            {
                new Claim(ClaimTypes.UserData,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.FirstName),
                new Claim(ClaimTypes.Surname,user.LastName),
                new Claim(ClaimTypes.Email,user.Email),
            };



            byte[] key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimsList.ToArray()),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<GeneralDto.Response> SaveAsync(UserDto.SaveRequest model)
        {
            if (model.Id == 0)
            {
                var user = new User();
                user.TypeId = model.TypeId;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.Phone = model.Phone;
                user.Password = model.Password;
                user.CreatedDate = DateTime.Now;
                await _context.User.AddAsync(user);
            }
            else
            {
                var existUser = await _context.User.FirstOrDefaultAsync(f => f.Id == model.Id);
                if (existUser is null) return new GeneralDto.Response
                {
                    Error = true,
                    Message = "User could not found"
                };

                existUser.FirstName = model.FirstName;
                existUser.LastName = model.LastName;
                existUser.Email = model.Email;
                existUser.Phone = model.Phone;
                existUser.Password = model.Password;
                existUser.UpdatedDate = DateTime.Now;
                _context.User.Update(existUser);
            }
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "User saved successfully"
            };
        }

        public async Task<GeneralDto.Response<UserDto.Authorized>> GetUserByTokenAsync(int userId)
        {
            var user = await _context.User
                .FirstOrDefaultAsync(f => f.Id == userId);
            if (user == null) return new GeneralDto.Response<UserDto.Authorized>
            {
                Error = true,
                Message = "Invalid user"
            };

            return new GeneralDto.Response<UserDto.Authorized>
            {
                Error = false,
                Data = new UserDto.Authorized
                {
                    Id = userId,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    TypeId = user.TypeId,
                }
            };
        }

        public async Task<GeneralDto.Response> GetUserAsync(int id)
        {
            var user = await _context.User.Where(w => w.Id == id).Select(s => new UserDto.PersonalInfo
            {
                Id = s.Id,
                TypeId = s.TypeId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                Password = s.Password,
                Phone = s.Phone

            }).FirstOrDefaultAsync();

            if (user is null) return new GeneralDto.Response
            {
                Error = true,
            };

            return new GeneralDto.Response
            {
                Error = false,
                Data = user
            };
        }
    }
}
