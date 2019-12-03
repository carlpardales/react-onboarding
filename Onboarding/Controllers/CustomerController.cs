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
    public class CustomerController : Controller
    {
        CustomerDataAccessLayer ObjectCustomer = new CustomerDataAccessLayer();

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Customer> Get()
        {
            return ObjectCustomer.GetAllCustomers();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Customer Get(int id)
        {
            return ObjectCustomer.GetCustomer(id);
        }

        // POST api/<controller>
        [HttpPost]
        public Customer Post(Customer customer)
        {
            return ObjectCustomer.AddCustomer(customer);
        }

        // PUT api/<controller>/5
        [HttpPut]
        public int Put(Customer customer)
        {
            return ObjectCustomer.UpdateCustomer(customer);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Route("Customer/Delete/{id}")]
        public int Delete(int id)
        {
            return ObjectCustomer.DeleteCustomer(id);
        }
    }
}
