using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Repositories
{
    using Library.DOMAIN.Models;

    public class AuthorRepository : EntityRepository12, IEntityRepository<Author>
    {

        public AuthorRepository(LibraryContext db) : base(db)
        {
            //
        }

        public IEnumerable<Author> GetItems()
        {
            throw new NotImplementedException();
        }

        public Author GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public Author Create(Author item)
        {
            throw new NotImplementedException();
        }

        public Author Update(Author item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
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


        bool IEntityRepository<Author>.Create(Author item)
        {
            throw new NotImplementedException();
        }

        bool IEntityRepository<Author>.Update(Author item)
        {
            throw new NotImplementedException();
        }

        bool IEntityRepository<Author>.Delete(int id)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Author item)
        {
            throw new NotImplementedException();
        }

        public bool Save(Author entity, System.Data.Entity.EntityState state)
        {
            throw new NotImplementedException();
        }
    }
}
