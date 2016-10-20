namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _F5 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "Isbn10", c => c.String());
            AddColumn("dbo.Books", "Isbn13", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Books", "Isbn13");
            DropColumn("dbo.Books", "Isbn10");
        }
    }
}
