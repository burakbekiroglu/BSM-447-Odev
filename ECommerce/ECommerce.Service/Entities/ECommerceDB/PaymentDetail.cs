using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class PaymentDetail
    {
        public PaymentDetail()
        {
            Payment = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public string CardNumber { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Cvv { get; set; } = null!;
        public string ValidDate { get; set; } = null!;

        public virtual ICollection<Payment> Payment { get; set; }
    }
}
