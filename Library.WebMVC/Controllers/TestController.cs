using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/
        public ActionResult Index()
        {

            return View();
        }



        [HttpPost]
        public void Upload(System.Web.HttpPostedFileBase aFile)
        {
            string file = aFile.FileName;
            string path = Server.MapPath("~/Upload/");
            aFile.SaveAs(path + Guid.NewGuid() + "." + file.Split('.')[1]);
        }


	}
}