namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _F1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AuthorImgs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Img = c.Binary(),
                        AuthorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Authors", t => t.AuthorId, cascadeDelete: true)
                .Index(t => t.AuthorId);
            
            CreateTable(
                "dbo.Authors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 49),
                        SecondName = c.String(maxLength: 49),
                        LastName = c.String(nullable: false, maxLength: 49),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.BookImgs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Img = c.Binary(),
                        BookId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Books", t => t.BookId, cascadeDelete: true)
                .Index(t => t.BookId);
            
            CreateTable(
                "dbo.Books",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Publishers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 99),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BookImgs", "BookId", "dbo.Books");
            DropForeignKey("dbo.AuthorImgs", "AuthorId", "dbo.Authors");
            DropIndex("dbo.BookImgs", new[] { "BookId" });
            DropIndex("dbo.AuthorImgs", new[] { "AuthorId" });
            DropTable("dbo.Publishers");
            DropTable("dbo.Books");
            DropTable("dbo.BookImgs");
            DropTable("dbo.Authors");
            DropTable("dbo.AuthorImgs");
        }
    }
}
