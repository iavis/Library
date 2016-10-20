namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class books_add_publisher : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "PublisherId", c => c.Int(nullable: true));
            CreateIndex("dbo.Books", "PublisherId");
            AddForeignKey("dbo.Books", "PublisherId", "dbo.Publishers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Books", "PublisherId", "dbo.Publishers");
            DropIndex("dbo.Books", new[] { "PublisherId" });
            DropColumn("dbo.Books", "PublisherId");
        }
    }
}
