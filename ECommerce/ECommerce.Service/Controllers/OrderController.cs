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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("Save")]
        [Transaction]
        public async Task<IActionResult> Save(OrderDto.SaveRequest model)
        {
            var userId = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _orderService.SaveAsync(model, userId);
            return Ok(result);
        }
    }
}
