using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.ModelViews
{
    public sealed class AuthorView : LibraryEntityView
    {
        
        #region Public Properties

        public int id { get; set; }

        public string firstName { get; set; }

        public string secondName { get; set; }

        public string middleName { get; set; }

        public string lastName { get; set; }

        public string photo { get; set; }

        public string shortName { get; set; }

        public string longName { get; set; }

        public List<int> books { get; set; } // список идентификаторов авторов

        public int bookCount { get { return books.Count(); } }

        #endregion


        #region Constructors  & Destructor

        public AuthorView()
        {
            // do nothing 
            this.books = new List<int>();
        }

        public AuthorView(Library.DOMAIN.Models.Author author)
        {
            this.id = author.Id;
            this.firstName = author.FirstName;
            this.middleName = author.SecondName;
            this.lastName = author.LastName;
            this.photo = author.Photo;

            this.books = author.Books != null ? author.Books.Select(x => x.Id).ToList() : new List<int>();

        }
        
        #endregion


    }



}