using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Library.WebMVC
{
    public static class BootstrapStyleExt
    {

        public static MvcHtmlString EditorForFormControlBS<TModel, TValue>(this HtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression)
        {
            return html.EditorFor(expression, new { htmlAttributes = new { @class = "form-control" }, });
        }

        public static MvcHtmlString ActionLinkCreateBS(this HtmlHelper htmlHelper, string linkText, string actionName)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, new { @class = "btn btn-primary " });
        }

        public static MvcHtmlString ActionLinkCreateBS(this HtmlHelper htmlHelper)
        {
            return htmlHelper.ActionLink("Добавить", "Create", null, new { @class = "btn btn-primary " });
        }
 
        public static MvcHtmlString ActionLinkSaveBS(this HtmlHelper htmlHelper, string linkText, string actionName)
        {
            return htmlHelper.ActionLink(linkText, actionName, null, new { @class = "btn btn-warning " });
        }


    }
}