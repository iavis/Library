using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.ModelViews
{

    /*
     *  
     *  Описание столбца таблицы
     *  для работы с данными на FRONTEND
     *  
     */

    public class DataTableColumn
    {
        #region Public Properties

        public string name { get; set; } // имя стоблца 

        public string vname { get; set; } // отображаемое имя столбца 

        public bool isVisible { get; set; } // поле отображается в таблице представления данных 

        public bool isEditable { get; set; } // поле доступно для редактирования 

        public bool isOrderable { get; set; } // 

        public bool isFilterable { get; set; } //

        #region Представление значения

        public bool isList { get; set; } // поле является выпадющим списком 

        public bool fromList { get; set; }// значение поля выбирается из списка значений

        public string bindName { get; set; } // имя свойства для значений в выпадющем списке 

        public string propView { get; set; } // если значение является объектом (isObject == true) - то отображаем значение value.propView        
        
        #endregion

        #region Типы значения
        public bool isPhoto { get; set; } // значение поля является адресом фоторафии

        public bool isText { get; set; } // значение поля имеет тип ТЕКСТ 

        public bool isData { get; set; } // значение поля имеет тип ДАТА

        public bool isNumber { get; set; } // значение поля имеет тип ЧИСЛО 

        public bool isObject { get; set; } // значение поля имеет тип ОБЪЕКТ типа {prop0 = val0, ..., propN = valN} 

        #endregion

        #region Условия для вводимого значений

        public bool isRequired { get; set; } // Поле должно быть заполнено 

        public string pattern { get; set; } // Регулярному выражение для значения поля 

        public int? minLength { get; set; } // Минимальная длина значения - для строковых

        public int? maxLength { get; set; } // Максимальная длина значения  - для строковых

        public int? minNumber { get; set; } // Минимальное значение - для числовых

        public int? maxNumber { get; set; } // Максимальное значение - для числовых 

        #endregion

        #region Сообщения ошибок ввода
        public string requiredErrorText { get; set; } // сообщение для 
        public string patternErrorText { get; set; } // сообщение для 
        public string minLengthErrorText { get; set; } // сообщение для 
        public string maxLengthErrorText { get; set; } // сообщение для 
        public string minNumberErrorText { get; set; } // сообщение для 
        public string maxNumberErrorText { get; set; } // сообщение для 


        #endregion

        public string placeholder {get; set;}

        public object style { get; set; }

        #endregion

        #region Constructors & Destructor
        public DataTableColumn()
        {
            this.isVisible = false;
            this.isEditable = false;

            this.isPhoto = false;
            this.isText = false;
            this.isData = false;
            this.isNumber = false;
            this.isObject = false;

            this.isList = false;
            this.fromList = false; 
            this.bindName = null;


            this.isRequired = false;
            this.pattern = null;
            this.minLength = null;
            this.maxLength = null;
            this.minNumber = null;
            this.maxNumber = null;
        }

        #endregion

    }
}