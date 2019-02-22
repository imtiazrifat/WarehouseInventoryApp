using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IOutletPOReturnManager
    {
        ResponseModel OutletPoReturnDetails(OutletPOReturnDetailsViewModel OutletPOReturnData, List<ProductOutletPOReturnVM> productList);
        ResponseModel GetAllOutletPoReturnRequest();
        ResponseModel GetIndividualOutletPoReturnView(int OutletPOReturnMasterId);
        ResponseModel OutletPoReturnByMarterId(OutletPOReturnDetailsViewModel OutletPOReturnData, List<ProductOutletPOReturnVM> productList);
        ResponseModel ChangeStatusValueInMasterTable(InvOutletPOReturnMaster aObj);

        //ResponseModel ReturnOutletPoByMasterId(InvOutletPOMaster aObj);
        //ResponseModel ReturnOutletPoByDetailId(InvOutletPODetail aObj);



    }
}
