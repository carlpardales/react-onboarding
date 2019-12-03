using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Onboarding.Models;
using Onboarding.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Onboarding.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        ProductDataAccessLayer ObjectProduct = new ProductDataAccessLayer();
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return ObjectProduct.GetAllProducts();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return ObjectProduct.GetProduct(id);
        }

        // POST api/<controller>
        [HttpPost]
        public Product Post([FromBody] Product product)
        {
            return ObjectProduct.AddProduct(product);
        }

        // PUT api/<controller>/5
        [HttpPut]
        public int Put(Product product)
        {
            return ObjectProduct.UpdateProduct(product);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            return ObjectProduct.DeleteProduct(id);
        }
    }
}
