using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;

namespace DIGISYSS.Repositories
{
  public   class GenericRepositoryInv<T> : IGenericRepository<T> where T : class
    {
        private readonly RetailSalesManagementEntities _db;
        private readonly DbSet<T> _aTable;

        public GenericRepositoryInv(RetailSalesManagementEntities db)
        {
            _db = db;
            _aTable = _db.Set<T>();
        }
        public GenericRepositoryInv()
        {
            _db = new RetailSalesManagementEntities();
            _aTable = _db.Set<T>();
        }
        public void Dispose()
        {
            _db.Dispose();
        }

        public IEnumerable<T> SelectAll()
        {

            return _aTable.ToList();
        }

        public T SelectedById(object id)
        {
            return _aTable.Find(id);
        }

        public void Insert(T obj)
        {
            _aTable.Add(obj);
        }

        public void Update(T obj)
        {
            _aTable.Attach(obj);
            _db.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(object id)
        {
            T find = _aTable.Find(id);
            _aTable.Remove(find);
        }

        public void Save()
        {
            try
            {
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
