using Microsoft.EntityFrameworkCore;
using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Services
{
    public class CustomerDataAccessLayer
    {
        SalesDBContext db = new SalesDBContext();

        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                return db.Customer.ToList();
            }
            catch
            {
                throw;
            }
        }

        public Customer AddCustomer(Customer customer)
        {
            try
            {
                Customer addedCustomer = db.Customer.Add(customer).Entity;
                db.SaveChanges();
                return addedCustomer;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateCustomer(Customer customer)
        {
            try
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }

        public Customer GetCustomer(int id)
        {
            try
            {
                Customer customer = db.Customer.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteCustomer(int id)
        {
            try
            {
                db.Customer.Remove(GetCustomer(id));
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
