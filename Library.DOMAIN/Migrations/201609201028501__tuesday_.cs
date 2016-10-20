namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _tuesday_ : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Authors", "Photo", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Authors", "Photo");
        }
    }
}
