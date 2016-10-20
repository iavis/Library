using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    using System.ComponentModel.DataAnnotations;

    public abstract class TestEntity
    {
        [Key]
        public int Id { get; set; }

    }
}
