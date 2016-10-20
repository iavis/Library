using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{

    /// <summary>
    /// Издательство 
    /// </summary>
    public class Publisher : LibraryEntity
    {

        #region Public Properties

        [Key]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Наименование не может быть пустым")]
        [MaxLength(99, ErrorMessage = "Наименование не може быть больше 99 символов")]
        [Display(Name = "Name")]
        public string Name { get; set; }

        #endregion

    }

}
