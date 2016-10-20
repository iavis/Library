namespace Library.WebMVC.ModelBinders
{
    using System;
    using System.Reflection;
    using System.Web.Mvc;

    public abstract class EntityModelBinder : IModelBinder
    {

        #region Public & Protected 

        protected ControllerContext controllerContext;

        protected ModelBindingContext bindingContext;

        protected string prefix;
        
        #endregion

        public abstract object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext);

        protected string GetValue(ModelBindingContext bindingContext, string prefix, string key)
        {
            ValueProviderResult vpr = bindingContext.ValueProvider.GetValue(prefix + key);
            return vpr == null ? null : vpr.AttemptedValue;
        }

        protected string GetValue(string key)
        {
            ValueProviderResult vpr = this.bindingContext.ValueProvider.GetValue(this.prefix + key);
            return vpr == null ? null : vpr.AttemptedValue;
        }

        protected T GetValue<T>(string key)  
        {

            ValueProviderResult vpr = this.bindingContext.ValueProvider.GetValue(this.prefix + key);
            string value = vpr == null ? null : vpr.AttemptedValue;

            MethodInfo m = typeof(T).GetMethod("Parse", new Type[] { typeof(string) } );

            if (m != null)
            {
                return (T)m.Invoke(null, new object[] { value });
            }
            else
            {
                return (T)Convert.ChangeType(value, typeof(T));
            }

        }




    }
}