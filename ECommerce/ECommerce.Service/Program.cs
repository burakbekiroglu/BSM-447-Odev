using ECommerce.Service.Helpers;
using ECommerce.Service.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Globalization;
using System.IO.Compression;
using System.Text;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;


services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyMethod()
                                .AllowCredentials()
                                .AllowAnyHeader()
                                .SetIsOriginAllowed((host) => true);
                      });
});

services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);

// Add Response compression services
services.AddResponseCompression(options =>
{
    options.Providers.Add<GzipCompressionProvider>();
    options.EnableForHttps = true;
    options.MimeTypes = new[] { "application/json" };
});

services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
});


services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

IConfigurationSection appSettingsSection = builder.Configuration.GetSection("AppSettings");
services.Configure<AppSettings>(appSettingsSection);

//jwt
var configuration = builder.Configuration;
byte[] key = Encoding.ASCII.GetBytes(configuration["AppSettings:Secret"]);

services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,

        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) /*&& path.StartsWithSegments("/Ws")*/)
                {
                    context.Token = $"{accessToken}";
                }
                return Task.CompletedTask;
            }
        };
    });


services.AddEndpointsApiExplorer();
services.AddCustomServices();



var app = builder.Build();

app.UseForwardedHeaders();


app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors(MyAllowSpecificOrigins);

var defaultCulture = new CultureInfo("tr-TR");
app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture(defaultCulture),
    SupportedCultures = new List<CultureInfo> { defaultCulture },
    SupportedUICultures = new List<CultureInfo> { defaultCulture },
});

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "UploadFiles");
if (!Directory.Exists(uploadPath))
{
    Directory.CreateDirectory(uploadPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = context =>
    {
        context.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
    },
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "UploadFiles")),
    RequestPath = "/api/UploadFiles",
});



app.Run();

