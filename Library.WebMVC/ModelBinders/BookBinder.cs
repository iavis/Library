namespace Library.WebMVC.ModelBinders
{
    using Library.DOMAIN.Models;
    using System.Web.Mvc;

    public class BookBinder : EntityModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            Book model = (Book)bindingContext.Model ?? new Book();

            bool hasPrefix = bindingContext.ValueProvider.ContainsPrefix(bindingContext.ModelName);

            string searchPrefix = hasPrefix ? bindingContext.ModelName + "." : "";

            model.Id = int.Parse(base.GetValue(bindingContext, searchPrefix, "id"));
            model.Name = base.GetValue(bindingContext, searchPrefix, "name");
            model.Isbn13 = base.GetValue(bindingContext, searchPrefix, "isbn");
            model.PageCount = int.Parse(base.GetValue(bindingContext, searchPrefix, "pageCount"));
            model.Photo = base.GetValue(bindingContext, searchPrefix, "photo");
            
            model.Year = int.Parse(base.GetValue(bindingContext, searchPrefix, "year"));

            model.PublisherId = int.Parse(base.GetValue(bindingContext, searchPrefix, "publisher.id"));

            //public int id { get; set; } // 
            //public string name { get; set; } // название 
            //public int pageCount { get; set; } // колво страниц
            //public int year { get; set; } // год выпуска
            //public string isbn { get; set; }
            //public string photo { get; set; }
            //public PublisherView publisher { get; set; }
            //public List<int> authors { get; set; } // список идентификаторов авторов            

            return model;
        }
    }
}