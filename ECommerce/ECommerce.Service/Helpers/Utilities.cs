using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.Service.Helpers
{
    public static class Utilities
    {
        public static List<Claim> GetUserClaimsFromJwt(string jwtToken)
        {
            JwtSecurityTokenHandler handler = new();
            var jwtSecurityToken = handler.ReadJwtToken(jwtToken);
            return jwtSecurityToken.Claims.ToList();
        }
        public static int GetUserIdFromJwt(string jwtToken)
        {

            var userId = GetUserClaimsFromJwt(jwtToken).FirstOrDefault(f => f.Type == ClaimTypes.UserData)?.Value.ToInt();
            return userId.GetValueOrDefault(0);
        }
        public static string GeneratePassword(int length)
        {
            string uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
            string specialCharacters = "!@#$%^&*()";
            string numbers = "0123456789";

            Random random = new Random();
            StringBuilder builder = new StringBuilder();

            builder.Append(uppercaseLetters[random.Next(uppercaseLetters.Length)]);
            builder.Append(lowercaseLetters[random.Next(lowercaseLetters.Length)]);
            builder.Append(specialCharacters[random.Next(specialCharacters.Length)]);
            builder.Append(numbers[random.Next(numbers.Length)]);

            for (int i = 4; i < length; i++)
            {
                string characters = uppercaseLetters + lowercaseLetters + specialCharacters + numbers;
                builder.Append(characters[random.Next(characters.Length)]);
            }

            // Karakterleri karıştıralım
            string generatedString = new string(builder.ToString().ToCharArray().OrderBy(x => random.Next()).ToArray());

            return generatedString;
        }
        public static string GenerateAccountName(string firstName, string lastName)
        {
            Random random = new Random();
            string accountName = string.Empty;

            if (!string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName))
            {
                string initials = $"{firstName.ToUpper()[0]}{lastName.ToUpper()[0]}";
                string randomNumber = random.Next(100000, 999999).ToString();

                accountName = $"{initials}-{randomNumber}";
            }
            return accountName;
        }
        public static string GetEnumNameByValue(Type enumType, int value)
        {
            return Enum.GetName(enumType, value);
        }
        public static string GenerateConfirmationCode()
        {
            string code = "";

            Random rand = new Random();
            Enumerable.Range(1, 6)
                .ToList()
                .ForEach(f => code += rand.Next(0, 9).ToString());

            return code;
        }
    }
}
