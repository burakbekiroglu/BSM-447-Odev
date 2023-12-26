using System.Net;
using ECommerce.Service.Dtos;
using ECommerce.Service.Entities.ECommerceDB;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Service.Services
{
    public interface IUserAddressService
    {
        Task<GeneralDto.Response> SaveAsync(UserAddressDto.SaveRequest model);
        Task<GeneralDto.Response> DeleteAsync(int id);
        Task<GeneralDto.Response> GetUserAddresesAsync(int userId);
    }
    public class UserAddressService : IUserAddressService
    {
        private readonly ECommerceDbContext _context;

        public UserAddressService(ECommerceDbContext context)
        {
            _context = context;
        }

        public async Task<GeneralDto.Response> DeleteAsync(int id)
        {
            Address? address = await _context.Address.FirstOrDefaultAsync(f => f.Id == id);
            if (address is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Address could not found"
            };

            address.Status = false;
            _context.Address.Update(address);
            await _context.SaveChangesAsync();
            return new GeneralDto.Response
            {
                Error = false,
                Message="Address deleted successfully"
            };
        }

        public async Task<GeneralDto.Response> GetUserAddresesAsync(int userId)
        {
            var detail = await _context.Address
                .AsNoTracking()
                .Where(w => w.UserId == userId && w.Status)
                .Select(s=>new UserAddressDto.Detail
                {
                    Id = s.Id,
                    Country=s.Country,
                    City = s.City,
                    District = s.District,
                    Description = s.Description,
                })
                .ToListAsync();

            return new GeneralDto.Response
            { 
                Error=false,
                Data=detail
            };
        }

        public async Task<GeneralDto.Response> SaveAsync(UserAddressDto.SaveRequest model)
        {
            var isValidUser = await _context.User.AnyAsync(a => a.Id == model.UserId);
            if (!isValidUser) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid customer!"
            };

            if (model.Id == 0)
            {
                var address = new Address();
                address.UserId = model.UserId;
                address.Country = model.Country;
                address.City = model.City;
                address.District = model.District;
                address.Description = model.Description;
                address.Status = true;
                address.CreatedDate = DateTime.Now;
                await _context.Address.AddAsync(address);
            }
            else
            {
                var existAddress = await _context.Address.FirstOrDefaultAsync(f => f.Id == model.Id);
                if (existAddress is null) return new GeneralDto.Response
                {
                    Error = true,
                    Message = "Address could not found"
                };
                existAddress.Country = model.Country;
                existAddress.City = model.City;
                existAddress.District = model.District;
                existAddress.Description = model.Description;
                existAddress.UpdatedDate = DateTime.Now;
                _context.Address.Update(existAddress);
            }
            await _context.SaveChangesAsync();
            return new GeneralDto.Response
            {
                Error = false,
                Message = "Address saved successfully"
            };
        }
    }
}
