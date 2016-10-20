using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    public class AuthorImg : LibraryEntity
    {
        #region Constructors & Destructors

        [Key]
        public int Id { get; set; }

        public byte[] Img { get; set; }

        public int AuthorId { get; set; }

        public virtual Author Author { get; set; }
        
        #endregion


    }
}
