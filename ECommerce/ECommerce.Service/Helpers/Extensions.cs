using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ECommerce.Service.Helpers
{
    public static class Extensions
    {
        public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> source, bool condition, Expression<Func<TSource, bool>> predicate)
        {
            return condition ? source.Where(predicate) : source;
        }
        public static IQueryable<TSource> TakeIf<TSource>(this IQueryable<TSource> source, bool condition, int count)
        {
            return condition ? source.Take(count) : source;
        }
        public static IQueryable<TSource> SkipIf<TSource>(this IQueryable<TSource> source, bool condition, int count)
        {
            return condition ? source.Skip(count) : source;
        }
        public static int ToInt(this string value)
        {
            return (string.IsNullOrEmpty(value) ? 0 : Convert.ToInt32(value));
        }

        public static long ToLong(this string value)
        {
            return (string.IsNullOrEmpty(value) ? 0 : Convert.ToInt64(value));
        }
        public static decimal ToDecimal(this string value)
        {
            return (string.IsNullOrEmpty(value) ? 0 : Convert.ToDecimal(value));
        }

        public static int ToInt(this double value)
        {
            return Convert.ToInt32(value);
        }
        public static int ToInt(this uint value)
        {
            return Convert.ToInt32(value);
        }

        public static double ToDouble(this string value)
        {
            return Convert.ToDouble(value);
        }
        public static string ToJson(this object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        public static int GetUserIdFromContext(this HubCallerContext context)
        {
            var token = context.GetHttpContext().Request.Query["access_token"];
            return Utilities.GetUserIdFromJwt(token);
        }
        public static int GetUserIdFromUserClaims(this ClaimsPrincipal user)
        {
            var id = user.Claims.FirstOrDefault(f => f.Type == ClaimTypes.UserData).Value.ToInt();
            if (id == 0) throw new Exception("User unauthorize");
            return id;
        }

        public static string ToMD5(this string value)
        {
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] hashData = md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(value));
            StringBuilder build = new StringBuilder();
            for (int i = 0; i < hashData.Length; i++)
            {
                build.Append(hashData[i].ToString("x2"));
            }
            return build.ToString();
        }
    }
}
