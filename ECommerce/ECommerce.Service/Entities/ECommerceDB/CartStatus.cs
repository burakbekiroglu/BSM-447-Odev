using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class CartStatus
    {
        public CartStatus()
        {
            Cart = new HashSet<Cart>();
        }

        public int Id { get; set; }
        public string Status { get; set; } = null!;

        public virtual ICollection<Cart> Cart { get; set; }
    }
}
