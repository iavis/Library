using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Library.DOMAIN.Models;
using Library.DOMAIN;
using Library.WebMVC.ModelViews;

namespace Library.WebMVC.Controllers
{
    public class BooksController : Controller
    {
        private LibraryContext db = new LibraryContext();

        // GET: /Books/
        public ActionResult Index()
        {
            return View(db.Books.ToList());
        }

        // GET: /Books/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }
            return View(book);
        }

        // GET: /Books/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Books/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,PageCount,Year,Isbn10,Isbn13")] Book book)
        {
            if (ModelState.IsValid)
            {
                db.Books.Add(book);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(book);
        }

        // GET: /Books/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }
            return View(book);
        }

        // POST: /Books/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,PageCount,Year,Isbn10,Isbn13")] Book book)
        {
            if (ModelState.IsValid)
            {
                if (book.Isbn10 == null)
                    book.Isbn10 = String.Empty;

                db.Entry(book).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(book);
        }

        // GET: /Books/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }
            return View(book);
        }

        // POST: /Books/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Book book = db.Books.Find(id);
            db.Books.Remove(book);
            db.SaveChanges();
            return RedirectToAction("Index");
        }


        public JsonResult GetBooks()
        {

            return Json(
                new
                {
                    books = db.Books.Select(
                        p => new BookView
                            {
                                id = p.Id,
                                name = p.Name,
                                isbn = p.Isbn13,
                                pageCount = p.PageCount,
                                year = p.Year,
                                authors = p.Authors.Select(x => x.Id).ToList()
                            }
                           ).ToList(),
                    authors = db.Authors.Select(
                        p => new
                            {
                                id = p.Id,
                                firstName = p.FirstName,
                                secondName = p.SecondName,
                                lastName = p.LastName
                            }).ToList()
                }
                , JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddAuthor([Bind(Include = "firstName,secondName,lastName")] AuthorView author)
        {

            if (ModelState.IsValid)
            {
                Author newAuthor = new Author { FirstName = author.firstName, SecondName = author.secondName, LastName = author.lastName };
                db.Authors.Add(newAuthor);
                db.SaveChanges();

                return Json(new { newId = newAuthor.Id, status = 295 });
            }
            else
            {
                return Json(new { message = "nothing", status = 495 });
            }

        }

        [HttpPost]
        public ActionResult UploadFile(System.Web.HttpPostedFileBase sourceFile)
        {
            string file = sourceFile.FileName;
            string path = Server.MapPath("~/Content/img/");

            string fileName = Guid.NewGuid() + "." + file.Split('.')[1];

            sourceFile.SaveAs(path + fileName);

            return Json( new { fileName = fileName });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
