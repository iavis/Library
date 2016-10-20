using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Library.WebMVC.Additions.Interfaces
{
    public interface ICrudEntityController
    {
        
    }

    public interface ICrudEntityController<T> : ICrudEntityController
    {
        ActionResult Create(T item);
        ActionResult Update(T item);
        ActionResult Delete(int id);
        ActionResult GetData();

    }


}