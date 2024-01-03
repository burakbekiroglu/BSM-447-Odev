using ECommerce.Service.Dtos;
using ECommerce.Service.Helpers;
using ECommerce.Service.Middlewares;
using ECommerce.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Service.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        [Transaction ]
        public async Task<IActionResult> Register(UserDto.SaveRequest model)
        {
            var result = await _userService.SaveAsync(model);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserDto.LoginRequest model)
        {
            var result = await _userService.LoginAsync(model);
            return Ok(result);
        }

        [HttpGet("GetUserByToken")]
        public async Task<IActionResult> GetUserByToken()
        {
            int id = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _userService.GetUserByTokenAsync(id);
            return Ok(result);
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser()
        {
            int id = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _userService.GetUserAsync(id);
            return Ok(result);
        }

        [HttpPost("Save")]
        [Transaction]
        public async Task<IActionResult> Save(UserDto.SaveRequest model)
        {
            var result = await _userService.SaveAsync(model);
            return Ok(result);
        }
    }
}
