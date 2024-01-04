using ECommerce.Service.Dtos;
using ECommerce.Service.Entities.ECommerceDB;
using ECommerce.Service.Helpers;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Service.Services
{
    public interface ICartService
    {
        Task<GeneralDto.Response> DeleteCardByIdAsync(int id);
        Task<GeneralDto.Response> SaveCartItemAsync(CartDto.CartItemSaveRequest model, int userId);
        Task<GeneralDto.Response> ChangeCartItemQuantityAsync(CartDto.CartItemChangeQuantity model);
        Task<GeneralDto.Response> CartToOrderAsync(int cartId);

    }
    public class CartService : ICartService
    {
        private readonly ECommerceDbContext _context;
        private readonly IProductService _productService;

        public CartService(ECommerceDbContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        public async Task<GeneralDto.Response> CartToOrderAsync(int cartId)
        {
            var cart = await _context.Cart.FirstOrDefaultAsync(f => f.Id == cartId);
            if (cart is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid cart"
            };

            cart.StatusId = (int)Enums.CartStatus.Order;
            await _context.SaveChangesAsync();
            return new GeneralDto.Response
            {
                Error = false
            };

        }

        public async Task<GeneralDto.Response> ChangeCartItemQuantityAsync(CartDto.CartItemChangeQuantity model)
        {
            CartItem? cartItem = await _context.CartItem.FirstOrDefaultAsync(f => f.Id == model.CartItemId);
            if (cartItem is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Product could not found"
            };

            var product = await _context.Product.FirstOrDefaultAsync(f => f.Id == cartItem.ProductId);
            if (product is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Product could not found"
            };

            var checkStock = model.Quantity - cartItem.Quantity;

            if (product.Stock < checkStock) return new GeneralDto.Response
            {
                Error = true,
                Message = "Inadequate stock"
            };
            cartItem.Quantity = model.Quantity;
            await _context.SaveChangesAsync();
            await _productService.UpdateStockAsync(product.Id, (-1 * checkStock));

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Quantity changed successfully"
            };
        }

        public async Task<GeneralDto.Response> DeleteCardByIdAsync(int id)
        {
            var cart = await _context.Cart
                .Include(i => i.CartItem)
                .ThenInclude(t => t.Product)
                .FirstOrDefaultAsync(f => f.Id == id);
            if (cart is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid cart"
            };
            cart.StatusId = (int)Enums.CartStatus.Delete;
            _context.Cart.Update(cart);
            await _context.SaveChangesAsync();

            foreach (var item in cart.CartItem)
            {
                await _productService.UpdateStockAsync(item.ProductId, item.Quantity);
            }

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Cart deleted successfully"
            };
        }

        public async Task<GeneralDto.Response> SaveCartItemAsync(CartDto.CartItemSaveRequest model, int userId)
        {
            var product = await _context.Product.FirstOrDefaultAsync(f => f.Id == model.ProductId);
            if (product is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid product"
            };
            if (model.Quantity > product.Stock) return new GeneralDto.Response
            {
                Error = true,
                Message = "Inadequate stock"
            };

            var cartItem = new CartItem
            {
                CartId = await GetCartIdByUserId(userId),
                ProductId = product.Id,
                Amount = product.Amount,
                Quantity = model.Quantity,
                CreatedDate = DateTime.Now
            };

            await _context.CartItem.AddAsync(cartItem);
            await _context.SaveChangesAsync();

            await _productService.UpdateStockAsync(product.Id, (-1 * model.Quantity));

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Product added to cart"
            };
        }

        private async Task<int> GetCartIdByUserId(int userId)
        {
            var checkUser = await _context.User.AnyAsync(a => a.Id == userId);
            if (!checkUser) throw new Exception("Invalid account");

            var existCart = await _context.Cart.FirstOrDefaultAsync(f => f.UserId == userId && f.StatusId == (int)Enums.CartStatus.New);
            if (existCart is not null) return existCart.Id;

            var newCart = new Cart();
            newCart.StatusId = (int)Enums.CartStatus.New;
            newCart.UserId = userId;
            newCart.CreatedDate = DateTime.Now;
            await _context.Cart.AddAsync(newCart);
            await _context.SaveChangesAsync();
            return newCart.Id;
        }
    }
}
