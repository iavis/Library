namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Publishers", "Name2", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Publishers", "Name2");
        }
    }
}
