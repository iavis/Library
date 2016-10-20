using Library.DOMAIN;
using Library.WebMVC.ModelViews;
using Library.WebMVC.ModelViews.CollectionView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers.Angular
{
    using Library.DOMAIN.Models;
    using Library.WebMVC.Additions;
    using Library.WebMVC.Additions.Interfaces;
    using Library.WebMVC.Extentions.LibraryContext;

    public sealed class PublishersNgController : EntityNgController, ICrudEntityController<Publisher>
    {

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Publisher publisher)
        {
            return base.CreateItem(publisher);
        }

        [HttpPost]
        public ActionResult Update(Publisher publisher)
        {
            return base.UpdateItem(publisher.Id, publisher);
        }


        [HttpPost]
        public ActionResult Delete(int id)
        {
            return base.DeleteItem<Publisher>(id);
        }

        public override ActionResult GetData()
        {
            var data = new PublishersData();
            NgControllerResponse response = new NgControllerResponse();

            try
            {
                data.items = db.GetViewList<Publisher, PublisherView>();
                data.columns = TableColumnsCollections.PublisherColumns;
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
