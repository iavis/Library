using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Library.DOMAIN.Models
{

    /// <summary>
    /// Автор 
    /// </summary>
    public class Author : LibraryEntity
    {
        [Key]
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Имя не может быть пустым")]
        [MaxLength(Constants.AuthorNameMaxLenth)]
        [RegularExpression("^[A-ZА-Я][a-zа-яA-ZА-Я]*$")]
        [Display(Name = "Name")]
        public string FirstName { get; set; }


        [MaxLength(Constants.AuthorNameMaxLenth)]
        [Display(Name = "Middle name")]
        public string SecondName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Фамилия не может быть пустой")]
        [MaxLength(Constants.AuthorNameMaxLenth)]
        [RegularExpression("^[A-ZА-Я][a-zа-яA-ZА-Я]*$")]
        [Display(Name = "Surname")]
        public string LastName { get; set; }

        public string Photo { get; set; }

        public string ShortName 
        {
            get 
            {
                return "";
            } 

        }
        
        
        public string LongName 
        { 
            get
            {
                return String.Format(
                    "{0}{1}{2}", 
                    FirstName, 
                    String.IsNullOrEmpty(SecondName) == true ? " " : " " + SecondName + " ", 
                    LastName
                    );
            }  
        }

        public virtual ICollection<Book> Books { get; set; }


        #region Constructors & Destructors
        
        public Author()
        {
        }

        public Author(string FirstName, string SecondName, string LastName, string Photo)
        {
            this.FirstName = FirstName;
            this.SecondName = SecondName;
            this.LastName = LastName;
            this.Photo = Photo;
        }

        #endregion

    }



}
