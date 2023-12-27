namespace ECommerce.Service.Dtos
{
    public class CartDto
    {
        public class CartItemSaveRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
        }
        public class CartItemChangeQuantity
        {
            public int CartItemId { get; set; }
            public int Quantity { get; set; }
        }
    }
}
