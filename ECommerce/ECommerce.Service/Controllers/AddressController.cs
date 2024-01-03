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
    public class AddressController : ControllerBase
    {
        private readonly IUserAddressService _userAddressService;

        public AddressController(IUserAddressService userAddressService)
        {
            _userAddressService = userAddressService;
        }


        [HttpPost("Save")]
        [Transaction]
        public async Task<IActionResult> SaveProduct(UserAddressDto.SaveRequest model)
        {
            int userId = HttpContext.User.GetUserIdFromUserClaims();
            model.UserId = userId;
            var result = await _userAddressService.SaveAsync(model);
            return Ok(result);
        }

        [HttpPost("Delete")]
        [Transaction]
        public async Task<IActionResult> Delete(GeneralDto.IdRequest model)
        {
            var result = await _userAddressService.DeleteAsync(model.Id);
            return Ok(result);
        }

        [HttpGet("GetUserAddreses")]
        public async Task<IActionResult> GetUserAddreses()
        {
            int userId = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _userAddressService.GetUserAddresesAsync(userId);
            return Ok(result);
        }

        [HttpPost("GetAddressById")]
        public async Task<IActionResult> GetAddressById(GeneralDto.IdRequest model)
        {
            var result = await _userAddressService.GetAddressByIdAsync(model.Id);
            return Ok(result);
        }
    }
}
