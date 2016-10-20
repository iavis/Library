using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    public class Comment : TestEntity
    {
        public string Content { get; set; }

        public int ArticleId { get; set; }

        public Article Article { get; set; }

        public int GoodId { get; set; }

        public Good Good { get; set; }

    }
}
