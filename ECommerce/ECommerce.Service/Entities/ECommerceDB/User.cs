using System;
using System.Collections.Generic;

namespace ECommerce.Service.Entities.ECommerceDB
{
    public partial class User
    {
        public User()
        {
            Address = new HashSet<Address>();
            Order = new HashSet<Order>();
            UserFavProduct = new HashSet<UserFavProduct>();
            WishList = new HashSet<WishList>();
        }

        public int Id { get; set; }
        public int TypeId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Password { get; set; } = null!;
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual UserType Type { get; set; } = null!;
        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<UserFavProduct> UserFavProduct { get; set; }
        public virtual ICollection<WishList> WishList { get; set; }
    }
}
