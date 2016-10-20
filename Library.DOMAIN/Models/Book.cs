using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.DOMAIN.Models
{
    /// <summary>
    /// Книга 
    /// </summary>
    public class Book : LibraryEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Display(Name = "Кол-во страниц")]
        [Range(1, 9999)]
        public int PageCount { get; set; }

        [Display(Name = "Год выпуска")]
        [Range(1800, Int32.MaxValue)]
        public int Year { get; set; }

        [Display(Name = "ISBN-10")]
        public string Isbn10 { get; set; }

        [Display(Name = "ISBN-13")]
        public string Isbn13 { get; set; }

        [Display(Name = "Фото")]
        public string Photo { get; set; }

        public int? PublisherId { get; set; }

        public virtual Publisher Publisher { get; set; }

        [Required]
        public virtual ICollection<Author> Authors { get; set; }

        public Book()
        {
            this.Authors = new List<Author>();
            this.Isbn10 = String.Empty;
            this.Isbn13 = String.Empty;
            this.Photo = String.Empty;
        }

    }



}
