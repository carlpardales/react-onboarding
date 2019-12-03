using Microsoft.EntityFrameworkCore;
using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Services
{
    public class ProductDataAccessLayer
    {
        SalesDBContext db = new SalesDBContext();

        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }

        public Product AddProduct(Product product)
        {
            try
            {
               Product addedProduct =  db.Product.Add(product).Entity;
                db.SaveChanges();
                return addedProduct;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateProduct(Product product)
        {
            try
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }

        public Product GetProduct(int id)
        {
            try
            {
                Product product = db.Product.Find(id);
                return product;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteProduct(int id)
        {
            try
            {
                db.Product.Remove(GetProduct(id));
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
