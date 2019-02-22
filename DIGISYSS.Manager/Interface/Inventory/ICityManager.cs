using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface ICityManager
    {
        ResponseModel CreateCity(InvCityList aObj);
        ResponseModel GetAllCity();

    }
}
