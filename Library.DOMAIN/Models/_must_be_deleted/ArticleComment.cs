using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    public class ArticleComment : TestEntity
    {
        public int ArticleId { get; set; }
        
        public Article Article { get; set; }

        public int CommentId { get; set; }

        public Comment Comment { get; set; }

    }
}
