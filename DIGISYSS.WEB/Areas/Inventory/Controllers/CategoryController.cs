using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;

namespace DIGISYSS.WEB.Areas.Inventory.Controller
{
    public class CategoryController : System.Web.Mvc.Controller
    {


        private ICategoryManager _aManager;

        public CategoryController()
        {
            _aManager = new CategoryManger();
        }
        // GET: Inventory/InvCategory
        public ActionResult CategorySettings()
        {
            return View();
        }

        

       

        // POST: /Inventory/Employee/CreateEmployee

        public JsonResult CreateCategory(InvCategory aObj)
        {

            var data = _aManager.CreateCategory(aObj);

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);

        }

        // GET: /Inventory/Student/GetAllStudent
        public JsonResult GetAllCategory()
        {

            var data = _aManager.GetAllCategory();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);

        }
    }
}