using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Repositories
{
    using Library.DOMAIN.Models;

    public class BookRepository : EntityRepository12, IEntityRepository<Book>
    {
        public BookRepository(LibraryContext db) : base(db)
        {
        }

        public IEnumerable<Book> GetItems()
        {
            throw new NotImplementedException();
        }

        public Book GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public bool Create(Book item)
        {
            throw new NotImplementedException();
        }

        public bool Update(Book item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Save()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }


        public bool Delete(Book item)
        {
            throw new NotImplementedException();
        }

        public bool Save(Book entity, System.Data.Entity.EntityState state)
        {
            throw new NotImplementedException();
        }
    }
}
