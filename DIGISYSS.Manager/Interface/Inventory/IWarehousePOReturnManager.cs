using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IWarehousePOReturnManager
    {
        ResponseModel CreateWarehousePOReturnDetails(WarehousePODetailsViewModel WarehousePOReturnData, List<ProductWarehousePOVM> productList);
        ResponseModel GetAllWarehousePOData();
        ResponseModel GetAllWarehousePO();
        ResponseModel GetIndividualWarehousePO(int WarehousePOReturnMasterId);
        ResponseModel GetASingleProducDataOfWarehousePO(int WarehousePOReturnDetailsId);
        ResponseModel UpdateASingleProducDataOfWarehousePO(InvWarehousePODetail aObj);
        ResponseModel GetAllReceivedWarehousePOByWarehouse();

        ResponseModel ChangeStatusValueInMasterTable(InvWarehousePOMaster aObj);
        ResponseModel ChangeStatusValueInDetailTable(InvWarehousePODetail aObj);
        ResponseModel ChangeStatusValueInMasterOrDetail(InvWarehousePODetail aObj);
        ResponseModel ChangeStockValue(InvWarehousePOMaster aObj);
       
    }
}
