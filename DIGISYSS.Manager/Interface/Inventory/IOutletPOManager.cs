using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IOutletPOManager
    {
        ResponseModel CreateOutletPODetails(OutletPODetailsViewModel OutletPOData, List<ProductOutletPOVM> productList);
        ResponseModel GetAllOutletPOData();
        ResponseModel GetAllOutletPOView();
        ResponseModel GetIndividualOutletPOView(int OutletPOMasterId);
        ResponseModel GetAllReceivedOutletPoByWarehouse();
        ResponseModel GetASingleProducDataOfOutletPOView(int OutletPODetailsId);
        ResponseModel UpdateASingleProducDataOfOutletPOView(InvOutletPODetail aObj);
        ResponseModel GetAllApprovedOutletPOViewByWarehouse();
        ResponseModel ChangeStatusValueInMasterTable(InvOutletPOMaster aObj);
        ResponseModel ChangeStatusValueInDetailTable(InvOutletPODetail aObj);
        ResponseModel ChangeStatusValueInMasterOrDetail(InvOutletPODetail aObj);
        ResponseModel ChangeStockValue(InvOutletPOMaster aObj);
       
    }
}
