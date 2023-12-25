using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class Payment
    {
        public int Id { get; set; }
        public int DetailId { get; set; }
        public int OrderId { get; set; }
        public double Amount { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual PaymentDetail Detail { get; set; } = null!;
        public virtual Order Order { get; set; } = null!;
    }
}
