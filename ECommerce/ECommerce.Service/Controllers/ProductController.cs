﻿using ECommerce.Service.Dtos;
using ECommerce.Service.Middlewares;
using ECommerce.Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Service.Controllers
{
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
        [Transaction]
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
    }
}
