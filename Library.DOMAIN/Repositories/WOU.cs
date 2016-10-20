using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Interfaces
{

    using Library.DOMAIN.Models;
    using Library.DOMAIN.Repositories;

    // WORK OF UNIT 
    public class WOU : IWorkOfUnit     
    {

        private LibraryContext db = new LibraryContext();

        private AuthorRepository authorRepository;

        private BookRepository bookRepository;

        private bool disposed = false;

        public BookRepository Books
        {
            get
            {
                if (bookRepository == null)
                    bookRepository = new BookRepository(db);
                return bookRepository;
            }
        }

        public AuthorRepository Authors
        {
            get
            {
                if (authorRepository == null)
                    authorRepository = new AuthorRepository(db);
                return authorRepository;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }


        #region Interface Realization 

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }
        
        #endregion
    }
}
