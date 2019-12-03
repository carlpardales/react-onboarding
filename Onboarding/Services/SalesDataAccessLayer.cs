using Microsoft.EntityFrameworkCore;
using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Services
{
    public class SalesDataAccessLayer
    {
        SalesDBContext db = new SalesDBContext();

        public  List<Sales> GetAllSales()
        {
            try
            {
                return db.Sales
                    .Include(s => s.Customer)
                    .Include(s => s.Product)
                    .Include(s => s.Store)
                    .ToList();
            }
            catch
            {
                throw;
            }
        }

        public Sales AddSales(Sales sales)
        {
            try
            {
                Sales addedSales = db.Sales.Add(sales).Entity;
                db.SaveChanges();
                return addedSales;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateSales(Sales sales)
        {
            try
            {
                db.Entry(sales).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }

        public Sales GetSales(int id)
        {
            try
            {
                Sales sales = db.Sales.Find(id);
                return sales;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteSales(int id)
        {
            try
            {
                db.Sales.Remove(GetSales(id));
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public List<Customer> GetAllCustomers()
        {
            return db.Customer.ToList();
        }

        public List<Product> GetAllProducts()
        {
            return db.Product.ToList();
        }

        public List<Store> GetAllStores()
        {
            return db.Store.ToList();
        }
    }
}
