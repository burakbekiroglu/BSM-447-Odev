using ECommerce.Service.Entities.ECommerceDB;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ECommerce.Service.Middlewares
{
    public class TransactionAttribute : ActionFilterAttribute, IAsyncActionFilter
    {
        private ECommerceDbContext _db;

        public TransactionAttribute(ECommerceDbContext db)
        {
            _db = db;
        }

        public TransactionAttribute()
        {

        }

        public async override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            ECommerceDbContext db = _db == null ? context.HttpContext.RequestServices.GetService<ECommerceDbContext>() : _db;
            using (var transaction = db.Database.BeginTransaction())
            {

                // do something before
                ActionExecutedContext resultContext = await next();
                //do something after
                if (resultContext.Exception != null) await transaction.RollbackAsync();
                else await transaction.CommitAsync();
            }
        }
    }
}
