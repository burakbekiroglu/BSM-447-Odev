namespace ECommerce.Service.Dtos
{
    public class OrderDto
    {
        public class SaveRequest
        {
            public int CartId { get; set; }
            public int AddressId { get; set; }
            public PaymentDetail PaymentDetail { get; set; }
        }

        public class PaymentDetail
        {
            public string CardNumber { get; set; }
            public string FullName { get; set; }
            public string Cvv { get; set; }
            public string ValidDate { get; set; }
        }
    }
}
