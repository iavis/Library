using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    public class Article : TestEntity
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public ICollection<Comment> Comments{ get; set; }

    }

}
