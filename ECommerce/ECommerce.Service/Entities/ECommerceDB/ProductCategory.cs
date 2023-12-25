using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class ProductCategory
    {
        public ProductCategory()
        {
            Product = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Category { get; set; } = null!;
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
