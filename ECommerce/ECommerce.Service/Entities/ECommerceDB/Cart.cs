using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class Cart
    {
        public Cart()
        {
            CartItem = new HashSet<CartItem>();
            Order = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int StatusId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual CartStatus Status { get; set; } = null!;
        public virtual ICollection<CartItem> CartItem { get; set; }
        public virtual ICollection<Order> Order { get; set; }
    }
}
