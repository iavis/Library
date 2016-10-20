using Library.DOMAIN;
using Library.WebMVC.Controllers.Angular;
using Library.WebMVC.ModelViews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers
{
    using Library.DOMAIN.Models;
    using Library.WebMVC.Additions;
    using Library.WebMVC.Additions.Interfaces;
    using Library.WebMVC.Extentions.LibraryContext;

    public class AuthorsNgController : EntityNgController, ICrudEntityController<Author>
    {
        //
        // GET: /AuthorsNg/
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Create(Author item)
        {
            return base.CreateItem(item);
        }

        public ActionResult Update(Author item)
        {
            return base.UpdateItem(item);
        }

        public ActionResult Delete(int id)
        {
            return base.DeleteItem<Author>(id);
        }

        public override ActionResult GetData()
        {

            var data = new AuthorsData();
            NgControllerResponse response = new NgControllerResponse();

            try
            {
                data.items = db.GetViewList<Author,AuthorView>();
                data.columns = TableColumnsCollections.AuthorColumns;
                response.isOk = true;
                response.okMessage = "Data is recieved";
            }
            catch (Exception ex)
            {
                response.isOk = false;
                response.errorMessage = "Data is not recieved. Internal server error!!!" + ex.Message;
            }
            finally
            {
                response.data = data;
            }

            return Json(response, JsonRequestBehavior.AllowGet);

        }

    }
}
