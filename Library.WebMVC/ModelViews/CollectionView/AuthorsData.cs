using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.ModelViews
{

    /* 
     * Данные по авторам 
     * 
     *  - Список авторов 
     *  - Список букв 
     * 
     */
    public sealed class  AuthorsData : LibraryObjectsData
    {
        public IEnumerable<AuthorView> authors { get; set; }

        public AuthorsData()
        {

        }

    }
}