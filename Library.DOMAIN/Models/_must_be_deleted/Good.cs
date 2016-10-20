using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    public class Good : TestEntity
    {
        public string Name { get; set; }

        public ICollection<Comment> Comments { get; set; }


    }
}
