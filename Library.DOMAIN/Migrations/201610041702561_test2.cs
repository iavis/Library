namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test2 : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Publishers", name: "Name3", newName: "NameREd3");
        }
        
        public override void Down()
        {
            RenameColumn(table: "dbo.Publishers", name: "NameREd3", newName: "Name3");
        }
    }
}
