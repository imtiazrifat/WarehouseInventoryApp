using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IItemManager
    {
        ResponseModel CreateItem(InvItem aObj);
        ResponseModel GetAllItem();
        ResponseModel GetAllItemDropDownData();

    }
}
