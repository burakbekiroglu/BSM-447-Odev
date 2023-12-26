namespace ECommerce.Service.Dtos
{
    public class UserAddressDto
    {
        public class SaveRequest
        {
            public int Id { get; set; } = 0;
            public int UserId { get; set; }
            public string Country { get; set; }
            public string City { get; set; }
            public string District { get; set; }
            public string Description { get; set; }
        }
        public class Detail
        {
            public int Id { get; set; } = 0;
            public string Country { get; set; }
            public string City { get; set; }
            public string District { get; set; }
            public string Description { get; set; }
        }
    }
}
