using DIGISYSS.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Manager.Interface.Inventory
{
   public interface ICategoryManager
    {
        ResponseModel CreateCategory(InvCategory aObj);
        ResponseModel GetAllCategory();
    }
}
