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
    public class OutletSaleUIManager : IOutletSaleUIManager
    {
        private IGenericRepository<InvOutletInvoiceMaster> _aRepository;

        private IGenericRepository<InvOutletInvoiceDetail> _aInvOutletInvoiceRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        private TopInvoiceNo _invoiceNo;

        public OutletSaleUIManager()
        {
            _aRepository = new GenericRepositoryInv<InvOutletInvoiceMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvOutletInvoiceRepository = new GenericRepositoryInv<InvOutletInvoiceDetail>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
            _invoiceNo = new TopInvoiceNo();
        }

        public ResponseModel GetOutletSaleInvoiceNo()
        {


            try
            {
                //    DateTime aDate = DateTime.Now;
                //    InvOutletInvoiceMaster aOutletInvoiceMaster =new InvOutletInvoiceMaster();
                //    var allOutletSaleInvoiceNo = _aRepository.SelectAll().LastOrDefault();
                //    var invoiceId = DateTime.Now.Year.ToString().substr(-2) + "" + (aDate.Month() + 1) + "" + (aDate.Day() + "" + 1);

            }
            catch (Exception ex)
            {
                //return 0;
            }
            return null;
        }


        public ResponseModel CreateOutletSaleUIDetails(OutletSaleUIDetailsViewModel OutletSaleUIData, List<OutletSaleUIVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;


                    InvOutletInvoiceMaster aOutletSaleInvoiceMaster = new InvOutletInvoiceMaster()
                    {

                        OutletInvoiceMasterId = OutletSaleUIData.OutletInvoiceMasterId,
                        OutletSaleInvoiceNo = Convert.ToInt32(_invoiceNo.GetNewInvoiceNo()),
                        //OutletId = OutletSaleUIData.OutletId,
                        OutletId = 1,
                        CustomerId = 1, //// Now default value is 1 but after add Identity it will be >> CustomerId = OutletSaleUIData.CustomerId,
                        SalePersonId = 1,/////Now default value is 1 but after add Identity it will be >>SalePersonId = OutletSaleUIData.SalePersonId,


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

                        //IsFullPaid = OutletSaleUIData.IsFullPaid,
                        IsActive = true,
                        IsChanged = false,
                        IsDeleted = false,
                        IsEdited = false,


                        IsReturned = -1,////////
                        Status = 2,
                        Note = "Sold",
                        CreatedDate = DateTime.Now,

                    };
                    aOutletSaleInvoiceMaster.IsFullPaid = OutletSaleUIData.DueOrRefund <= 0;   //////////OR, if (OutletSaleUIData.DueOrRefund <= 0) { aOutletSaleInvoiceMaster.IsFullPaid = true; } else { aOutletSaleInvoiceMaster.IsFullPaid = false; }
                    //aOutletSaleInvoiceMaster.OutletSaleInvoiceNo = aDate.Year +''+ aDate.Month +''+ aDate.Day +''+ aOutletSaleInvoiceMaster.OutletId;
                    // var invoiceId = aDate.Year().toString().substr(2) + "" + (aDate.Month() + 1) + "" + (aDate.Day() + "" + 1);

                    if (OutletSaleUIData.OutletInvoiceMasterId == 0)
                    {

                        if ((OutletSaleUIData.Cash > 0) && (OutletSaleUIData.Credit <= 0) && (OutletSaleUIData.PaidAmount > 0))
                        {
                            aOutletSaleInvoiceMaster.PaymentMode = "Cash";
                        }
                        else if ((OutletSaleUIData.Credit > 0) && (OutletSaleUIData.Cash <= 0) && (OutletSaleUIData.PaidAmount > 0))
                        {
                            aOutletSaleInvoiceMaster.PaymentMode = "Credit";
                        }
                        else if ((OutletSaleUIData.Cash > 0) && (OutletSaleUIData.Credit > 0) && (OutletSaleUIData.PaidAmount > 0))
                        {
                            aOutletSaleInvoiceMaster.PaymentMode = "Cash & Credit";
                        }
                        else
                        {
                            aOutletSaleInvoiceMaster.PaymentMode = "None";
                        }
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
                                IsActive = true,
                                IsChanged = false,
                                IsDeleted = false,
                                IsEdited = false,
                                IsReturned = -1,
                                Note = "Sold",
                                CreatedDate = DateTime.Now
                            };
                            _db.InvOutletInvoiceDetails.Add(aOutletSaleInvoiceDetails);
                            _db.SaveChanges();

                            InvOutletStock aStock = new InvOutletStock()
                            {
                                ProductId = aData.ProductId,
                                //OutletId = aData.OutletId,
                                OutletId = aOutletSaleInvoiceMaster.OutletId,
                                IsActive = true,
                                IsChanged = false,
                                IsDeleted = false,
                                IsEdited = false,
                                IsReturned = -1,
                                InOut = 2,
                                Note = "Sold",
                                OutletStockQuantity = aData.ProductQuantity,
                                CreatedDate = DateTime.Now
                            };
                            _db.InvOutletStocks.Add(aStock);
                            _db.SaveChanges();

                        }
                        _db.SaveChanges();
                        transaction.Commit();
                        var invoiceData = _db.spSaleInvoice(aOutletSaleInvoiceMaster.OutletSaleInvoiceNo).ToList();
                        //return _aModel.Respons(true, "Sale Info Successfully Saved");
                        return _aModel.Respons(invoiceData);
                    }

                    else if (OutletSaleUIData.OutletInvoiceMasterId > 0)
                    {
                        _db.InvOutletInvoiceMasters.Attach(aOutletSaleInvoiceMaster);
                        _db.Entry(aOutletSaleInvoiceMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        var invOutletInvoice = _db.InvOutletInvoiceDetails.Find(OutletSaleUIData.OutletInvoiceDetailsId);

                        invOutletInvoice.IsActive = false;
                        invOutletInvoice.ModifiedDate = DateTime.Now;

                        _db.InvOutletInvoiceDetails.Attach(invOutletInvoice);
                        _db.Entry(invOutletInvoice).State = EntityState.Modified;
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            InvOutletInvoiceDetail aOutletSaleInvoiceDetails = new InvOutletInvoiceDetail()
                            {
                                OutletInvoiceMasterId = aOutletSaleInvoiceMaster.OutletInvoiceMasterId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                CreatedDate = DateTime.Now,
                            };
                            _db.InvOutletInvoiceDetails.Add(aOutletSaleInvoiceDetails);
                            _db.Entry(aOutletSaleInvoiceDetails).State = EntityState.Modified;
                            _db.SaveChanges();
                        }
                        transaction.Commit();
                        return _aModel.Respons(true, "Successfully Updated  Sale Data");
                    }
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry Failed to Update  Sale Data");
                }
                catch (Exception ex)
                {
                    //_db.SaveChanges();
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }

        }

        //private double GetGranaDteotal(int masterId)
        //{
        //    var allProduct = _aInvProductRepository.SelectAll();
        //    var allPrice = _aInvProductPriceRepository.SelectAll().Where(p => p.IsActive == true);
        //    try
        //    {
        //        var selectedProduct = _aInvOutletInvoiceRepository.SelectAll().Where(aa => aa.OutletInvoiceMasterId == masterId && aa.Status != 2).ToList();

        //        var data = (from a in selectedProduct
        //                    join pro in allProduct on a.ProductId equals pro.ProductId
        //                    join price in allPrice on pro.ProductId equals price.ProductId
        //                    select new
        //                    {
        //                        price = Convert.ToDouble(price.RetailPrice) * a.ProductQuantity
        //                    }).Sum(aa => aa.price);
        //        return Convert.ToDouble(data);
        //    }
        //    catch (Exception ex)
        //    {
        //        return 0;
        //    }
        //}

        private double GetGrandaTeotal(int masterId)
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
                            BuyDate = invoiceMast.CreatedDate,
                            invoiceMast.CreatedDate,
                            invoiceMast.Status,
                            invoiceMast.IsActive,
                            TotalGrandPrice = GetGrandaTeotal(invoiceMast.OutletInvoiceMasterId),
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
                           product.ProductFactoryBarcode,

                           invoiceMast.OutletInvoiceMasterId,
                           invoiceMast.Status,
                           invoiceMast.IsActive,

                           invoiceDetail.OutletInvoiceDetailsId,
                           //invoiceDetail.ProductId,
                           invoiceDetail.ProductQuantity,
                           invoiceDetail.Discount,
                           invoiceDetail.IsReturned,
                           invoiceDetail.IsChanged,

                           productPrice.RetailPrice,
                           PriceAmount = (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           TotalPrice = TotalPrice + (invoiceDetail.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),

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


        public ResponseModel GetASingleProducDataOfSaleInvoice(int OutletInvoiceDetailsId)
        {

            var invOutletInvoiceMaster = _aRepository.SelectAll();
            var invOutletInvoiceDetail = _db.InvOutletInvoiceDetails;


            var data = from invoiceMast in invOutletInvoiceMaster
                       join invoiceDetail in invOutletInvoiceDetail on invoiceMast.OutletInvoiceMasterId equals invoiceDetail.OutletInvoiceMasterId
                       join outlet in _db.InvOutlets on invoiceMast.OutletId equals outlet.OutletId
                       join product in _db.InvProducts on invoiceDetail.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && invoiceDetail.OutletInvoiceDetailsId == OutletInvoiceDetailsId

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

                           invoiceMast.OutletInvoiceMasterId,
                           invoiceMast.Status,
                           invoiceMast.IsActive,

                           invoiceDetail.OutletInvoiceDetailsId,
                           invoiceDetail.ProductQuantity,
                           invoiceDetail.IsEdited,

                       };
            var outletInvoiceMasterAndDetail = data.ToList();
            return _aModel.Respons(outletInvoiceMasterAndDetail);
        }


        public ResponseModel GetOutletSaleData()
        {

            return null;
        }

    }
}


