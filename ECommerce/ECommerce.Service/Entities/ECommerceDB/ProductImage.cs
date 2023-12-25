using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class ProductImage
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string FileName { get; set; } = null!;
        public int Sort { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual Product Product { get; set; } = null!;
    }
}
