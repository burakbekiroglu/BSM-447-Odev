using ECommerce.Service.Dtos;
using ECommerce.Service.Entities.ECommerceDB;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Service.Services
{
    public interface IOrderService
    {
        Task<GeneralDto.Response> SaveAsync(OrderDto.SaveRequest model, int userId);
    }
    public class OrderService : IOrderService
    {
        private readonly ECommerceDbContext _context;
        private readonly ICartService _cartService;

        public OrderService(ECommerceDbContext context, ICartService cartService)
        {
            _context = context;
            _cartService = cartService;
        }

        public async Task<GeneralDto.Response> SaveAsync(OrderDto.SaveRequest model, int userId)
        {
            var cart = await _context.Cart.Include(i => i.CartItem).FirstOrDefaultAsync(f => f.Id == model.CartId);
            if (cart is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid cart"
            };

            if (cart.UserId != userId) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid operation"
            };

            var order = new Order();
            order.CartId = cart.Id;
            order.UserId = userId;
            order.AddressId = model.AddressId;
            order.CreatedDate = DateTime.Now;
            await _context.Order.AddAsync(order);
            await _context.SaveChangesAsync();


            var paymentDetail= new PaymentDetail();
            paymentDetail.CardNumber = model.PaymentDetail.CardNumber;
            paymentDetail.FullName = model.PaymentDetail.FullName;
            paymentDetail.Cvv = model.PaymentDetail.Cvv;
            paymentDetail.ValidDate = model.PaymentDetail.ValidDate;
            await _context.PaymentDetail.AddAsync(paymentDetail);
            await _context.SaveChangesAsync();

            var payment= new Payment();
            payment.DetailId = paymentDetail.Id;
            payment.Amount = cart.CartItem.Sum(s => s.Amount * s.Quantity);
            payment.OrderId = order.Id;
            payment.CreatedDate = DateTime.Now;
            await _context.Payment.AddAsync(payment);
            await _context.SaveChangesAsync();

            await _cartService.CartToOrderAsync(cart.Id);

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Order complated"
            };
        }
    }
}
