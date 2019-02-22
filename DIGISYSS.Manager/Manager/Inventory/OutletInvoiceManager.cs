using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class OutletInvoiceManager : IOutletInvoiceManager
    {
        private IGenericRepository<InvOutletInvoiceMaster> _aRepository;

        private IGenericRepository<InvOutletInvoiceDetail> _aInvOutletInvoiceRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        private TopInvoiceNo _invoiceNo;

        public OutletInvoiceManager()
        {
            _aRepository = new GenericRepositoryInv<InvOutletInvoiceMaster>();
            _aInvOutletInvoiceRepository = new GenericRepositoryInv<InvOutletInvoiceDetail>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();

            _invoiceNo = new TopInvoiceNo();
        }

        //public ResponseModel GenarateInvoiceSaleUI(OutletId)
        //{

        //   // return _aModel.Respons(invoceId);
        //}
        public ResponseModel GetAllOutletInvoiceData()
        {
            var invOutletInvoiceMaster = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var invOutletInvoiceDetail = _db.InvOutletInvoiceDetails;

            var data = (from invoiceMast in invOutletInvoiceMaster
                        join outlet in invOutlet on invoiceMast.OutletId equals outlet.OutletId
                        //where invoiceMast.Status < 3
                        select new
                        {
                            invoiceMast.OutletInvoiceMasterId,
                            invoiceMast.OutletSaleInvoiceNo,
                            BuyDate = invoiceMast.CreatedDate,
                            invoiceMast.CreatedDate,
                            invoiceMast.Status,
                            invoiceMast.IsActive,
                            TotalGrandPrice = GetGrandTotal(invoiceMast.OutletInvoiceMasterId),
                            outlet.OutletId,
                            outlet.OutletName,
                            ProductQuantity = invOutletInvoiceDetail.Where(m => m.OutletInvoiceMasterId == invoiceMast.OutletInvoiceMasterId).Select(m => m.ProductQuantity).Sum(),

                        }).ToList();
            var outletinvoiceMasterAndDetail = data.ToList();
            return _aModel.Respons(outletinvoiceMasterAndDetail);
        }



        public ResponseModel GetIndividualOutletInvoiceData(int OutletInvoiceMasterId)
        {
            var invOutletInvoiceMaster = _aRepository.SelectAll();//efficint if write query written heare and select only matched to master Id
            var invOutletInvoiceDetail = _db.InvOutletInvoiceDetails;
            var TotalPrice = 0;

            var data = from invoiceMast in invOutletInvoiceMaster
                       join invoiceDetail in invOutletInvoiceDetail on invoiceMast.OutletInvoiceMasterId equals invoiceDetail.OutletInvoiceMasterId
                       join product in _db.InvProducts on invoiceDetail.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join outlet in _db.InvOutlets on invoiceMast.OutletId equals outlet.OutletId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId



                       where productPrice.IsActive == true && invoiceDetail.OutletInvoiceMasterId == OutletInvoiceMasterId
                       select new
                       {
                           outlet.OutletName,
                           outlet.OutletId,
                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,

                           invoiceMast.OutletInvoiceMasterId,
                           invoiceMast.OutletSaleInvoiceNo,
                           //invoiceMast.Status,
                           invoiceMast.IsActive,

                           invoiceDetail.OutletInvoiceDetailsId,
                           //invoiceDetail.ProductId,
                           invoiceDetail.ProductQuantity,
                           invoiceDetail.Discount,
                           invoiceDetail.IsReturned,
                           invoiceDetail.IsChanged,
                           invoiceDetail.Status,

                           productPrice.RetailPrice,
                           PriceAmount = (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           TotalPrice = TotalPrice + (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           VAT = (((invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice)) * (.15)),
                           item.ItemId,
                           item.ItemName,

                           size.SizeId,
                           size.SizeName,

                           uOm.UoMId,
                           uOm.UoMShortName,
                           OrderedQuantity = invoiceDetail.ProductQuantity,
                       };
            var outletinvoiceMasterAndDetail = data.ToList();
            return _aModel.Respons(outletinvoiceMasterAndDetail);
        }

        public ResponseModel GetAProducDataByOutletInvoiceDetailsId(int OutletInvoiceDetailsId)
        {
            var invOutletInvoiceMast = _aRepository.SelectAll();
            var invOutletInvoiceDetails = _db.InvOutletInvoiceDetails;

            var data = from pOMast in invOutletInvoiceMast
                       join pODetls in invOutletInvoiceDetails on pOMast.OutletInvoiceMasterId equals pODetls.OutletInvoiceMasterId
                       join outlet in _db.InvOutlets on pOMast.OutletId equals outlet.OutletId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && pODetls.OutletInvoiceDetailsId == OutletInvoiceDetailsId

                       select new
                       {
                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,
                           product.ProductFactoryBarcode,

                           productPrice.ProductPriceId,
                           productPrice.CostPrice,
                           productPrice.WholeSalePrice,
                           productPrice.RetailPrice,

                           item.ItemId,
                           item.ItemName,

                           size.SizeId,
                           size.SizeName,

                           uOm.UoMId,
                           uOm.UoMShortName,

                           pOMast.OutletInvoiceMasterId,
                           pOMast.Status,
                           pOMast.IsActive,

                           pODetls.OutletInvoiceDetailsId,
                           pODetls.ProductQuantity,
                           pODetls.IsEdited,

                       };
            var outletInvoiceMasterAndDetail = data.ToList();
            return _aModel.Respons(outletInvoiceMasterAndDetail);
        }

        public ResponseModel UpdateASoldProducData(InvOutletInvoiceDetail aObj)
        {

            try
            {
                DateTime aDate = DateTime.Now;

                InvOutletInvoiceDetail invOutletInvoiceDetail = _db.InvOutletInvoiceDetails.Find(aObj.OutletInvoiceDetailsId);
                invOutletInvoiceDetail.IsActive = false;
                invOutletInvoiceDetail.ModifiedDate = aDate;
                invOutletInvoiceDetail.ProductQuantity = aObj.ProductQuantity;
                invOutletInvoiceDetail.UnitPrice = aObj.UnitPrice;
                invOutletInvoiceDetail.TotalPrice = aObj.TotalPrice;
                invOutletInvoiceDetail.IsEdited = true;
                _db.InvOutletInvoiceDetails.Attach(invOutletInvoiceDetail);
                _db.Entry(invOutletInvoiceDetail).State = EntityState.Modified;
                _db.SaveChanges();
                return _aModel.Respons(true, "A Product Data Successfully Updated");
            }
            catch (Exception e)
            {
                return _aModel.Respons(false, "Sorry! Some  Error Happned");
            }
        }





        private double GetGrandTotal(int masterId)
        {
            var allProduct = _aInvProductRepository.SelectAll();
            var allPrice = _aInvProductPriceRepository.SelectAll().Where(p => p.IsActive == true);
            try
            {
                var selectedProduct = _aInvOutletInvoiceRepository.SelectAll().Where(aa => aa.OutletInvoiceMasterId == masterId && aa.Status != 2).ToList();

                var data = (from a in selectedProduct
                            join pro in allProduct on a.ProductId equals pro.ProductId
                            join price in allPrice on pro.ProductId equals price.ProductId
                            select new
                            {
                                price = Convert.ToDouble(price.RetailPrice) * a.ProductQuantity
                            }).Sum(aa => aa.price);
                return Convert.ToDouble(data);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }


        public ResponseModel GetDetailsByOutletInvoiceMasterId(int OutletInvoiceMasterId)
        {
            var invOutletInvoiceMaster = _aRepository.SelectAll();
            var invOutletInvoiceDetail = _db.InvOutletInvoiceDetails;
            var TotalPrice = 0;

            var data = from invoiceMast in invOutletInvoiceMaster
                       join invoiceDetail in invOutletInvoiceDetail on invoiceMast.OutletInvoiceMasterId equals invoiceDetail.OutletInvoiceMasterId
                       join product in _db.InvProducts on invoiceDetail.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join outlet in _db.InvOutlets on invoiceMast.OutletId equals outlet.OutletId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && invoiceMast.OutletInvoiceMasterId == OutletInvoiceMasterId
                       select new
                       {
                           outlet.OutletName,
                           outlet.OutletId,
                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,

                           invoiceMast.OutletInvoiceMasterId,
                           invoiceMast.OutletSaleInvoiceNo,
                     
                           invoiceMast.IsActive,

                           invoiceDetail.OutletInvoiceDetailsId,
                    
                           invoiceDetail.ProductQuantity,
                           invoiceDetail.Discount,
                           invoiceDetail.UnitPrice,
                           
                           invoiceDetail.IsReturned,
                           invoiceDetail.IsChanged,
                           invoiceDetail.Status,

                           productPrice.RetailPrice,
                           PriceAmount = (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           TotalPrice = TotalPrice + (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           VAT = (((invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice)) * (.15)),
                           TotalGrandPrice = GetGrandTotal(invoiceMast.OutletInvoiceMasterId),
                           item.ItemId,
                           item.ItemName,

                           size.SizeId,
                           size.SizeName,

                           uOm.UoMId,
                           uOm.UoMShortName,
                       };
            var outlletInvoicNoDetails = data.ToList();
            
            return _aModel.Respons(outlletInvoicNoDetails);
           }


        /// ///
        /// </summary>
        /// <param name=Not Implemented  Method "GetDetailsByOutletInvoiceDetailsId"></param>
        /// <returns></returns>
        public ResponseModel GetDetailsByOutletInvoiceDetailsId(int OutletInvoiceDetailsId)
        {
            return null;
        }
       

        public ResponseModel GetDetailsByOutletSaleInvoiceNo(int OutletSaleInvoiceNo)
        {
            var invOutletInvoiceMaster = _aRepository.SelectAll().Where(a => a.OutletSaleInvoiceNo == OutletSaleInvoiceNo).ToList();
            var invOutletInvoiceDetail = _db.InvOutletInvoiceDetails;
            var TotalPrice = 0;

            var data = from invoiceMast in invOutletInvoiceMaster
                       join invoiceDetail in invOutletInvoiceDetail on invoiceMast.OutletInvoiceMasterId equals invoiceDetail.OutletInvoiceMasterId
                       join product in _db.InvProducts on invoiceDetail.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       //join warehouse in _db.InvWarehouses on invoiceMast.WarehouseId equals warehouse.WarehouseId
                       join outlet in _db.InvOutlets on invoiceMast.OutletId equals outlet.OutletId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && invoiceMast.OutletSaleInvoiceNo == OutletSaleInvoiceNo
                       select new
                       {
                         
                           invoiceMast.OutletInvoiceMasterId,
                           invoiceMast.OutletSaleInvoiceNo,
                           invoiceMast.IsActive,

                           invoiceDetail.OutletInvoiceDetailsId,
                           invoiceDetail.CreatedDate,
                           invoiceDetail.ProductQuantity,
                           invoiceDetail.Discount,
                           invoiceDetail.UnitPrice,
                           invoiceDetail.IsReturned,
                           invoiceDetail.IsChanged,
                           invoiceDetail.Status,

                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,

                           productPrice.RetailPrice,
                           PriceAmount = (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           TotalPrice = TotalPrice + (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           VAT = (((invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice)) * (.15)),
                           TotalGrandPrice = GetGrandTotal(invoiceMast.OutletInvoiceMasterId),

                           outlet.OutletId,
                           outlet.OutletName,

                           item.ItemId,
                           item.ItemName,

                           size.SizeId,
                           size.SizeName,

                           uOm.UoMId,
                           uOm.UoMShortName,
                       };
            var outlletInvoicNoDetails = data.ToList();
            var aaa = invOutletInvoiceMaster.ToList();

            return _aModel.Respons(invOutletInvoiceMaster, data);
        }
        public ResponseModel UpdteInvoiceDataByOutletSaleInvoiceNo(InvOutletInvoiceMaster aObj)
        {
            try
            {
                DateTime aDate = DateTime.Now;
                InvOutletInvoiceMaster aOutletSaleInvoiceMaster = _db.InvOutletInvoiceMasters.Where(aa => aa.OutletSaleInvoiceNo == aObj.OutletSaleInvoiceNo).FirstOrDefault();
                    
               

                aOutletSaleInvoiceMaster.ModifiedDate = aDate;
                aOutletSaleInvoiceMaster.Cash = aObj.Cash;
                aOutletSaleInvoiceMaster.Credit = aObj.Credit;
                aOutletSaleInvoiceMaster.Rounding = aObj.Rounding;
                aOutletSaleInvoiceMaster.PaidAmount = aObj.PaidAmount;
                aOutletSaleInvoiceMaster.DueOrRefund = aObj.DueOrRefund;
               
                _db.InvOutletInvoiceMasters.Attach(aOutletSaleInvoiceMaster);
                _db.Entry(aOutletSaleInvoiceMaster).State = EntityState.Modified;
                _db.SaveChanges();
                return _aModel.Respons(true, " Successfully Updated data by Invoive No.");
            }
            catch (Exception e)
            {
                return _aModel.Respons(false, "Sorry! Some  Error Happned");
            }
        }

        public ResponseModel UpdteInvoiceForDuePaymentReturn(OutletSaleUIDetailsViewModel OutletSaleUIData, List<OutletSaleUIVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;

                    var newInvoiceNo = _invoiceNo.GetNewInvoiceNo();

                    var toBeUpdatedInvoice=     _aRepository.SelectedById(OutletSaleUIData.OutletInvoiceMasterId);
                    toBeUpdatedInvoice.IsActive = false;
                    toBeUpdatedInvoice.NewInvoice = newInvoiceNo;//OutletSaleUIData.OutletSaleInvoiceNo.ToString();
                   // toBeUpdatedInvoice.

                    _db.InvOutletInvoiceMasters.Attach(toBeUpdatedInvoice);
                    _db.Entry(toBeUpdatedInvoice).State = EntityState.Modified;
                    _db.SaveChanges();
                    InvOutletInvoiceMaster aOutletSaleInvoiceMaster = new InvOutletInvoiceMaster()
                    {

                        OutletInvoiceMasterId =0,
                        OutletSaleInvoiceNo = Convert.ToInt32(newInvoiceNo),
                        //OutletId = OutletSaleUIData.OutletId,
                        OutletId = 1,
                        SalePersonId = OutletSaleUIData.SalePersonId,
                        CustomerId = OutletSaleUIData.CustomerId,

                        TotalItem = OutletSaleUIData.TotalItem,
                        TotalGrandPrice = OutletSaleUIData.TotalGrandPrice,
                        VAT = OutletSaleUIData.VAT,
                        PaymentMode = OutletSaleUIData.PaymentMode,
                        Cash = OutletSaleUIData.Cash,
                        Credit = OutletSaleUIData.Credit,
                        Discount = OutletSaleUIData.Discount,
                        Rounding = OutletSaleUIData.Rounding,
                        PayableAmount = OutletSaleUIData.PayableAmount,
                        PaidAmount = OutletSaleUIData.PaidAmount,
                        DueOrRefund = OutletSaleUIData.DueOrRefund,

                        IsFullPaid = OutletSaleUIData.IsFullPaid,
                        IsEdited = true,
                        //IsReturned = OutletSaleUIData.IsReturned,
                        //IsChanged = OutletSaleUIData.IsChanged,
                        Status = 2,
                        CreatedDate = aDate,
                        PreviousInvoice = OutletSaleUIData.OutletSaleInvoiceNo.ToString()

                    };

                    //aOutletSaleInvoiceMaster.OutletSaleInvoiceNo = aDate.Year +''+ aDate.Month +''+ aDate.Day +''+ aOutletSaleInvoiceMaster.OutletId;
                    // var invoiceId = aDate.Year().toString().substr(2) + "" + (aDate.Month() + 1) + "" + (aDate.Day() + "" + 1);

                    if (OutletSaleUIData.OutletInvoiceMasterId != 0)
                    {
                        _db.InvOutletInvoiceMasters.Add(aOutletSaleInvoiceMaster);
                        _db.SaveChanges();


                        foreach (var aData in productList)
                        {
                            //break;
                            InvOutletInvoiceDetail aOutletSaleInvoiceDetails = new InvOutletInvoiceDetail()
                            {
                                OutletInvoiceMasterId = aOutletSaleInvoiceMaster.OutletInvoiceMasterId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                Discount = aData.Discount,
                                //DiscountPercent = aData.DiscountPercent,
                                UnitPrice = aData.UnitPrice,
                                TotalPrice = aData.TotalPrice,
                                IsEdited = true,
                                //IsReturned = aData.IsReturned,
                                //IsChanged = aData.IsChanged,
                                IsDeleted = aData.IsDeleted,
                                CreatedDate = aDate,
                            };
                            _db.InvOutletInvoiceDetails.Add(aOutletSaleInvoiceDetails);
                            _db.SaveChanges();

                            InvOutletStock aStock = new InvOutletStock()
                            {
                                ProductId = aData.ProductId,
                                //OutletId = aData.OutletId,
                                OutletId = aOutletSaleInvoiceMaster.OutletId,
                                InOut = 2,
                                Note = "Sale",
                                OutletStockQuantity = aData.ProductQuantity,
                                CreatedDate = DateTime.Now
                            };

                            _db.InvOutletStocks.Add(aStock);
                            _db.SaveChanges();

                        }
                        _db.SaveChanges();
                        transaction.Commit();
                        return _aModel.Respons(true, "New OutletSaleUI Successfully Saved");
                    }

                    //else if (OutletSaleUIData.OutletInvoiceMasterId > 0)
                    //{
                    //    _db.InvOutletInvoiceMasters.Attach(aOutletSaleInvoiceMaster);
                    //    _db.Entry(aOutletSaleInvoiceMaster).State = EntityState.Modified;
                    //    _db.SaveChanges();

                    //    var invOutletInvoice = _db.InvOutletInvoiceDetails.Find(OutletSaleUIData.OutletInvoiceDetailsId);

                    //    invOutletInvoice.IsActive = false;
                    //    invOutletInvoice.ModifiedDate = aDate;

                    //    _db.InvOutletInvoiceDetails.Attach(invOutletInvoice);
                    //    _db.Entry(invOutletInvoice).State = EntityState.Modified;
                    //    _db.SaveChanges();

                    //    foreach (var aData in productList)
                    //    {
                    //        InvOutletInvoiceDetail aOutletSaleInvoiceDetails = new InvOutletInvoiceDetail()
                    //        {
                    //            OutletInvoiceMasterId = aOutletSaleInvoiceMaster.OutletInvoiceMasterId,
                    //            ProductId = aData.ProductId,
                    //            ProductQuantity = aData.ProductQuantity,
                    //            CreatedDate = aDate,
                    //        };
                    //        _db.InvOutletInvoiceDetails.Add(aOutletSaleInvoiceDetails);
                    //        _db.Entry(aOutletSaleInvoiceDetails).State = EntityState.Modified;
                    //        _db.SaveChanges();
                    //    }
                    //    transaction.Commit();
                    //    return _aModel.Respons(true, "Successfully Updated  Sale Data");
                    //}
                //    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry Failed to Update  Sale Data");
                }
                catch (Exception)
                {
                    _db.SaveChanges();
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }
        }
    }
}

