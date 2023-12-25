using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class Order
    {
        public Order()
        {
            Payment = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public int CartId { get; set; }
        public int UserId { get; set; }
        public int AddressId { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual Address Address { get; set; } = null!;
        public virtual Cart Cart { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Payment> Payment { get; set; }
    }
}
