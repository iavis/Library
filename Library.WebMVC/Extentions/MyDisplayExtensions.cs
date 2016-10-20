using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC
{
    public static class MyDisplayExtensions
    {
        /////

        public static MvcHtmlString DisplayAuthors(this Library.DOMAIN.Models.Book book)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var author in book.Authors)
            {
                sb.Append(author.LongName);
                sb.Append("<br/>");
            }

            return MvcHtmlString.Create(sb.ToString());
        }

        public static MvcHtmlString DisplayAuthorsInline(this Library.DOMAIN.Models.Book book)
        {
            StringBuilder sb = new StringBuilder();

            foreach (var author in book.Authors)
            {
                sb.Append(author.LongName);
                sb.Append(", ");
            }
            
            sb.Remove(sb.Length - 2, 2);

            return MvcHtmlString.Create(sb.ToString());
        }

        public static MvcHtmlString DisplayISBN(this Library.DOMAIN.Models.Book book)
        {
            StringBuilder sb = new StringBuilder();

            string isbn10 = (book.Isbn10 as string).Trim();
            sb.Append(isbn10);
            sb.Append(isbn10.Length > 0 ? ", " : "");
            sb.Append(book.Isbn13.Trim());

            return MvcHtmlString.Create(sb.ToString());
        }

    }
}