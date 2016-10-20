namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Models;
    using System.Collections.Generic;

    internal sealed class Configuration : DbMigrationsConfiguration<Library.DOMAIN.LibraryContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Library.DOMAIN.LibraryContext context)
        {


            #region Authors

            // ������� ���������������� �������
            Author autDinoEsposito = new Author { FirstName = "����", LastName = "��������", Photo = "DinoEsposito.jpg" };
            Author autDominickBaier = new Author { FirstName = "�������", LastName = "�����", Photo = "DominikBayer.jpg" };
            Author autMatiaLah = new Author { FirstName = "�����", LastName = "���", Photo = "nophoto.jpg" };
            Author autGregaJerkich = new Author { FirstName = "�����", LastName = "������" };
            Author autDijanSarka = new Author { FirstName = "������", LastName = "�����" };

            // ���� ������� � ���� ������ 
            List<Author> authors = new List<Author>(new Author[] { autDinoEsposito, autDijanSarka, autDominickBaier, autGregaJerkich, autMatiaLah });

            //authors.Add(new Author { FirstName = "���������", SecondName = "���������", LastName = "������" });
            //authors.Add(new Author { FirstName = "���", SecondName = "����������", LastName = "�������" });
            //authors.Add(new Author { FirstName = "�������", SecondName = "����������", LastName = "������" });
            //authors.Add(new Author { FirstName = "������", SecondName = "�������", LastName = "���������" });
            //authors.Add(new Author { FirstName = "������", SecondName = "�����������", LastName = "��������" });
            //authors.Add(new Author { FirstName = "�������", SecondName = "�����", LastName = "�����" });
            //authors.Add(new Author { FirstName = "��������", SecondName = "������������", LastName = "����������" });
            //authors.Add(new Author { FirstName = "�������", SecondName = "���������", LastName = "��������" });
            //authors.Add(new Author { FirstName = "�����", SecondName = "��������", LastName = "��������" });
            //authors.Add(new Author { FirstName = "���������", SecondName = "����������", LastName = "�������" });
            //authors.Add(new Author { FirstName = "�������", SecondName = "���������", LastName = "���������" });

            //authors.Add(new Author { FirstName = "", SecondName = "", LastName = "" });

            // ���������� ���� ������ 
            authors.ForEach(s => context.Authors.AddOrUpdate(p => new { p.FirstName, p.LastName }, s));
            context.SaveChanges();

            #endregion

            #region Publishers

            Publisher pblPiter = new Publisher { Name = "�����" };
            Publisher pblApress = new Publisher { Name = "APress" };
            Publisher pblRusEd = new Publisher { Name = "������� ��������" };

            List<Publisher> publishers = new List<Publisher>(new Publisher[] { pblPiter, pblApress, pblRusEd });

            publishers.ForEach(s => context.Publishers.AddOrUpdate(p => p.Name, s));
            context.SaveChanges();

            #endregion

            #region Books

            Book book1 = new Book
                {
                    Name = "���������� ���-���������� � �������������� ASP.NET � AJAX",
                    PageCount = 400,
                    Year = 2012,
                    Isbn10 = "",
                    Isbn13 = "978-5-459-00347-5"
                }; // ���� ��������

            Book book2 = new Book
                {
                    Name = "Microsoft ASP .NET. ����������� ������������",
                    PageCount = 430,
                    Year = 2008,
                    Isbn10 = "0-7356-2331-6",
                    Isbn13 = "978-5-91180-802-0"
                }; // ������� ����� 

            Book book3 = new Book
            {
                Name = "Microsoft SQL Server 2012. ���������� �������� ������. ������� ���� Microsoft",
                PageCount = 816,
                Year = 2014,
                Isbn10 = "",
                Isbn13 = "978-5-7502-0431-1"
            }; // ����� ���, ����� ������, ������ �����

            Book book4 = new Book
            {
                Name = "Microsoft SQL Server 2000",
                PageCount = 16,
                Year = 2001,
                Isbn10 = "",
                Isbn13 = "978-5-7502-0431-1",
                Publisher = context.Publishers.FirstOrDefault(p => p.Id == 8)

            }; // ����� ���, ����� ������, ������ �����

            List<Book> books = new List<Book>(new Book[] { book1, book2, book3, book4 });

            books.ForEach(s => context.Books.AddOrUpdate(p => p.Name, s));

            context.SaveChanges();

            AddOrUpdateAuthor(context, book1, autDinoEsposito);

            AddOrUpdateAuthor(context, book2, autDominickBaier);

            AddOrUpdateAuthor(context, book3, autMatiaLah);
            //AddOrUpdateAuthor(context, book3, autGregaJerkich);
            AddOrUpdateAuthor(context, book3, autDijanSarka);

            context.SaveChanges();
            #endregion

        }

        void AddOrUpdateAuthor(Library.DOMAIN.LibraryContext context, Book book, Author author)
        {
            var _book = context.Books.SingleOrDefault(b => b.Name == book.Name);
            var _author = book.Authors.SingleOrDefault(a => (a.LastName == author.LastName) && (a.FirstName == author.FirstName));
            if (_author == null)
                _book.Authors.Add(context.Authors.Single(a => (a.LastName == author.LastName) && (a.FirstName == author.FirstName)));
        }



    }
}
