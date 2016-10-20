using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Library.WebMVC.Additions
{
    public class NgControllerResponse
    {

        #region Public Properties 
        
        public bool isOk { get; set; }

        public string okMessage { get; set; }

        public string errorMessage { get; set; }

        public object data { get; set; }

        #endregion


        #region Constructors & Destructor

        public NgControllerResponse()
        {
            this.isOk = true;
            this.okMessage = null;
            this.errorMessage = null;
            this.data = null;
        }

        #endregion

    }
}