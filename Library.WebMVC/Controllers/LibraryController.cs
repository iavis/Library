using Library.DOMAIN;
using Library.WebMVC.ModelViews;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Controllers
{
    public class LibraryController : Controller
    {

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


        public JsonResult GetData()
        {


            List<BookView> books = new List<BookView>();
            List<AuthorView> authors = new List<AuthorView>();
            List<LetterView> booksLetters = new List<LetterView>();
            List<LetterView> authorLetters = new List<LetterView>();

            alphbetRu.ForEach(c => authorLetters.Add(new LetterView { name = c, count = 0 }));


            using (LibraryContext db = new LibraryContext())
            {
                try
                {
                    // выбираем книги имеющиеся в базе
                    books = db.Books.Select(
                        p => new BookView
                        {
                            id = p.Id,
                            name = p.Name,
                            isbn = p.Isbn13,
                            pageCount = p.PageCount,
                            year = p.Year,
                            authors = p.Authors.Select(x => x.Id).ToList()
                        }).ToList();

                    // выбираем авторов 
                    authors = db.Authors.Select(
                        p => new AuthorView
                        {
                            id = p.Id,
                            firstName = p.FirstName,
                            middleName = p.SecondName,
                            lastName = p.LastName,
                            books = p.Books.Select(x => x.Id).ToList()
                        }).ToList();


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

            return Json(new { books = books, authors = authors, authorsAlphabet = authorLetters }, JsonRequestBehavior.AllowGet);
        }





    }
}