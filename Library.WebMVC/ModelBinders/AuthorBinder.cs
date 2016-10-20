namespace Library.WebMVC.ModelBinders
{
    using Library.DOMAIN.Models;
    using System.Web.Mvc;

    public class AuthorBinder : EntityModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            Author model = (Author)bindingContext.Model ?? new Author();

            bool hasPrefix = bindingContext.ValueProvider.ContainsPrefix(bindingContext.ModelName);

            this.prefix = hasPrefix ? bindingContext.ModelName + "." : "";
            this.controllerContext = controllerContext;
            this.bindingContext = bindingContext;

            model.Id = base.GetValue<int>("id");
            model.FirstName = base.GetValue<string>("firstName");
            model.SecondName = base.GetValue<string>("middleName");
            model.LastName = base.GetValue<string>("lastName");
            model.Photo = base.GetValue<string>("photo");

            return model;

        }
    }

}