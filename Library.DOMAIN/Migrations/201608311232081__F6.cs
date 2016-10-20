namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _F6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "PageCount", c => c.Int(nullable: false));
            AddColumn("dbo.Books", "Year", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Books", "Year");
            DropColumn("dbo.Books", "PageCount");
        }
    }
}
