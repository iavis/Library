namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class test3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Publishers", "NameREd3", c => c.String(maxLength: 99));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Publishers", "NameREd3", c => c.String());
        }
    }
}
