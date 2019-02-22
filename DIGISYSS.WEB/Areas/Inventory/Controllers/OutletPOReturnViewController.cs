using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controllers
{
    public class OutletPOReturnViewController : System.Web.Mvc.Controller
    {
        private IOutletPOReturnViewManager _aManager;

        public OutletPOReturnViewController()
        {
            _aManager = new OutletPOReturnViewManager();
        }
        
        //// GET: /Inventory/OutletPOReturnView/OutletPOReturnViewSettings
        public ActionResult OutletPOReturnViewSettings()
        {
            return View();
        }
       
    }
}