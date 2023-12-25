using ECommerce.Service.Dtos;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Net;

namespace ECommerce.Service.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exp)
            {

               
                var response = context.Response;
                response.ContentType = "application/json";
                response.StatusCode = ((int)HttpStatusCode.InternalServerError);
                GeneralDto.Response result = new GeneralDto.Response
                {
                    Message = "An error was occurred",
                    Error = true,
                };
                await response.WriteAsync(JsonConvert.SerializeObject(result, new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    },
                    Formatting = Formatting.Indented,
                }));
            }
        }
    }
}
