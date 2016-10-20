namespace Library.DOMAIN
{
    using System;
    using System.Data.Entity;
    using System.Linq;
    using Models;

    public class LibraryContext : DbContext
    {
        // Your context has been configured to use a 'LibraryContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'Library.DOMAIN.LibraryContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'LibraryContext' 
        // connection string in the application configuration file.
        public LibraryContext()
            : base("name=LibraryConnection")
        {
        }

        public virtual DbSet<Author> Authors { get; set; }
        
        public virtual DbSet<AuthorImg> AuthorImgs { get; set; }
        
        public virtual DbSet<Book> Books { get; set; }
        
        public virtual DbSet<BookImg> BookImgs { get; set; }

        public virtual DbSet<Publisher> Publishers { get; set; }

        public virtual DbSet<Article> Articles { get; set; }
        
        public virtual DbSet<Comment> Comments { get; set; }

        public virtual DbSet<Good> Goods { get; set; }

        public virtual DbSet<ArticleComment> ArticleComments { get; set; }


        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //Configure Column

            //modelBuilder.Entity<Publisher>()
            //            .Property(p => p.Name3)
            //            .HasColumnName("NameREd3").HasMaxLength(99)
            //            .HasColumnOrder(1);
        }


    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}