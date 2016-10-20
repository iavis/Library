namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test4 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Publishers", "NameREd3");
            DropColumn("dbo.Publishers", "Name2");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Publishers", "Name2", c => c.String());
            AddColumn("dbo.Publishers", "NameREd3", c => c.String(maxLength: 99));
        }
    }
}
