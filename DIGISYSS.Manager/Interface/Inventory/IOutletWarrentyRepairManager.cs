using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IOutletWarrentyRepairManager
    {
        ResponseModel CreateOutletWarrentyRepair(InvOutletWarrentyRepair aObj);
        ResponseModel SaveOutletWarrentyDataFromWarehouse(InvOutletWarrentyRepair aObj);
        ResponseModel GetAllOutletWarrentyRepairRequest();
        

    }
}
