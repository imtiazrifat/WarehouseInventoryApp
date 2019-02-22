using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;

namespace DIGISYSS.Manager.Interface.Inventory
{
    interface ISupplierManager
    {
        ResponseModel CreateSupplier(InvSupplier aObj);
        ResponseModel GetAllSupplier();
        ResponseModel GetAllSupplierNameForDd();
    }
}
