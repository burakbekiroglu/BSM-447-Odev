using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class Product
    {
        public Product()
        {
            CartItem = new HashSet<CartItem>();
            ProductImage = new HashSet<ProductImage>();
            UserFavProduct = new HashSet<UserFavProduct>();
            WishList = new HashSet<WishList>();
        }

        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Amount { get; set; }
        public bool Status { get; set; }
        public int Stock { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual ProductCategory Category { get; set; } = null!;
        public virtual ICollection<CartItem> CartItem { get; set; }
        public virtual ICollection<ProductImage> ProductImage { get; set; }
        public virtual ICollection<UserFavProduct> UserFavProduct { get; set; }
        public virtual ICollection<WishList> WishList { get; set; }
    }
}
