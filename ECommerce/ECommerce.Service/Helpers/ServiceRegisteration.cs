using ECommerce.Service.Entities.ECommerceDB;

namespace ECommerce.Service.Helpers
{
    public static class ServiceRegisteration
    {
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {
        
            services.AddDbContext<ECommerceDbContext>();
            


            return services;
        }
    }
}
