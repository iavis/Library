using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers.Angular
{
    using Library.DOMAIN;
    using Library.DOMAIN.Models;
    using Library.WebMVC.Additions;
    using Library.WebMVC.Extentions.LibraryContext;
    using Library.WebMVC.ModelViews;

    public abstract class EntityNgController : Controller
    {

        #region Private & Protected Properties

        protected LibraryContext db = new LibraryContext();

        #endregion

        #region Private & Protected Methods

        // не совсем красивый метод - но пойдет 
        protected object GetItemView<T>(T item) where T : class
        {
            if (item != null)
            {
                if (typeof(T) == typeof(Author))
                {
                    return (item as Author).GetView<Author, AuthorView>();
                }
                else if (typeof(T) == typeof(Book))
                {
                    return (item as Book).GetView<Book, BookView>();
                }
                else if (typeof(T) == typeof(Publisher))
                {
                    return (item as Publisher).GetView<Publisher,PublisherView>();
                }
            }

            return null;
        }

        protected ActionResult DoAction<T>(T item, string okMessage, string errorMessage) where T : class
        {
            return null;
        }

        protected virtual ActionResult CreateItem<T>(T item) where T : class
        {
            bool isOk = false;
            string okMessage = String.Empty;
            string errorMessage = String.Empty;
            object data = null;

            if (ModelState.IsValid)
            {
                if (LibraryRepo.Add(db, item))
                {
                    isOk = true;
                    okMessage = "Item was added";
                    data = GetItemView(item);
                }
                else
                {
                    errorMessage = "Item was not added. Error in Add-method!!!";
                    data = GetItemView(item);
                }
            }
            else
            {
                errorMessage = "Item is not valid. !!!";
                data = GetItemView(item);
            }

            return Json(new NgControllerResponse { isOk = isOk, okMessage = okMessage, errorMessage = errorMessage, data = data });

        }

        protected virtual ActionResult DeleteItem<T>(T item) where T : class
        {
            bool isOk = false;
            string okMessage = String.Empty;
            string errorMessage = String.Empty;
            object data = GetItemView(item);

            if (item == null)
            {
                errorMessage = "Item is null!!!";
            }
            else
            {
                try
                {
                    if (LibraryRepo.Delete(db, item))
                    {
                        isOk = true;
                        okMessage = String.Format("Item was removed ");
                    }
                    else
                    {
                        errorMessage = String.Format("!!!Item was not removed!!!");
                    }
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                }
            }

            return Json(new NgControllerResponse { isOk = isOk, okMessage = okMessage, errorMessage = errorMessage, data = data });

        }

        protected virtual ActionResult DeleteItem<T>(int id) where T : class
        {
            return this.DeleteItem(db.Set<T>().Find(id));
        }

        protected virtual ActionResult UpdateItem<T>(T item) where T : class
        {
            bool isOk = false;
            string okMessage = String.Empty;
            string errorMessage = String.Empty;
            object data = null;

            if (item == null)
            {
                errorMessage = "Item is null!!!";
            }
            else
            {
                try
                {
                    if (LibraryRepo.Update(db, item))
                    {
                        isOk = true;
                        okMessage = String.Format("Item was updated ");
                    }
                    else
                    {
                        errorMessage = String.Format("!!!Item was not updated!!!");
                    }
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                }
            }

            return Json(new NgControllerResponse { isOk = isOk, okMessage = okMessage, errorMessage = errorMessage, data = data });

        }

        protected virtual ActionResult UpdateItem<T>(int id, T item) where T : class
        {
            bool isOk = false;
            string okMessage = String.Empty;
            string errorMessage = String.Empty;
            object data = GetItemView(item);

            try
            {
                if (LibraryRepo.Update(db, item))
                {
                    isOk = true;
                    okMessage = String.Format("Item was updated ");
                }
                else
                {
                    errorMessage = String.Format("!!!Item was not updated!!!");
                }
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message;
            }

            return Json(new NgControllerResponse { isOk = isOk, okMessage = okMessage, errorMessage = errorMessage, data = data });

        }

        #endregion

        #region Public Methods

        public abstract ActionResult GetData();

        protected ActionResult GetData111() 
        {
            return null;
        }


        #endregion

        

    }
}
