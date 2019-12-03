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
    public class StoreController : Controller
    {
        StoreDataAccessLayer ObjectStore = new StoreDataAccessLayer();

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Store> Get()
        {
            return ObjectStore.GetAllStores();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Store Get(int id)
        {
            return ObjectStore.GetStore(id);
        }

        // POST api/<controller>
        [HttpPost]
        public Store Post(Store store)
        {
            return ObjectStore.AddStore(store);
        }

        // PUT api/<controller>/5
        [HttpPut]
        public int Put(Store store)
        {
            return ObjectStore.UpdateStore(store);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            return ObjectStore.DeleteStore(id);
        }
    }
}
