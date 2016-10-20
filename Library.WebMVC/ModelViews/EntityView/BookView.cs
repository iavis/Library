using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.ModelViews
{

    using Library.DOMAIN;
    using Library.DOMAIN.Models;
    using Library.WebMVC.Extentions.LibraryContext;

    public sealed class BookView : LibraryEntityView
    {

        #region Public Properties
        public int id { get; set; } // 

        public string name { get; set; } // название 

        public int pageCount { get; set; } // колво страниц

        public int year { get; set; } // год выпуска

        public string isbn { get; set; }

        public string photo { get; set; }

        public PublisherView publisher { get; set; }

        public List<int> authors { get; set; } // список идентификаторов авторов
        
        #endregion

        #region Constructors & Destroctor   

        public BookView()
        {
            this.authors = new List<int>();
        }

        public BookView(Library.DOMAIN.Models.Book book)
        {

            this.id = book.Id;
            this.name = book.Name;
            this.isbn = book.Isbn13;
            this.pageCount = book.PageCount;
            this.year = book.Year;
            
            this.publisher = book.Publisher != null ? book.Publisher.GetView<Publisher, PublisherView>() : null;
            this.authors = book.Authors != null ? book.Authors.Select(x => x.Id).ToList() : new List<int>();

        }

        #endregion

    }

}