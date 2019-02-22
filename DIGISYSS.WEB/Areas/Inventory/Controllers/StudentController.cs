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
    public class StudentController : System.Web.Mvc.Controller
    {
        private IStudentManager _aManager;

        public StudentController()
        {
            _aManager = new StudentManager();
        }

        //
        // GET: /Inventory/Student/StudentSettings
        public ActionResult StudentSettings()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            return View();
        }

        //  GET: /Inventory/Student/CreateStudentDetails

        public JsonResult CreateStudentDetails(StudentDetails aObj)
        {

            var data = _aManager.CreateStudentDetails(aObj);
           

            return Json(new { success = data.Status, data }, JsonRequestBehavior.AllowGet);
            // return null;


        }
        
        // GET: /Inventory/Student/GetAllStudent
        public JsonResult GetAllStudentData()
        {
            // ViewBag.AssetCategory = "active";
            //return "good";
            var data = _aManager.GetAllStudentData();

            return Json(new { data = data.Data }, JsonRequestBehavior.AllowGet);
            // return _aManager.GetAllAssetCategory();
        }
    }
}