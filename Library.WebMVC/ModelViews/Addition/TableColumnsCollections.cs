using Library.DOMAIN;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.ModelViews
{
    public static class TableColumnsCollections
    {

        private static List<DataTableColumn> authorColumns;
        private static List<DataTableColumn> bookColumns;
        private static List<DataTableColumn> publisherColumns;

        public static List<DataTableColumn> AuthorColumns { get { return authorColumns; } }

        public static List<DataTableColumn> BookColumns { get { return bookColumns; } }

        public static List<DataTableColumn> PublisherColumns { get { return publisherColumns; } }

        static TableColumnsCollections()
        {

            #region Описание параметров колоноко для объекта AuthorView

            authorColumns = new List<DataTableColumn>();
            authorColumns.AddRange(new DataTableColumn[]{
                new DataTableColumn 
                    {
                        name = "id", vname = "id", 
                        isVisible = true, isFilterable = false,
                        style = new {maxWidth = "25px"}
                    },
                new DataTableColumn 
                    {
                        name = "photo", vname = "Фото", 
                        isVisible = true, isFilterable = false, 
                        isPhoto = true,
                        style = new {maxWidth = "75px"}
                    },
                new DataTableColumn 
                    {
                        name = "firstName", vname = "Имя", 
                        isVisible = true, isEditable = true, isFilterable = false, isOrderable = true , 
                        isRequired = true, pattern = "^[A-ZА-Я][a-zа-яA-ZА-Я]*$", maxLength = Constants.AuthorNameMaxLenth, 
                        requiredErrorText = "Введите имя",
                        patternErrorText = "С большой буквы и только буквы",
                        minLengthErrorText = "Мин. длина 1 буква",
                        maxLengthErrorText = String.Format("Макс. длина {0} букв", Constants.AuthorNameMaxLenth),
                        minNumberErrorText = null,
                        maxNumberErrorText = null,
                        placeholder = "Александр"
                    },
                new DataTableColumn 
                    {
                        name = "middleName", vname = "Отчество", 
                        isVisible = true, isEditable = true,  isFilterable = false, 
                        pattern = "^[A-ZА-Я][a-zа-яA-ZА-Я]*$", maxLength = Constants.AuthorNameMaxLenth, 
                        patternErrorText = "С большой буквы и только буквы",
                        maxLengthErrorText = String.Format("Макс. длина {0} букв", Constants.AuthorNameMaxLenth),
                        minNumberErrorText = null,
                        maxNumberErrorText = null,
                        placeholder = "Сергеевич"
                    },
                new DataTableColumn 
                    {
                        name = "lastName", vname = "Фамилия", 
                        isVisible = true,  isEditable = true, isFilterable = false, isOrderable = true, 
                        isRequired = true, pattern = "^[A-ZА-Я][a-zа-яA-ZА-Я]*$", maxLength = Constants.AuthorNameMaxLenth, 
                        requiredErrorText = "Введите фамилию",
                        patternErrorText = "С большой буквы и только буквы",
                        minLengthErrorText = "Мин. длина 1 буква",
                        maxLengthErrorText = String.Format("Макс. длина {0} букв", Constants.AuthorNameMaxLenth),
                        minNumberErrorText = null,
                        maxNumberErrorText = null,
                        placeholder = "Пушкин"
                    },
                new DataTableColumn 
                    {
                        name = "bookCount", vname = "Кол-во книг", 
                        isVisible = true
                    }
            });
            #endregion


            #region Описание параметров колоноко для объекта BookView

            bookColumns = new List<DataTableColumn>();
            bookColumns.AddRange(new DataTableColumn[]{
                new DataTableColumn 
                    {
                        name = "id", vname = "id", 
                        isVisible = true, isFilterable = false 
                    },
                new DataTableColumn 
                    {
                        name = "photo", vname = "Фото", 
                        isVisible = true, isFilterable = false, 
                        isPhoto = true 
                    },
                new DataTableColumn 
                    {
                        name = "name", vname = "Наименование", 
                        isVisible = true,  isEditable = true, isFilterable = false, isOrderable = true, 
                        isRequired = true, pattern = null, maxLength = 199, 
                        requiredErrorText = "Введите наименование",
                        patternErrorText = "",
                        minLengthErrorText = "Мин. длина 1 буква",
                        maxLengthErrorText = String.Format("Макс. длина {0} букв", 199),
                        minNumberErrorText = null,
                        maxNumberErrorText = null,
                        placeholder = "Книга о вкусной и здоровой пище"
                    },
                new DataTableColumn 
                    {
                        name = "isbn", vname = "ISBN", 
                        isVisible = true,  isEditable = true, isFilterable = false, isOrderable = true, 
                        isRequired = true, pattern = "", maxLength = 199, 
                        requiredErrorText = "Введите ISBN",
                        patternErrorText = "ISBN имеет не правильный формат",
                        minLengthErrorText = "Мин. длина 1 буква",
                        maxLengthErrorText = String.Format("Макс. длина {0} букв", 199),
                        minNumberErrorText = "Макс. колво страниц 1 ",
                        maxNumberErrorText = "Макс. колво страниц 5000 ",
                        placeholder = "Книга о вкусной и здоровой пище это миф"
                    },
                new DataTableColumn 
                    {
                        name = "pageCount", vname = "Стр.", 
                        isVisible = true,  isEditable = true, isFilterable = false, isOrderable = true, 
                        isRequired = true, pattern = "^[1-9][0-9]*$", 
                        requiredErrorText = "Введите кол-во страниц",
                        patternErrorText = "Можно вводить только цифры",
                        minNumberErrorText = "Макс. колво страниц 1 ",
                        maxNumberErrorText = "Макс. колво страниц 5000 ",
                        placeholder = "Кол-во страниц",
                        style = new {maxWidth = "100px"}
                    },
                new DataTableColumn 
                    {
                        name = "year", vname = "Год", 
                        isVisible = true,  isEditable = true, isFilterable = false, isOrderable = false, 
                        isRequired = true, 
                        pattern = "^[1-9][0-9]*$",
                        minNumber = 1785,
                        maxNumber = DateTime.Now.Year,
                        requiredErrorText = "Введите кол-во страниц",
                        patternErrorText = "Можно вводить только цифры",
                        minNumberErrorText = String.Format("Макс. год {0}", DateTime.Now.Year),
                        maxNumberErrorText = String.Format("Мин. год {0}", 1785),
                        placeholder = "Год выпуска",
                        style = new {maxWidth = "100px"}
                    },
                new DataTableColumn 
                    {
                        name = "publisher", 
                        vname = "Издательство", 
                        isVisible = true,  
                        isEditable = true,
                        requiredErrorText = "Выбор издательства",
                        placeholder = "Издательство",
                        isObject = true,  
                        isList = true,  
                        bindName = "publishers",
                        style = new {width = "150px"}
                    }

            });

            #endregion


            #region Описание параметров колоноко для объекта PublisherView

            publisherColumns = new List<DataTableColumn>();
            publisherColumns.AddRange(new DataTableColumn[]{
                new DataTableColumn 
                    {
                        name = "id", 
                        vname = "id", 
                        isVisible = true, 
                        style = new {width = "35px"}
                    },
                new DataTableColumn 
                    {
                        name = "name", 
                        vname = "Название", 
                        isVisible = true,  
                        isEditable = true, 
                        isOrderable = true, 
                        isRequired = true, 
                        pattern = null, 
                        maxLength = 199,  
                        requiredErrorText = "Введите название",
                        patternErrorText = "",
                        minLengthErrorText = "Мин. длина 1 буква",
                        maxLengthErrorText = String.Format("Макс. длина {0} букв", 199),
                        minNumberErrorText = null,
                        maxNumberErrorText = null,
                        placeholder = "Название издательства"
                    }
            });


            #endregion


        }

    }
}