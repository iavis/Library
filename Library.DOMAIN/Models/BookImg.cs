using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    public class BookImg : LibraryEntity
    {

        #region Public Properties 
        
        [Key]
        public int Id { get; set; }

        public byte[] Img { get; set; }

        public int BookId {get;set;}

        public virtual Book Book { get; set; }

        #endregion


        

    }
}
