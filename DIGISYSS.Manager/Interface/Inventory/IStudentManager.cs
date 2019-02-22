using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
   public interface IStudentManager
    {
       ResponseModel CreateStudentDetails(StudentDetails aObj);
       ResponseModel GetAllStudentData();
    }
}
