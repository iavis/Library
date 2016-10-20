using Library.DOMAIN;
using Library.DOMAIN.Models;
using Library.WebMVC.ModelViews;
using Library.WebMVC.Extentions.LibraryContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers
{
    public class LibTestController : Controller
    {
        //
        private static List<char> alphbetRu = new List<char>(
                new char[] 
                {
                    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё',
                    'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М',
                    'Н', 'О', 'П', 'Р', 'С', 'Т', 'У',
                    'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ',
                    'Ы', 'Ь', 'Э', 'Ю', 'Я'
                }
            );

        //
        // GET: /Lybrary/
        public ActionResult Index()
        {
            return View();
        }

        /*     */
        public ActionResult Index1()
        {
            return View();
        }

        public JsonResult GetAuthorsData()
        {

            Thread.Sleep(0);

            List<AuthorView> authors = new List<AuthorView>();
            List<LetterView> authorLetters = new List<LetterView>();

            alphbetRu.ForEach(c => authorLetters.Add(new LetterView { name = c, count = 0 }));

            using (LibraryContext db = new LibraryContext())
            {
                try
                {

                    // выбираем авторов 
                    authors = db.GetViewList<Author, AuthorView>();

                    // заполним список первых букв по Имени,Отчеству,Фамили авторов
                    authors.ForEach(
                        p => authorLetters.AddRange(
                            new LetterView[] 
                                {
                                    new LetterView{name = p.firstName.FirstOrDefault(), count = 1},
                                    new LetterView{name = (String.IsNullOrEmpty(p.middleName)) ? '*' : p.middleName.First(), count = 1},
                                    new LetterView{name = p.lastName.FirstOrDefault(), count = 1}
                                }
                        )
                    );

                }
                catch (Exception ex) { }
                finally { }
            }

            authorLetters = authorLetters
                .Where(p => p.name != '*') // отбираем только не пустые 
                .GroupBy(p => p.name) // 
                .Select(k => new LetterView { name = k.Key, count = k.Sum(x => x.count) })
                .OrderBy(p => p.name).ToList(); ;

            return Json(new {authors = authors, authorsAlphabet = authorLetters, authorColumns = TableColumnsCollections.AuthorColumns }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBooksData() {

            Thread.Sleep(0);

            BooksData booksData = new BooksData();
            
            using (LibraryContext db = new LibraryContext())
            {
                try
                {
                    //booksData.data = db.Books.GetBookViewList();
                    booksData.columns = TableColumnsCollections.BookColumns;
                }
                catch (Exception ex)
                {
                    //booksData.isOk = false;
                    //booksData.message = "Данные о книгах не получены!!!";
                    //booksData.errorMessage = ex.Message;
                }
                finally 
                {
                    // nothing 
                }
            }
            return Json(booksData, JsonRequestBehavior.AllowGet);
        }

        /* */
        public ActionResult DeleteAuthor(int? id)
        {
            /* Проверим значение id */
            if (id == null)
            {
                /* id is null -> cancel the operation */
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Item identifier is not set.");
            }

            ActionResult res;

            using (LibraryContext db = new LibraryContext())
            {
                try
                {
                    Author author = db.Authors.Find(id);
                    if (author == null)
                    {
                        res = HttpNotFound("Author is not found!!!");
                    }
                    else 
                    {
                        db.Authors.Remove(author);
                        db.SaveChanges();

                        res = Json(new { message = String.Format("Item has been removed ") });
                    }

                }
                catch(Exception ex)
                {
                    res = new HttpStatusCodeResult(HttpStatusCode.InternalServerError, ex.Message);
                }

            }

            return res;
        }


        // POST: /Auhtors/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
//        [ValidateAntiForgeryToken]
        public ActionResult CreateAuthor([Bind(Include = "id,firstName,middleName,lastName,photo")] AuthorView newAuthor)
        {
            ActionResult res;

            if (ModelState.IsValid)
            {
                using (LibraryContext db = new LibraryContext())
                {
                    try
                    {
                        Author author = null;//newAuthor.GetAuthor();
                        db.Authors.Add(author);
                        db.SaveChanges();
                        res = Json(new { isOk = true, author = author.GetView<Author, AuthorView>() });
                    }
                    catch (Exception ex)
                    {
                        res = new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "   ----- " + ex.Message);
                    }
                }
            }
            else 
            {
                res = Json(new { isOk = false, message = "Данные не корректны !!!"});
            }
            return res;
        }

        [HttpPost]
        public ActionResult UpdateAuthor([Bind(Include = "id,firstName,middleName,lastName,photo")] AuthorView newAuthor)
        {
            ActionResult res;

            if (ModelState.IsValid)
            {
                using (LibraryContext db = new LibraryContext())
                {
                    try
                    {
                        if (newAuthor.id != 0) 
                        {
                            Author author = db.Authors.Find(newAuthor.id);
                            if (author != null)
                            {
                                author.FirstName = newAuthor.firstName;
                                author.SecondName = newAuthor.middleName;
                                author.LastName = newAuthor.lastName;
                                db.SaveChanges();
                                res = Json(new { isOk = true, author = author.GetView<Author, AuthorView>() });
                            }
                            else 
                            {
                                res = new HttpStatusCodeResult(HttpStatusCode.InternalServerError, String.Format("Item with id == {0} not found!!!", newAuthor.id));
                            }
                        }
                        else /* элемент не может быть найден */
                        {
                            res = new HttpStatusCodeResult(HttpStatusCode.InternalServerError, String.Format("Data is incorrect. Item may not be with id == 0; {0}", Json(newAuthor)));
                        }
                    }
                    catch (Exception ex)
                    {
                        res = new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "   ----- " + ex.Message);
                    }
                }
            }
            else
            {
                res = new HttpStatusCodeResult(HttpStatusCode.InternalServerError, String.Format("Data is not valid. Test the data", Json(newAuthor)));
            }
            return res;
        }

	}
}