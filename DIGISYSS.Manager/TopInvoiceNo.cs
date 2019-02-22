using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager
{
    public class TopInvoiceNo
    {
        private IGenericRepository<InvOutletInvoiceMaster> _aRepository;

        public TopInvoiceNo()
        {
            _aRepository = new GenericRepositoryInv<InvOutletInvoiceMaster>();

        }


        public string GetNewInvoiceNo()
        {
            DateTime today = DateTime.Today;
            string newInvoiceNo = "";
         //   InvOutletInvoiceMaster allInv = _aRepository.SelectAll().Where(a=>a.OutletSaleInvoiceNo!=null).OrderBy(aa => aa.OutletSaleInvoiceNo).Take(1).FirstOrDefault();
           // items.MaxBy(x => x.Height);
            int? allInv = _aRepository.SelectAll().Where(a => a.OutletSaleInvoiceNo != null && a.CreatedDate != null && a.CreatedDate.Value.Year == today.Year && a.CreatedDate.Value.Month == today.Month && a.CreatedDate.Value.Month == today.Month && a.CreatedDate.Value.Day == today.Day).Max(aa => aa.OutletSaleInvoiceNo);
            if (allInv == null)
            {
                // string invoiceNo="";
                //  strinvoiceNoing lastTwoDigitsOfYear = today.ToString("yy");

                newInvoiceNo += today.ToString("yy");
                newInvoiceNo += today.ToString("MM");
                newInvoiceNo += today.ToString("dd");
                newInvoiceNo += "0001";
            }
            else
            {
                var aaa = allInv;//.OutletSaleInvoiceNo;
                int topInvoiceNo = int.Parse(aaa.ToString());


                newInvoiceNo = (topInvoiceNo + 1).ToString();
            }
            return newInvoiceNo;
        }
    }
}
