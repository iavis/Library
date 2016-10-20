using Library.DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Repositories
{
    public abstract class EntityRepository<T> : IEntityRepository<T> where T : LibraryEntity
    {

        #region  Private Field

        protected LibraryContext db;

        #endregion


        #region Constructors & Destructor

        public EntityRepository()
        {
            this.db = new LibraryContext();
        }

        public EntityRepository(LibraryContext db)
        {
            this.db = db;
        }

        #endregion


        #region IEntityRepository Realization

        protected bool ExecTransaction(T entity, EntityState state)
        {
            bool isOk;

            if (entity == null)
            {
                isOk = false;
            }
            else 
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        db.Entry(entity).State = state;
                        isOk = db.SaveChanges() > 0;
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        isOk = false;
                        transaction.Rollback();
                    }
                }
            }
            return isOk;
        }

        #endregion


        #region IEntityRepository Realization

        public virtual IEnumerable<T> GetItems()
        {
            return db.Set<T>().ToList<T>();
        }

        public virtual T GetItem(int id)
        {
            //return db.Set<T>().FirstOrDefault(p => p.Code == id);
            return db.Set<T>().Find(id);
        }

        public virtual bool Create(T item)
        {
            return Save(item, EntityState.Added);
        }

        public virtual bool Update(T item)
        {
            return Save(item, EntityState.Modified);
        }

        public virtual bool Delete(int id)
        {
            T entity = db.Set<T>().Find(id);

            return Delete(entity);
        }

        public virtual bool Delete(T item)
        {
            return Save(item, EntityState.Deleted);
        }

        public virtual bool Save(T entity, EntityState state)
        {
            return ExecTransaction(entity, state);
        }

        #endregion


        #region IEntityRepositoryAsync Realization
        

        #endregion

        public void Dispose()
        {
            db.Dispose();
            GC.SuppressFinalize(this);
        }

    }
}
