using ECommerce.Service.Dtos;
using ECommerce.Service.Middlewares;
using ECommerce.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Register")]
        [Transaction ]
        public async Task<IActionResult> Register(UserDto.SaveRequest model)
        {
            var result = await _userService.SaveAsync(model);
            return Ok(result);
        }
    }
}
