using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN
{
    using System.Data.Entity;

    public class LibraryRepo
    {

        private static bool ExecTransaction<T>(LibraryContext db, T entity, EntityState state) where T : class
        {
            bool isOk = true;

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

            return isOk;            
        }

        private static bool Save<T>(T entity, EntityState state) where T : class
        {
            bool isOk = true;

            using (LibraryContext db = new LibraryContext())
            {
                isOk = ExecTransaction(db, entity, state);
            }

            return isOk;

        }
        private static bool Save<T>(LibraryContext db, T entity, EntityState state) where T : class
        {
            bool isOk = true;
            if (db != null) 
            {
                isOk = ExecTransaction(db, entity, state);
            }
            else 
            {
                isOk = false;
            }
            return isOk;
        }

        public static bool Add<T>(T entity) where T : class
        {
            return Save(entity, EntityState.Added);
        }
        public static bool Add<T>(LibraryContext db, T entity) where T : class
        {
            return Save(db, entity, EntityState.Added);
        }

        public static bool Delete<T>(T entity) where T : class
        {
            return Save(entity, EntityState.Deleted);
        }
        public static bool Delete<T>(LibraryContext db, T entity) where T : class
        {
            return Save(db,entity, EntityState.Deleted);
        }

        public static bool Update<T>(T entity) where T : class
        {
            return Save(entity, EntityState.Modified);
        }
        public static bool Update<T>(LibraryContext db, T entity) where T : class
        {
            return Save(db, entity, EntityState.Modified);
        }


    }
}
