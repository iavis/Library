namespace Library.DOMAIN.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MUST_BE_DELETED3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Comments", "GoodId", c => c.Int(nullable: false));
            CreateIndex("dbo.Comments", "GoodId");
            AddForeignKey("dbo.Comments", "GoodId", "dbo.Goods", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "GoodId", "dbo.Goods");
            DropIndex("dbo.Comments", new[] { "GoodId" });
            DropColumn("dbo.Comments", "GoodId");
        }
    }
}
