using ECommerce.Service.Dtos;
using ECommerce.Service.Entities.ECommerceDB;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Service.Services
{
    public interface IProductService
    {
        Task<GeneralDto.Response> SaveFavProductAsync(ProductDto.SaveFavProductRequest model);
        Task<GeneralDto.Response> DeleteFavProductByIdAsync(int id);
        Task<GeneralDto.Response> SaveWishListAsync(ProductDto.SaveFavProductRequest model);
        Task<GeneralDto.Response> DeleteWishListByIdAsync(int id);
        Task<GeneralDto.Response> SaveCategoryAsync(ProductDto.SaveCategoryRequest model);
        Task<GeneralDto.Response> DeleteCategoryByIdAsync(int id);
        Task<GeneralDto.Response> GetCategorySelectOptions();
        Task<GeneralDto.Response> SaveProductAsync(ProductDto.SaveProductRequest model);
        Task<GeneralDto.Response> DeleteProductByIdAsync(int id);
        Task<GeneralDto.Response> SaveProductImagesAsync(ProductDto.SaveProductImageRequest model);
        Task<GeneralDto.Response> DeleteProductImageByIdAsync(int id);
    }
    public class ProductService : IProductService
    {
        private readonly ECommerceDbContext _context;
        private readonly IFileManagerService _FileManagerService;

        public ProductService(ECommerceDbContext context, IFileManagerService fileManagerService)
        {
            _context = context;
            _FileManagerService = fileManagerService;
        }

        public async Task<GeneralDto.Response> DeleteCategoryByIdAsync(int id)
        {
            var category = await _context.ProductCategory.FirstOrDefaultAsync(f => f.Id == id);
            if (category is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid Category"
            };
            category.Status = false;
            category.UpdatedDate = DateTime.Now;

            _context.ProductCategory.Update(category);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Category deleted successfully"
            };
        }

        public async Task<GeneralDto.Response> DeleteFavProductByIdAsync(int id)
        {
            var fav = await _context.UserFavProduct.FirstOrDefaultAsync(f => f.Id == id);
            if (fav is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid operation"
            };

            _context.UserFavProduct.Remove(fav);
            await _context.SaveChangesAsync();
            return new GeneralDto.Response
            {
                Error = false,
                Message = "Prodcut deleted from favorite list"
            };
        }

        public async Task<GeneralDto.Response> DeleteProductByIdAsync(int id)
        {
            var product = await _context.Product.FirstOrDefaultAsync(f => f.Id == id);
            if (product is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Product could not found"
            };
            product.Status = false;
            product.UpdatedDate = DateTime.Now;
            _context.Product.Update(product);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Data = product
            };
        }

        public async Task<GeneralDto.Response> DeleteProductImageByIdAsync(int id)
        {
            var productImage = await _context.ProductImage.FirstOrDefaultAsync(f => f.Id == id);
            if (productImage is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Product image could not found"
            };
            productImage.Status = false;
            _context.ProductImage.Update(productImage);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Image deleted successfully",
                Data = productImage
            };
        }

        public async Task<GeneralDto.Response> DeleteWishListByIdAsync(int id)
        {
            var wishList = await _context.WishList.FirstOrDefaultAsync(f => f.Id == id);
            if (wishList is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid operation"
            };

            _context.WishList.Remove(wishList);
            await _context.SaveChangesAsync();
            return new GeneralDto.Response
            {
                Error = false,
                Message = "Prodcut deleted from Wish list"
            };
        }

        public async Task<GeneralDto.Response> GetCategorySelectOptions()
        {
            var result = await _context.ProductCategory.Where(w => w.Status).Select(s => new GeneralDto.Select
            {
                Label = s.Category,
                Value = s.Id
            }).ToListAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Data = result
            };
        }

        public async Task<GeneralDto.Response> SaveCategoryAsync(ProductDto.SaveCategoryRequest model)
        {

            if (model.Id == 0)
            {
                var category = new ProductCategory();
                category.Category = model.Category;
                category.Status = model.Status;
                category.CreatedDate = DateTime.Now;
                _context.ProductCategory.AddAsync(category);
            }
            else
            {
                var existCategory = await _context.ProductCategory.FirstOrDefaultAsync(f => f.Id == model.Id);
                if (existCategory is null) return new GeneralDto.Response
                {
                    Error = true,
                    Message = "Category could not found"
                };

                existCategory.Category = model.Category;
                existCategory.UpdatedDate = DateTime.Now;
                _context.ProductCategory.Update(existCategory);
            }

            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Category saved successfully"
            };
        }

        public async Task<GeneralDto.Response> SaveFavProductAsync(ProductDto.SaveFavProductRequest model)
        {
            var checkProduct = await _context.Product.AnyAsync(w => w.Id == model.ProductId && w.Status);
            if (!checkProduct) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid Product"
            };

            var checkUser = await _context.User.AnyAsync(a => a.Id == model.UserId);

            if (!checkUser) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid Customer"
            };

            var fav = new UserFavProduct();
            fav.UserId = model.UserId;
            fav.ProductId = model.ProductId;
            fav.CreatedDate = DateTime.Now;
            await _context.UserFavProduct.AddAsync(fav);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Product added to favorite list"
            };
        }

        public async Task<GeneralDto.Response> SaveProductAsync(ProductDto.SaveProductRequest model)
        {
            var categoryCheck = await _context.ProductCategory.AnyAsync(a => a.Id == model.CategoryId);
            if (!categoryCheck) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid category"
            };
            Product product;
            if (model.Id == 0)
            {
                product = new Product();
                product.CategoryId = model.CategoryId;
                product.Name = model.Name;
                product.Amount = model.Amount;
                product.Status = model.Status;
                product.Stock = model.Stock;
                product.CreatedDate = DateTime.Now;
                await _context.Product.AddAsync(product);
            }
            else
            {
                product = await _context.Product.FirstOrDefaultAsync(f => f.Id == model.Id);
                if (product is null) return new GeneralDto.Response
                {
                    Error = true,
                    Message = "Product could not found"
                };

                product.CategoryId = model.CategoryId;
                product.Name = model.Name;
                product.Amount = model.Amount;
                product.Status = model.Status;
                product.Stock = model.Stock;
                product.UpdatedDate = DateTime.Now;
                _context.Product.Update(product);
            }
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Data = product,
                Message = "Product saved successfully"
            };
        }

        public async Task<GeneralDto.Response> SaveProductImagesAsync(ProductDto.SaveProductImageRequest model)
        {
            var checkProduct = await _context.Product.AnyAsync(a => a.Id == model.ProductId);
            if (!checkProduct) return new GeneralDto.Response
            {
                Error = true,
                Message = "Product could not found"
            };

            var images = new List<ProductImage>();

            foreach (var file in model.Files)
            {
                var name = await _FileManagerService.UploadProductImage(file.File);
                images.Add(new ProductImage
                {
                    ProductId = model.ProductId,
                    FileName = name,
                    Sort = file.Sort,
                    Status = file.Status,
                    CreatedDate = DateTime.Now,
                });
            }
            await _context.ProductImage.AddRangeAsync(images);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Images saved successfully"
            };

        }

        public async Task<GeneralDto.Response> SaveWishListAsync(ProductDto.SaveFavProductRequest model)
        {
            var checkProduct = await _context.Product.AnyAsync(w => w.Id == model.ProductId && w.Status);
            if (!checkProduct) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid Product"
            };

            var checkUser = await _context.User.AnyAsync(a => a.Id == model.UserId);

            if (!checkUser) return new GeneralDto.Response
            {
                Error = true,
                Message = "Invalid Customer"
            };

            var wishList = new WishList();
            wishList.UserId = model.UserId;
            wishList.ProductId = model.ProductId;
            wishList.CreatedDate = DateTime.Now;
            await _context.WishList.AddAsync(wishList);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Message = "Product added to wish list"
            };
        }
    }
}
