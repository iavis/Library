using Library.DOMAIN;
using Library.WebMVC.ModelViews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Library.WebMVC.Controllers
{

    public class AuthorsController : ApiController
    {

        // GET api/authorview 
        public AuthorsData Get()
        {

            /* Список авторов в нашей библиотеке */
            List<AuthorView> authors = new List<AuthorView>();
            
            /* Список букв, с которых начинаются имена и фамилии наших авторов */
            List<object> authorLetters = new List<object>();

            using (LibraryContext db = new LibraryContext())
            {
                try
                {
                    authors = db.Authors.Select(
                        p => new AuthorView
                        {
                            id = p.Id,
                            firstName = p.FirstName,
                            middleName = p.SecondName,
                            lastName = p.LastName,
                            photo = p.Photo,
                            books = p.Books.Select(x => x.Id).ToList()
                        }).ToList();
                }
                catch (Exception ex) 
                {  
                    // do nothing 
                }
                finally 
                { 
                    // do nothing 
                }
            }
            
            return new AuthorsData{authors = authors};

        }

        // GET api/authorview/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/authorview
        public void Post([FromBody]string value)
        {

        }

        // PUT api/authorview/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE api/authorview/5
        public void Delete(int id)
        {

        }



    }
}
