namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _book_add_column_Photo : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Books", "Photo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Books", "Photo");
        }
    }
}
