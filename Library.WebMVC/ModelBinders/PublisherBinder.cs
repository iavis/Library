
namespace Library.WebMVC.ModelBinders
{
    using Library.DOMAIN.Models;
    using System.Web.Mvc;

    public sealed class PublisherBinder : EntityModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {

            Publisher model = (Publisher)bindingContext.Model ?? new Publisher();

            bool hasPrefix = bindingContext.ValueProvider.ContainsPrefix(bindingContext.ModelName);

            string searchPrefix = hasPrefix ? bindingContext.ModelName + "." : "";

            model.Id = int.Parse(base.GetValue(bindingContext, searchPrefix, "id"));
            model.Name = base.GetValue(bindingContext, searchPrefix, "name");

            return model;
        }

    }

}