namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Publishers", "Name3", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Publishers", "Name3");
        }
    }
}
