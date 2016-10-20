using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers.Angular
{
    using Library.DOMAIN.Models;
    using Library.WebMVC.Additions;
    using Library.WebMVC.Additions.Interfaces;
    using Library.WebMVC.ModelViews;
    using Library.WebMVC.Extentions.LibraryContext;


    public class BooksNgController : EntityNgController, ICrudEntityController<Book>
    {

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create(Book book)
        {
            return base.CreateItem(book);
        }

        public ActionResult Update(Book book)
        {
            return base.UpdateItem(book);
        }

        public ActionResult Delete(int id)
        {
            return base.DeleteItem<Book>(id);
        }

        public override ActionResult GetData()
        {

            var data = new BooksData();
            NgControllerResponse response = new NgControllerResponse();

            try
            {
                data.items = db.GetViewList<Book, BookView>();
                data.columns = TableColumnsCollections.BookColumns;
                data.additions["authors"] = db.Authors.Select(p => new { id = p.Id, name = (p.FirstName + p.LastName) }).ToList().OrderBy(p => p.name);
                data.additions["publishers"] = db.GetViewList<Publisher, PublisherView>().OrderBy(p => p.name);
                response.isOk = true;
                response.okMessage = "Data is recieved";
            }
            catch (Exception ex)
            {
                data = null;
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
