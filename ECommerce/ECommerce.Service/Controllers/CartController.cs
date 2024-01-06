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
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("SaveCartItem")]
        [Transaction]
        public async Task<IActionResult> SaveCartItem(CartDto.CartItemSaveRequest model)
        {
            var userId = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _cartService.SaveCartItemAsync(model,userId);
            return Ok(result);
        }

        [HttpGet("GetCartDetailByUserId")]
        [Transaction]
        public async Task<IActionResult> GetCartDetailByUserId()
        {
            var userId = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _cartService.GetCartDetailByUserIdAsync( userId);
            return Ok(result);
        }

        [HttpPost("DeleteCardById")]
        [Transaction]
        public async Task<IActionResult> DeleteCardById(GeneralDto.IdRequest model)
        {
            var result = await _cartService.DeleteCardByIdAsync(model.Id);
            return Ok(result);
        }
    }
}
