using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IOutletInvoiceManager
    {
        ResponseModel GetAllOutletInvoiceData();
        ResponseModel GetIndividualOutletInvoiceData(int OutletInvoiceMasterId);
        ResponseModel GetAProducDataByOutletInvoiceDetailsId(int OutletInvoiceDetailsId);
        ResponseModel UpdateASoldProducData(InvOutletInvoiceDetail aObj);



        ///////////////////Here,"GetIndividualOutletInvoiceData" and "GetAProducDataByOutletInvoiceDetailsId"  are to replace by these two "GetDetailsByOutletInvoiceMasterId" and "GetDetailsByOutletInvoiceDetailsId"
        ResponseModel GetDetailsByOutletInvoiceMasterId(int OutletInvoiceMasterId);
        ResponseModel GetDetailsByOutletInvoiceDetailsId(int OutletInvoiceDetailsId);


        ResponseModel GetDetailsByOutletSaleInvoiceNo(int OutletSaleInvoiceNo);
        ResponseModel UpdteInvoiceDataByOutletSaleInvoiceNo(InvOutletInvoiceMaster aObj);
        ResponseModel UpdteInvoiceForDuePaymentReturn(OutletSaleUIDetailsViewModel outletSaleUiData, List<OutletSaleUIVM> productList);
    }
}
