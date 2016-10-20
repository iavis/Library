using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Library.WebMVC.Controllers.WebApi
{

    /*
     *  Контроллер для работы с представлениями книг 
     * 
     * 
     */

    public class BookViewController : ApiController
    {
        // GET api/bookview
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/bookview/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/bookview
        public void Post([FromBody]string value)
        {
        }

        // PUT api/bookview/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/bookview/5
        public void Delete(int id)
        {
        }
    }
}
