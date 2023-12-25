using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class Address
    {
        public Address()
        {
            Order = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Country { get; set; } = null!;
        public string City { get; set; } = null!;
        public string District { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Order> Order { get; set; }
    }
}
