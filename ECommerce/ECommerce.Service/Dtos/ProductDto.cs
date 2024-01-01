namespace ECommerce.Service.Dtos
{
    public class ProductDto
    {
        public class SaveFavProductRequest
        {
            public int UserId { get; set; }
            public int ProductId { get; set; }
        }
        public class SaveWishListRequest
        {
            public int UserId { get; set; }
            public int ProductId { get; set; }
        }
        public class SaveCategoryRequest
        {
            public int Id { get; set; } = 0;
            public string Category { get; set; }
            public bool Status { get; set; } = true;
        }

        public class SaveProductRequest
        {
            public int Id { get; set; } = 0;
            public int CategoryId { get; set; }
            public string  Name { get; set; }
            public string Description { get; set; }
            public double Amount { get; set; }
            public bool Status { get; set; } = true;
            public int Stock { get; set; }
        }

        public class SaveProductImageRequest
        {
            public int ProductId { get; set; }
            public List<ProductImageSaveDetail> Files { get; set; }
        }
        public class ProductImageSaveDetail
        {
            public IFormFile File { get; set; }
            public int Sort { get; set; }
            public bool Status { get; set; } = true;
        }

        public class AdminDetail
        {
            public int Id { get; set; } = 0;
            public int CategoryId { get; set; }
            public string Category { get; set; }
            public string Name { get; set; }
            public bool Status { get; set; } = true;
            public int Stock { get; set; }
            public string? Image { get; set; }
        }

    }
}
