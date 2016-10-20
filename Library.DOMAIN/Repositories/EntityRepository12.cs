using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Repositories
{
    public abstract class EntityRepository12 
    {

        #region  Private Field

        protected LibraryContext db = new LibraryContext();

        #endregion


        #region Constructors & Destructor

        public EntityRepository12()
        {
            this.db = new LibraryContext();
        }

        public EntityRepository12(LibraryContext db)
        {
            this.db = db;
        }

        #endregion


    }
}
