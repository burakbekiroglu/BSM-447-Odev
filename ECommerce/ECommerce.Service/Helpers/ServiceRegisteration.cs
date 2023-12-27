using ECommerce.Service.Entities.ECommerceDB;
using ECommerce.Service.Services;

namespace ECommerce.Service.Helpers
{
    public static class ServiceRegisteration
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {   
            services.AddDbContext<ECommerceDbContext>();
            services.AddScoped<IFileManagerService, FileManagerService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserAddressService, UserAddressService>();
            services.AddScoped<IProductService,ProductService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<IOrderService, OrderService>();
            return services;
        }
    }
}
