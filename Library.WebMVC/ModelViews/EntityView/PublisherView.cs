using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.ModelViews
{
    using Library.DOMAIN.Models;

    public sealed class PublisherView : LibraryEntityView
    {

        #region Public Properties 
        public int id { get; set; }

        public string name { get; set; }

        #endregion

        #region Constructors & Destructor

        public PublisherView()
        {

        }

        public PublisherView(Publisher publisher)
        {
            this.id = publisher.Id;
            this.name = publisher.Name;
        }
        
        #endregion



    }
}