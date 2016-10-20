using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Library.WebMVC
{
    using Library.DOMAIN.Models;
    using Library.WebMVC.ModelBinders;
    
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            
            GlobalConfiguration.Configure(WebApiConfig.Register); /* Необходимо добавить эту строку если в проекте MVC you would use WebApi*/

            System.Web.Mvc.ModelBinders.Binders.Add(typeof(Publisher), new PublisherBinder());
            System.Web.Mvc.ModelBinders.Binders.Add(typeof(Book), new BookBinder());

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Database.SetInitializer<Library.DOMAIN.LibraryContext>(null);

        }
    }
}
