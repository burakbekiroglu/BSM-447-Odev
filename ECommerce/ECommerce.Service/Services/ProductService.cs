using ECommerce.Service.Dtos;
using ECommerce.Service.Entities.ECommerceDB;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

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
        Task<GeneralDto.Response> UpdateStockAsync(int productId, int quantity);
        Task<GeneralDto.Response> GetProductByIdAsync(int id);
        Task<GeneralDto.Response> GetProductsForAdminAsync();
        Task<GeneralDto.Response> GetCategoriesAsync();
        Task<GeneralDto.Response> GetCategoryByIdAsync(int id);
        Task<GeneralDto.Response> GetProductsAsync();
        Task<GeneralDto.Response> GetProductForCustomerAsync(int id);

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

        public async Task<GeneralDto.Response> GetCategoriesAsync()
        {
            var categories = await _context.ProductCategory.Select(s => new ProductDto.SaveCategoryRequest
            {
                Id = s.Id,
                Category = s.Category,
                Status = s.Status,
            }).ToListAsync();

            return new GeneralDto.Response { Error = false, Data = categories };
        }

        public async Task<GeneralDto.Response> GetCategoryByIdAsync(int id)
        {
            var category = await _context.ProductCategory.Where(w => w.Id == id).Select(s => new ProductDto.SaveCategoryRequest
            {
                Id = s.Id,
                Category = s.Category,
                Status = s.Status
            }).FirstOrDefaultAsync();

            if (category is null) return new GeneralDto.Response
            {
                Error = true,
                Message = "Category could not found"
            };

            return new GeneralDto.Response
            {
                Error = false,
                Data = category
            };
        }

        public async Task<GeneralDto.Response> GetCategorySelectOptions()
        {
            var result = await _context.ProductCategory.Select(s => new GeneralDto.Select
            {
                Label = s.Category,
                Value = s.Id,
                Common = new
                {
                    Status = s.Status,
                }
            }).ToListAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Data = result
            };
        }

        public async Task<GeneralDto.Response> GetProductByIdAsync(int id)
        {
            var product = await _context.Product.Where(w => w.Id == id).Select(s => new ProductDto.SaveProductRequest
            {
                Id = s.Id,
                Name = s.Name,
                CategoryId = s.CategoryId,
                Description = s.Description,
                Amount = s.Amount,
                Status = s.Status,
                Stock = s.Stock
            }).FirstOrDefaultAsync();

            if (product is null) return new GeneralDto.Response { Error = true };

            return new GeneralDto.Response
            {
                Error = false,
                Data = product
            };
        }

        public async Task<GeneralDto.Response> GetProductForCustomerAsync(int id)
        {
            var product = await _context.Product
                .Include(i => i.Category)
                .Include(i => i.ProductImage)
                .Where(w => w.Status && w.Category.Status && w.Id == id)
                .Select(s => new ProductDto.CustomerDetail
                {
                    Id = s.Id,
                    Category = s.Category.Category,
                    CategoryId = s.CategoryId,
                    Description = s.Description,
                    Name = s.Name,
                    Stock = s.Stock,
                    Amount = s.Amount,
                    Images = s.ProductImage.OrderBy(o => o.Sort).Select(s => s.FileName).ToList()
                }).FirstOrDefaultAsync();

            return new GeneralDto.Response
            {
                Error = product == null ? true : false,
                Data = product
            };
        }

        public async Task<GeneralDto.Response> GetProductsAsync()
        {
            var products = await _context.Product
                .Include(i => i.Category)
                .Include(i => i.ProductImage)
                .Where(w => w.Status && w.Category.Status)
                .Select(s => new ProductDto.CustomerDetail
                {
                    Id = s.Id,
                    Category = s.Category.Category,
                    CategoryId = s.CategoryId,
                    Description = s.Description,
                    Name = s.Name,
                    Stock = s.Stock,
                    Amount = s.Amount,
                    Images = s.ProductImage.OrderBy(o => o.Sort).Select(s => s.FileName).ToList()
                }).ToListAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Data = products
            };
        }

        public async Task<GeneralDto.Response> GetProductsForAdminAsync()
        {
            var products = await _context.Product
                .AsSplitQuery()
                .Include(i => i.ProductImage)
                .Include(i => i.Category)
                .Select(s => new ProductDto.AdminDetail
                {
                    Id = s.Id,
                    CategoryId = s.CategoryId,
                    Category = s.Category.Category,
                    Name = s.Name,
                    Status = s.Status,
                    Stock = s.Stock,
                    Image = s.ProductImage.FirstOrDefault() == null ? null : s.ProductImage.FirstOrDefault().FileName


                }).ToListAsync();

            return new GeneralDto.Response
            {
                Error = false,
                Data = products
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
                existCategory.Status = model.Status;
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
                product.Description = model.Description;
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
                product.Description = model.Description;
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

        public async Task<GeneralDto.Response> UpdateStockAsync(int productId, int quantity)
        {
            var product = await _context.Product.FirstOrDefaultAsync(f => f.Id == productId);
            if (product is null) throw new Exception("Invalid product");

            product.Stock = product.Stock + quantity;
            _context.Product.Update(product);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response { Error = false };
        }
    }
}
