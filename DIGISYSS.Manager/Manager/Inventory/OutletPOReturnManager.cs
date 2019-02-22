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
    public class OutletPOReturnManager : IOutletPOReturnManager
    {
        private IGenericRepository<InvOutletPOReturnMaster> _aRepository;
        private IGenericRepository<InvOutletPOReturnDetail> _aInvOutletPOReturnDetailsRepository;
        private IGenericRepository<InvOutlet> _aInvOutletRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;
        private IGenericRepository<InvOutletStock> _aInvOutletStockRepository;
        private IGenericRepository<InvWarehouseStock> _aInvWarehouseStockRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;


        private IOutletStockManager _aOutletStockManager;

        public OutletPOReturnManager()
        {
            _aRepository = new GenericRepositoryInv<InvOutletPOReturnMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvOutletPOReturnDetailsRepository = new GenericRepositoryInv<InvOutletPOReturnDetail>();
            _aInvOutletRepository = new GenericRepositoryInv<InvOutlet>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
            _aInvOutletStockRepository = new GenericRepositoryInv<InvOutletStock>();


            _aOutletStockManager = new OutletStockManager();
        }
        public ResponseModel OutletPoReturnDetails(OutletPOReturnDetailsViewModel OutletPOReturnData, List<ProductOutletPOReturnVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;

                    InvOutletPOReturnMaster aOutletPOReturnMaster = new InvOutletPOReturnMaster()
                    {
                        OutletPOReturnMasterId = OutletPOReturnData.OutletPOReturnMasterId,
                        Original_OutletPOMasterId = OutletPOReturnData.OutletPOMasterId,
                        WarehouseId = OutletPOReturnData.WarehouseId, ///////When Identity will complete then we takeidies from WarehouseId and Outletet Id w
                        OutletId = OutletPOReturnData.OutletId,

                        //WarehouseId=1,
                        //OutletId =1,
                        Status = 0,
                        IsActive = true,
                        IsChanged = false,
                        IsDeleted = false,
                        IsEdited = false,
                        IsReceived = false,
                        IsReturned = 1,
                        CreatedDate = aDate,
                    };

                    if (OutletPOReturnData.OutletPOReturnMasterId == 0)
                    {
                        _db.InvOutletPOReturnMasters.Add(aOutletPOReturnMaster);
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            InvOutletPOReturnDetail aOutletPOReturnDetail = new InvOutletPOReturnDetail()
                            {
                                OutletPOReturnMasterId = aOutletPOReturnMaster.OutletPOReturnMasterId,
                                OutletPOReturnDetailsId = aData.OutletPOReturnDetailsId,
                                Original_OutletPODetailsId = aData.OutletPODetailsId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                IsActive = true,
                                IsChanged = false,
                                IsDeleted = false,
                                IsEdited = false,
                                IsReceived = false,
                                IsReturned = 1,
                                CreatedDate = aDate,
                            };
                            _db.InvOutletPOReturnDetails.Add(aOutletPOReturnDetail);
                            _db.SaveChanges();
                        }
                        _db.SaveChanges();
                        transaction.Commit();
                        return _aModel.Respons(true, "Outlet PO return request Successful.");
                    }

                    else if (OutletPOReturnData.OutletPOReturnMasterId > 0)
                    {
                        _db.InvOutletPOReturnMasters.Attach(aOutletPOReturnMaster);
                        _db.Entry(aOutletPOReturnMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        var invOutletPOReturnDetails = _db.InvOutletPOReturnDetails.Find(OutletPOReturnData.OutletPOReturnDetailsId);

                        invOutletPOReturnDetails.IsActive = false;
                        invOutletPOReturnDetails.ModifiedDate = aDate;

                        _db.InvOutletPOReturnDetails.Add(invOutletPOReturnDetails);
                        _db.Entry(invOutletPOReturnDetails).State = EntityState.Modified;
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            InvOutletPOReturnDetail aOutletPOReturnDetail = new InvOutletPOReturnDetail()
                            {
                                OutletPOReturnMasterId = aOutletPOReturnMaster.OutletPOReturnMasterId,
                                OutletPOReturnDetailsId = aData.OutletPOReturnDetailsId,
                                Original_OutletPODetailsId = aData.OutletPODetailsId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                IsActive = true,
                                CreatedDate = aDate
                            };
                            _db.InvOutletPOReturnDetails.Add(aOutletPOReturnDetail);
                            _db.Entry(aOutletPOReturnDetail).State = EntityState.Modified;
                            _db.SaveChanges();
                        }
                        transaction.Commit();
                        return _aModel.Respons(true, "Successfully  Outlet PO returned ");
                    }
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry Outlet PO returned failed");
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }
        }

        public ResponseModel GetAllOutletPoReturnRequest()
        {
            var invOutletPoReturnMaster = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var invOutletPOReturnDetails = _db.InvOutletPOReturnDetails;

            var data = (from pOMast in invOutletPoReturnMaster
                        join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                        join outlet in invOutlet on pOMast.OutletId equals outlet.OutletId
                        where pOMast.IsActive == true && pOMast.IsReturned == 1
                        select new
                        {
                            pOMast.OutletPOReturnMasterId,
                            ApplyDate = pOMast.CreatedDate,
                            pOMast.CreatedDate,
                            pOMast.Status,
                            pOMast.IsActive,
                            pOMast.IsEdited,
                            pOMast.IsReturned,
                            TotalGrandPrice = GetGrandTotal(pOMast.OutletPOReturnMasterId),

                            ProductQuantity = invOutletPOReturnDetails.Where(m => m.OutletPOReturnMasterId == pOMast.OutletPOReturnMasterId).Select(m => m.ProductQuantity).Sum(),
                            outlet.OutletId,
                            outlet.OutletName,
                            warehouse.WarehouseId,
                            warehouse.WarehouseName,

                        }).ToList();
            var outletPoReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoReturnMasterAndDetail);
        }
        public ResponseModel GetIndividualOutletPoReturnView(int OutletPOReturnMasterId)
        {
            var invOutletPoReturnMaster = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var invOutletPOReturnDetails = _db.InvOutletPOReturnDetails;
            var TotalPrice = 0;

            var data = from pOMast in invOutletPoReturnMaster
                       join pODetls in invOutletPOReturnDetails on pOMast.OutletPOReturnMasterId equals pODetls.OutletPOReturnMasterId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join outlet in _db.InvOutlets on pOMast.OutletId equals outlet.OutletId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where pOMast.IsActive==true && productPrice.IsActive == true && pODetls.OutletPOReturnMasterId == OutletPOReturnMasterId 
                       select new
                       {
                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,
                           product.ProductFactoryBarcode,

                           pOMast.OutletPOReturnMasterId,
                           pOMast.Status,
                           pOMast.IsActive,
                           pOMast.IsChanged,
                           pOMast.IsDeleted,
                           pOMast.IsEdited,

                           pODetls.OutletPOReturnDetailsId,
                           pODetls.ProductQuantity,
                           pODetls.IsReturned,

                           productPrice.RetailPrice,
                           PriceAmount = (pODetls.ProductQuantity) * (Convert.ToDouble(productPrice.RetailPrice)),
                           TotalPrice = TotalPrice + ((pODetls.ProductQuantity) * (Convert.ToDouble(productPrice.RetailPrice))),

                           warehouse.WarehouseId,
                           warehouse.WarehouseName,
                           outlet.OutletId,
                           outlet.OutletName,

                           item.ItemId,
                           item.ItemName,

                           size.SizeId,
                           size.SizeName,

                           uOm.UoMId,
                           uOm.UoMShortName,
                           OrderedQuantity = pODetls.ProductQuantity,
                       };
            var outletPoMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoMasterAndDetail);
        }

        public ResponseModel OutletPoReturnByMarterId(OutletPOReturnDetailsViewModel OutletPOReturnData, List<ProductOutletPOReturnVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (OutletPOReturnData.OutletPOReturnMasterId > 0)
                    {
                        DateTime aDate = DateTime.Now;

                        var invOutletPOReturnMaster = _db.InvOutletPOReturnMasters.Find(OutletPOReturnData.OutletPOReturnMasterId);


                        InvOutletPOReturnMaster aOutletPOReturnMaster = new InvOutletPOReturnMaster()
                        {
                            OutletPOReturnMasterId = OutletPOReturnData.OutletPOReturnMasterId,
                            WarehouseId = 1,
                            OutletId = 1,
                            Status = 0,
                            IsActive = true,
                            CreatedDate = aDate,
                            ModifiedDate = DateTime.Now,
                            Note = "Return",
                            IsReturned = 2,
                        };


                        _db.InvOutletPOReturnMasters.Attach(aOutletPOReturnMaster);
                        _db.Entry(aOutletPOReturnMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            var invPoInvoiceDetails = _db.InvOutletPOReturnDetails.Find(OutletPOReturnData.OutletPOReturnMasterId);
                            invPoInvoiceDetails.IsActive = false;
                            invPoInvoiceDetails.ModifiedDate = aDate;
                            _db.InvOutletPOReturnDetails.Attach(invPoInvoiceDetails);
                            _db.Entry(invPoInvoiceDetails).State = EntityState.Modified;
                            _db.SaveChanges();

                            InvOutletPOReturnDetail aOutletPOReturnDetail = new InvOutletPOReturnDetail()
                            {
                                OutletPOReturnMasterId = aOutletPOReturnMaster.OutletPOReturnMasterId,
                                OutletPOReturnDetailsId = aData.OutletPOReturnDetailsId,
                                Original_OutletPODetailsId = aData.OutletPODetailsId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                IsActive = true,
                                IsReturned = 2,
                                CreatedDate = DateTime.Now
                            };
                            _db.InvOutletPOReturnDetails.Add(aOutletPOReturnDetail);
                            _db.Entry(aOutletPOReturnDetail).State = EntityState.Modified;
                            _db.SaveChanges();


                            InvOutletStock aOutletStock = new InvOutletStock()
                            {
                                ProductId = aData.ProductId,
                                OutletId = OutletPOReturnData.OutletId,
                                OutletStockQuantity = aData.ProductQuantity,
                                InOut = 2,
                                Note = "Returned",
                                IsActive = true,
                                IsReturned = 2,
                                CreatedDate = DateTime.Now
                            };
                            _db.InvOutletStocks.Add(aOutletStock);
                            _db.SaveChanges();

                            InvWarehouseStock aWarehouseStock = new InvWarehouseStock()
                            {
                                ProductId = aData.ProductId,
                                OutletId = OutletPOReturnData.OutletId,
                                InOut = 1,
                                Note = "ReturnReceived",
                                WarehouseStockQuantity = aData.ProductQuantity,
                                IsActive = true,
                                IsReceived = true,
                                CreatedDate = DateTime.Now
                            };
                            _db.InvWarehouseStocks.Add(aWarehouseStock);
                            _db.SaveChanges();
                        }
                        transaction.Commit();
                        return _aModel.Respons(true, "Successfully received  Outlet PO return");
                    }
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry Outlet PO returned Failed");
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }

        }

        public double GetStockQuantityOfAProduct(int productId)
        {
            var quantityIn = (from stock in _db.InvOutletStocks
                              where stock.ProductId == productId && stock.InOut == 1
                              select stock.OutletStockQuantity).Sum();
            var quantityOut = (from stock in _db.InvOutletStocks
                               where stock.ProductId == productId && stock.InOut == 2
                               select stock.OutletStockQuantity).Sum();

            if (quantityIn == null) { quantityIn = 0; }
            if (quantityOut == null) { quantityOut = 0; }

            //var data = (from stock in _db.InvOutletStocks
            //            where stock.ProductId == productId /*&& stock.InOut == 1*/
            //            select new
            //            {
            //                OutletStockQuantity = quantityIn - quantityOut,
            //            }).ToList();

            double OutletStockQuantity = (double)(quantityIn - quantityOut);


            //return _aModel.Respons(data);
            return OutletStockQuantity;
        }



        private double GetGrandTotal(int masterId)
        {
            var allProduct = _aInvProductRepository.SelectAll();
            var allPrice = _aInvProductPriceRepository.SelectAll().Where(p => p.IsActive == true);
            try
            {
                var selectedProduct = _aInvOutletPOReturnDetailsRepository.SelectAll().Where(aa => aa.OutletPOReturnMasterId == masterId && aa.Status != 2).ToList();

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

        public ResponseModel ChangeStatusValueInMasterTable(InvOutletPOReturnMaster aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.Status != null)
                    {
                        DateTime aDate = DateTime.Now;
                        InvOutletPOReturnMaster aOutletPOReturnMaster = _db.InvOutletPOReturnMasters.Find(aObj.OutletPOReturnMasterId);
                        aOutletPOReturnMaster.ModifiedDate = aDate;
                        aOutletPOReturnMaster.IsReturned = 2;
                        aOutletPOReturnMaster.IsActive = false;

                        _db.InvOutletPOReturnMasters.Attach(aOutletPOReturnMaster);
                        _db.Entry(aOutletPOReturnMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.IsReturned == 2)
                        {
                            var data = (from m in _db.InvOutletPOReturnMasters
                                        join d in _db.InvOutletPOReturnDetails on m.OutletPOReturnMasterId equals d.OutletPOReturnMasterId
                                        where m.OutletPOReturnMasterId == aObj.OutletPOReturnMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            m.OutletId,
                                            d.OutletPOReturnMasterId,
                                            d.OutletPOReturnDetailsId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                        }).ToList();
                            foreach (var p in data)
                            {
                                //InvOutletPOReturnDetail aOutletPOReturnDetail = new InvOutletPOReturnDetail()
                                InvOutletPOReturnDetail aOutletPOReturnDetail = _db.InvOutletPOReturnDetails.Find(aObj.OutletPOReturnMasterId);

                                aOutletPOReturnDetail.ModifiedDate = aDate;
                                aOutletPOReturnDetail.IsReturned = 2;
                                aOutletPOReturnDetail.IsActive = false;
                                _db.InvOutletPOReturnDetails.Attach(aOutletPOReturnDetail);
                                _db.Entry(aOutletPOReturnDetail).State = EntityState.Modified;
                                _db.SaveChanges();


                                InvOutletStock aOutletStock = new InvOutletStock()
                                {
                                    WarehouseId = p.WarehouseId,
                                    ProductId = p.ProductId,
                                    OutletId = p.OutletId,
                                    InOut = 2,
                                    Note = "Returned",
                                    OutletStockQuantity = p.ProductQuantity,
                                    IsActive = true,
                                    IsReturned = 2,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvOutletStocks.Add(aOutletStock);
                                _db.SaveChanges();

                                InvWarehouseStock aWarehouseStock = new InvWarehouseStock()
                                {
                                    WarehouseId = p.WarehouseId,
                                    OutletId = p.OutletId,
                                    ProductId = p.ProductId,
                                    InOut = 1,
                                    Note = "ReturnReceived",
                                    WarehouseStockQuantity = p.ProductQuantity,
                                    IsActive = true,
                                    IsReturned = 0,
                                    IsReceived = true,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvWarehouseStocks.Add(aWarehouseStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Return successfully received.");
                        }
                    }
                    transaction.Commit();
                    return _aModel.Respons(false, "Failed to return receive.");
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some  Error Happned.");
                }
            }
        }

        //public ResponseModel ReturnOutletPoByMasterId(InvOutletPOMaster aObj)
        //{
        //    using (var transaction = _db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            if ((aObj.OutletPOReturnMasterId != null) && (aObj.OutletPOReturnMasterId > 0))
        //            {
        //                 DateTime aDate = DateTime.Now;
        //                 InvOutletPOReturnMaster aOutletPOReturnMaster = _db.InvOutletPOReturnMasters.Find(aObj.OutletPOReturnMasterId);
        //                 aOutletPOReturnMaster.ModifiedDate = aDate;
        //                 aOutletPOReturnMaster.IsReturned = 2;
        //                _db.InvOutletPOReturnMasters.Attach(aOutletPOReturnMaster);
        //                _db.Entry(aOutletPOReturnMaster).State = EntityState.Modified;
        //                _db.SaveChanges();

        //                if ((invOutletPoReturnMaster.IsReturned == 2))
        //                {
        //                    var data = (from m in _db.InvOutletPOReturnMasters
        //                                join d in _db.InvOutletPOReturnMasters on m.OutletPOReturnMasterId equals d.OutletPOReturnMasterId
        //                                where m.OutletPOMasterId == aObj.OutletPOMasterId
        //                                select
        //                                new
        //                                {
        //                                    m.WarehouseId,
        //                                    d.OutletPODetailsId,
        //                                    d.ProductId,
        //                                    d.ProductQuantity,
        //                                    d.IsReturned,
        //                                    m.OutletId,
        //                                    m.IsActive
        //                                }).ToList();

        //                    ////var productId = data.productQuantity;
        //                    //var currentStockByProductId = _aOutletStockManager.GetStockQuantityOfAProduct(inv productId);
        //                    //if (currentStockByProductId <= data.productQuantity) { }

        //                    foreach (var p in data)
        //                    {
        //                        var invOutletDetails = _ainvOutletPOReturnDetailsRepository.SelectAll().Where(aa => aa.OutletPOMasterId == aObj.OutletPOMasterId && aa.IsReturned == 1).ToList();
        //                        InvOutletPODetail invOutletPoReturnDetails = _db.invOutletPOReturnDetails.Find(p.OutletPODetailsId);


        //                        invOutletPoReturnDetails.IsActive = false;
        //                        _db.invOutletPOReturnDetails.Attach(invOutletPoReturnDetails);
        //                        _db.Entry(invOutletPoReturnDetails).State = EntityState.Modified;
        //                        _db.SaveChanges();

        //                        InvOutletPODetail aOutletPoDetails = new InvOutletPODetail()
        //                        {
        //                            OutletPOMasterId = invOutletPoReturnMaster.OutletPOMasterId,
        //                            ProductId = p.ProductId,
        //                            ProductQuantity = p.ProductQuantity,
        //                            IsActive = true,
        //                            IsReturned = 2,
        //                            CreatedDate = DateTime.Now,
        //                        };
        //                        _db.invOutletPOReturnDetails.Add(aOutletPoDetails);
        //                        _db.SaveChanges();

        //                        InvOutletStock aOutletStock = new InvOutletStock()
        //                        {
        //                            WarehouseId = p.WarehouseId,
        //                            OutletId = p.OutletId,
        //                            ProductId = p.ProductId,
        //                            OutletStockQuantity = p.ProductQuantity,
        //                            InOut = 2,
        //                            Note = "Returned",
        //                            IsActive = true,
        //                            IsReturned = 2,
        //                            CreatedDate = DateTime.Now
        //                        };
        //                        _db.InvOutletStocks.Add(aOutletStock);
        //                        _db.SaveChanges();

        //                        InvWarehouseStock aWarehouseStock = new InvWarehouseStock()
        //                        {
        //                               WarehouseId = p.WarehouseId,
        //                               OutletId = p.OutletId,
        //                               ProductId = p.ProductId,
        //                               InOut = 1,
        //                               Note = "ReturnReceived",
        //                               WarehouseStockQuantity = p.ProductQuantity,
        //                               IsActive = true,
        //                               IsReturned = 0,
        //                               IsReceived = true,
        //                               CreatedDate = DateTime.Now             
        //                         };
        //                         _db.InvWarehouseStocks.Add(aWarehouseStock);
        //                         _db.SaveChanges();
        //                    }
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Successfully received Outlet PO returned product");
        //                }
        //            }
        //            transaction.Commit();
        //            return _aModel.Respons(false, "Failed to Retun");
        //        }
        //        catch (Exception e)
        //        {
        //            transaction.Rollback();
        //            return _aModel.Respons(false, "Sorry! Some  Error Happned");
        //        }
        //    }

        //}

        //public ResponseModel ReturnOutletPoByDetailId(InvOutletPODetail aObj)
        //{
        //    using (var transaction = _db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            if ((aObj.IsReturned != null))
        //            {
        //                DateTime aDate = DateTime.Now;
        //                InvOutletPODetail aInvOutletPDetail = _db.invOutletPOReturnDetails.Find(aObj.OutletPODetailsId);
        //                //aInvOutletPDetail.OutletId = aObj.OutletId;
        //                aInvOutletPDetail.IsActive = false;
        //                aInvOutletPDetail.ModifiedDate = aDate;
        //                aInvOutletPDetail.IsReturned = 2;
        //                _db.invOutletPOReturnDetails.Attach(aInvOutletPDetail);
        //                _db.Entry(aInvOutletPDetail).State = EntityState.Modified;
        //                _db.SaveChanges();

        //                InvOutletStock aOutletStock = new InvOutletStock()
        //                {
        //                    ProductId = aObj.ProductId,
        //                    //OutletId = aObj.OutletId,
        //                    OutletStockQuantity = aObj.ProductQuantity,
        //                    InOut = 2,
        //                    Note = "Returned",
        //                    IsActive = true,
        //                    IsReturned = 2,
        //                    CreatedDate = DateTime.Now
        //                };
        //                _db.InvOutletStocks.Add(aOutletStock);
        //                _db.SaveChanges();

        //                InvWarehouseStock aWarehouseStock = new InvWarehouseStock()
        //                {
        //                    ProductId = aObj.ProductId,
        //                    //OutletId = aObj.OutletId,
        //                    WarehouseStockQuantity = aObj.ProductQuantity,
        //                    InOut = 1,
        //                    Note = "ReturnReceived",
        //                    IsActive = true,
        //                    IsReceived = true,
        //                    CreatedDate = DateTime.Now
        //                };
        //                _db.InvWarehouseStocks.Add(aWarehouseStock);
        //                _db.SaveChanges();

        //                transaction.Commit();
        //                return _aModel.Respons(true, " Successfully return request sent.");
        //            }

        //            transaction.Commit();
        //            return _aModel.Respons(false, "Failed to sent return request.");
        //        }
        //        catch (Exception e)
        //        {
        //            transaction.Rollback();
        //            return _aModel.Respons(false, "Sorry! Some  Error Happned.");
        //        }
        //    }

        //}

    }
}

