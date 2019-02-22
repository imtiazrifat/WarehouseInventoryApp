using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IWarehousePOManager
    {
        ResponseModel CreateWarehousePODetails(WarehousePODetailsViewModel WarehousePOData, List<ProductWarehousePOVM> productList);
        ResponseModel GetAllWarehousePOData();


        ResponseModel GetAllWarehousePOView();
        ResponseModel GetIndividualWarehousePOView(int WarehousePOMasterId);
        ResponseModel GetASingleProducDataOfWarehousePOView(int WarehousePODetailsId);
        ResponseModel UpdateASingleProducDataOfWarehousePOView(InvWarehousePOItemReceived aObj);
        ResponseModel GetAllApprovedWarehousePOViewByWarehouse();
        ResponseModel ChangeStatusValue(InvWarehousePOMaster aObj);
        ResponseModel ChangeStockValue(InvWarehousePOMaster aObj);
       
    }
}
