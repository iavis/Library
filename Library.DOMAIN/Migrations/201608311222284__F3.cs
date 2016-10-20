namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _F3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Authors", "Book_Id", c => c.Int());
            CreateIndex("dbo.Authors", "Book_Id");
            AddForeignKey("dbo.Authors", "Book_Id", "dbo.Books", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Authors", "Book_Id", "dbo.Books");
            DropIndex("dbo.Authors", new[] { "Book_Id" });
            DropColumn("dbo.Authors", "Book_Id");
        }
    }
}
