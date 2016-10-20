using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Library.WebMVC.ModelViews.CollectionView;

namespace Library.WebMVC.ModelViews
{
    public abstract class LibraryObjectsData
    {
        #region Public Properties

        public virtual IEnumerable<object> items { get; set; }

        public virtual IEnumerable<object> columns { get; set; }

        public virtual IEnumerable<object> alphabets { get; set; }

        public virtual IEnumerable<object> beginnings { get; set; }

        public virtual IDictionary<string,object> additions { get; set; }

        #endregion

        
        #region Constructors & Destructor
        public LibraryObjectsData()
        {
            this.items = new List<object>();
            this.columns = new List<object>();
            this.alphabets = new List<object>();
            this.beginnings = new List<object>();
            this.additions = new Dictionary<string,object>();
        }
        #endregion


    }
}