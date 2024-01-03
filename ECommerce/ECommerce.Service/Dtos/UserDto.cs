using ECommerce.Service.Helpers;

namespace ECommerce.Service.Dtos
{
    public class UserDto
    {
        public class SaveRequest
        {
            public int Id { get; set; } = 0;
            public int TypeId { get; set; } = (int)Enums.UserType.Customer;
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string Password { get; set; }
        }
        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class Authorized
        {
            public int Id { get; set; }
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int TypeId { get; set; }        
        }

        public class PersonalInfo:SaveRequest
        {

        }
    }
}
