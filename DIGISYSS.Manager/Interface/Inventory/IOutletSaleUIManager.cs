using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;

namespace DIGISYSS.Manager.Interface.Inventory
{
    public interface IOutletSaleUIManager
    {
        ResponseModel GetOutletSaleInvoiceNo();
        ResponseModel CreateOutletSaleUIDetails(OutletSaleUIDetailsViewModel OutletSaleUIData, List<OutletSaleUIVM> productList);
        ResponseModel GetOutletSaleData();
        ResponseModel GetAllOutletInvoiceData();
        ResponseModel GetIndividualOutletInvoiceData(int OutletInvoiceMasterId);
    }
}
