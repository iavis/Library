namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _F8 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Authors", "Book_Id", "dbo.Books");
            DropIndex("dbo.Authors", new[] { "Book_Id" });
            DropColumn("dbo.Authors", "Book_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Authors", "Book_Id", c => c.Int());
            CreateIndex("dbo.Authors", "Book_Id");
            AddForeignKey("dbo.Authors", "Book_Id", "dbo.Books", "Id");
        }
    }
}
