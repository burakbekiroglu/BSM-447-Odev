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
        public class  CartDetail
        {
            public int CartId { get; set; }
            public double Total { get; set; }
            public List<CartItemDetail> CartItems { get; set; }
        }

        public class CartItemDetail
        {
            public int ProductId { get; set; }
            public string Category { get; set; }
            public string Name { get; set; }
            public string? Image { get; set; }
            public int Quantity { get; set; }
            public double Total { get; set; }
        }
    }
}
