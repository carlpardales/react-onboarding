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
    public class SalesController : Controller
    {
        SalesDataAccessLayer ObjectSales = new SalesDataAccessLayer();

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Sales> Get()
        {
            return ObjectSales.GetAllSales();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Sales Get(int id)
        {
            return ObjectSales.GetSales(id);
        }

        [HttpGet]
        [Route("GetCustomerList")]
        public IEnumerable<Customer> Customers()
        {
            return ObjectSales.GetAllCustomers();
        }

        [HttpGet]
        [Route("GetProductList")]
        public IEnumerable<Product> Products()
        {
            return ObjectSales.GetAllProducts();
        }

        [HttpGet]
        [Route("GetStoreList")]
        public IEnumerable<Store> Stores()
        {
            return ObjectSales.GetAllStores();
        }

        // POST api/<controller>
        [HttpPost]
        public Sales Post(Sales sales)
        {
            return ObjectSales.AddSales(sales);
        }

        // PUT api/<controller>/5
        [HttpPut]
        public int Put(Sales sales)
        {
            return ObjectSales.UpdateSales(sales);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            return ObjectSales.DeleteSales(id);
        }
    }
}
