using ECommerce.Service.Dtos;
using ECommerce.Service.Helpers;
using ECommerce.Service.Middlewares;
using ECommerce.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Service.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost("SaveProduct")]
        [Transaction]
        public async Task<IActionResult> SaveProduct(ProductDto.SaveProductRequest model)
        {
            var result = await _productService.SaveProductAsync(model);
            return Ok(result);
        }

        [HttpGet("CategorySelectOptions")]
        public async Task<IActionResult> CategorySelectOptions()
        {
            var result = await _productService.GetCategorySelectOptions();
            return Ok(result);
        }

        [HttpPost("GetProductById")]
        public async Task<IActionResult> GetProductById(GeneralDto.IdRequest model)
        {
            var result = await _productService.GetProductByIdAsync(model.Id);
            return Ok(result);
        }

        [HttpGet("GetProductsForAdmin")]
        public async Task<IActionResult> GetProductsForAdmin()
        {
            var result = await _productService.GetProductsForAdminAsync();
            return Ok(result);
        }

        [HttpPost("SaveCategory")]
        [Transaction]
        public async Task<IActionResult> SaveCategory(ProductDto.SaveCategoryRequest model)
        {
            var result = await _productService.SaveCategoryAsync(model);
            return Ok(result);
        }

        [HttpGet("GetCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _productService.GetCategoriesAsync();
            return Ok(result);
        }

        [HttpPost("GetCategoryById")]
        public async Task<IActionResult> GetCategoryById(GeneralDto.IdRequest model)
        {
            var result = await _productService.GetCategoryByIdAsync(model.Id);
            return Ok(result);
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var result = await _productService.GetProductsAsync();
            return Ok(result);
        }

        [HttpPost("GetProductForCustomer")]
        public async Task<IActionResult> GetProductForCustomer(GeneralDto.IdRequest model)
        {
            var result = await _productService.GetProductForCustomerAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("SaveFavProduct")]
        [Transaction]
        public async Task<IActionResult> SaveFavProduct(ProductDto.SaveFavProductRequest model)
        {
            var result = await _productService.SaveFavProductAsync(model);
            return Ok(result);
        }

        [HttpPost("SaveWishList")]
        [Transaction]
        public async Task<IActionResult> SaveWishList(ProductDto.SaveWishListRequest model)
        {
            var result = await _productService.SaveWishListAsync(model);
            return Ok(result);
        }

        [HttpPost("DeleteFavProductById")]
        [Transaction]
        public async Task<IActionResult> DeleteFavProductById(GeneralDto.IdRequest model)
        {
            var result = await _productService.DeleteFavProductByIdAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("DeleteWishListById")]
        [Transaction]
        public async Task<IActionResult> DeleteWishListById(GeneralDto.IdRequest model)
        {
            var result = await _productService.DeleteWishListByIdAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("GetProductFavWishListInfo")]
        public async Task<IActionResult> GetProductFavWishListInfo(ProductDto.ProductFavAndWishlistInfoRequest model)
        {
            var result = await _productService.GetProductFavWishListInfoAsync(model);
            return Ok(result);
        }

        [HttpGet("GetFavProducts")]
        public async Task<IActionResult> GetFavProducts()
        {
            var userId = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _productService.GetFavProductsAsync(userId);
            return Ok(result);
        }
        [HttpGet("GetWishListProducts")]
        public async Task<IActionResult> GetWishListProducts()
        {
            var userId = HttpContext.User.GetUserIdFromUserClaims();
            var result = await _productService.GetWishListProductsAsync(userId);
            return Ok(result);
        }

        [HttpPost("SaveProductImages")]
        [Transaction]
        public async Task<IActionResult> SaveProductImages([FromForm]ProductDto.SaveProductImageRequest model)
        {
            var result = await _productService.SaveProductImagesAsync(model);
            return Ok(result);
        }

        [HttpPost("GetProductImages")]
        public async Task<IActionResult> GetProductImages( GeneralDto.IdRequest model)
        {
            var result = await _productService.GetProductImagesAsync(model.Id);
            return Ok(result);
        }

        [HttpPost("GetProductImages")]
        [Transaction]
        public async Task<IActionResult> DeleteProductImageById(GeneralDto.IdRequest model)
        {
            var result = await _productService.DeleteProductImageByIdAsync(model.Id);
            return Ok(result);
        }
    }
}
