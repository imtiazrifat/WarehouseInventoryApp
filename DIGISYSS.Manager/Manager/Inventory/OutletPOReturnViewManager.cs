using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class OutletPOReturnViewManager : IOutletPOReturnViewManager
    {
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public OutletPOReturnViewManager()
        {
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
        }
    }
}

