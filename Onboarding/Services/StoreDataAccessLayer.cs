using Microsoft.EntityFrameworkCore;
using Onboarding.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Services
{
    public class StoreDataAccessLayer
    {
        SalesDBContext db = new SalesDBContext();

        public IEnumerable<Store> GetAllStores()
        {
            try
            {
                return db.Store.ToList();
            }
            catch
            {
                throw;
            }
        }

        public Store AddStore(Store store)
        {
            try
            {
                Store addedStore = db.Store.Add(store).Entity;
                db.SaveChanges();
                return addedStore;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateStore(Store store)
        {
            try
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }

        }

        public Store GetStore(int id)
        {
            try
            {
                Store store = db.Store.Find(id);
                return store;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteStore(int id)
        {
            try
            {
                //Customer customer = db.Store.Find(id);
                db.Store.Remove(GetStore(id));
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
