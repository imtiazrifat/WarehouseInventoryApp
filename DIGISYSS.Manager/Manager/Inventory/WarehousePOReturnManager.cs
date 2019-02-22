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
    public class WarehousePOReturnManager : IWarehousePOReturnManager
    {
        private IGenericRepository<InvWarehousePOMaster> _aRepository;
        private IGenericRepository<InvWarehousePODetail> _aInvWarehousePODetailsRepository;
        private IGenericRepository<InvOutlet> _aInvOutletRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public WarehousePOReturnManager()
        {
            _aRepository = new GenericRepositoryInv<InvWarehousePOMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvWarehousePODetailsRepository = new GenericRepositoryInv<InvWarehousePODetail>();
            _aInvOutletRepository = new GenericRepositoryInv<InvOutlet>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
        }
        public ResponseModel CreateWarehousePOReturnDetails(WarehousePODetailsViewModel WarehousePOReturnData, List<ProductWarehousePOVM> productList)
        {
        //    using (var transaction = _db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            DateTime aDate = DateTime.Now;
        //            InvWarehousePOInvoiceMaster aWarehousePoInvoiceMaster = new InvWarehousePOInvoiceMaster()
        //            {


            //                WarehousePOInvoiceMasterId = WarehousePOReturnData.WarehousePOInvoiceMasterId,
            //                Original_WarehousePOMasterId = WarehousePOReturnData.WarehousePOMasterId,
            //               // WarehousePOInvoiceNo = WarehousePOReturnData.WarehousePOInvoiceNo,
            //                WarehouseId = WarehousePOReturnData.WarehouseId,
            //                SupplierId = WarehousePOReturnData.SupplierId,
            //                UniqueId = WarehousePOReturnData.UniqueId,
            //                POReference = WarehousePOReturnData.POReference,
            //                Status = 0,
            //                IsActive = true,
            //                IsDeleted = false,
            //                IsEdited = false,
            //                IsReturned = false,
            //                CreatedDate = aDate,
            //            };

            //            if (WarehousePOReturnData.WarehousePOMasterId == 0)
            //            {
            //               // _db.InvWarehousePOMasters.Add(aWarehousePoMaster);
            //                _db.SaveChanges();

            //                foreach (var aData in productList)
            //                {
            //                    InvWarehousePOInvoiceDetail aWarehousePoInvoiceDetails = new InvWarehousePOInvoiceDetail()
            //                    {
            //                        WarehousePOInvoiceMasterId = WarehousePOReturnData.WarehousePOInvoiceMasterId,

            //                        Original_WarehousePODetailsId = aData.WarehousePODetailsId,
            //                        ProductId = aData.ProductId,
            //                        ProductQuantity = aData.OrderedQuantity,
            //                        IsActive = true,
            //                        IsDeleted = false,
            //                        IsEdited = false,
            //                        IsReturned = false,
            //                        CreatedDate = aDate,
            //                    };
            //                    //_db.InvWarehousePODetails.Add(aWarehousePoDetails);
            //                    _db.SaveChanges();

            //                    InvWarehousePOItemReceived aWarehousePoItemReceived = new InvWarehousePOItemReceived()
            //                    {
            //                        WarehousePOMasterId = aWarehousePoMaster.WarehousePOMasterId,
            //                        WarehousePODetailsId = aWarehousePoDetails.WarehousePODetailsId,
            //                        ItemReceivedQuantity = 0,
            //                    };
            //                    _db.InvWarehousePOItemReceiveds.Add(aWarehousePoItemReceived);
            //                    _db.SaveChanges();
            //                }
            //                _db.SaveChanges();
            //                transaction.Commit();
            //                return _aModel.Respons(true, "New WarehousePO Successfully Saved");
            //            }

            //            else if (WarehousePOReturnData.WarehousePOMasterId > 0)
            //            {
            //                _db.InvWarehousePOMasters.Attach(aWarehousePoMaster);
            //                _db.Entry(aWarehousePoMaster).State = EntityState.Modified;
            //                _db.SaveChanges();

            //                //var invPoDetails = _db.InvWarehousePODetails.Find(x.WarehousePODetailsId);
            //                ////var invPoDetails = (from d in _db.InvWarehousePODetails
            //                ////    where d.WarehousePOMasterId == aWarehousePoMaster.WarehousePOMasterId
            //                ////    select d).ToList();

            //                //invPoDetails.IsActive = false;
            //                //invPoDetails.ModifiedDate = aDate;

            //                foreach (var aData in productList)
            //                {
            //                    InvWarehousePODetail aWarehousePoDetails = new InvWarehousePODetail()
            //                    {
            //                        WarehousePOMasterId = aWarehousePoMaster.WarehousePOMasterId,
            //                        WarehousePODetailsId = aData.WarehousePODetailsId,
            //                        ProductId = aData.ProductId,
            //                        ProductQuantity = aData.OrderedQuantity,
            //                        CreatedDate = aDate
            //                    };
            //                    _db.InvWarehousePODetails.Add(aWarehousePoDetails);
            //                    _db.Entry(aWarehousePoDetails).State = EntityState.Modified;
            //                    _db.SaveChanges();

            //                    /////////////////////////////////////////Below Code Create Bugs,Causes there are no effect changing of Warehouse PO Create/Edit after View/just view.Also we didn't send any value from client to server and used Transection for safety,but  transection is failed to update any value and as usually it is rolling back and wihout Attachihg/Adding in any of these 3(three) table.
            //                    //    InvWarehousePOItemReceived aWarehousePoItemReceived = new InvWarehousePOItemReceived()    
            //                    //    {
            //                    //        WarehousePOMasterId = aWarehousePoMaster.WarehousePOMasterId,
            //                    //        WarehousePODetailsId = aWarehousePoDetails.WarehousePODetailsId,
            //                    //        WarehousePOItemReceivedId = aData.WarehousePOItemReceivedId,
            //                    //        ItemReceivedQuantity = 0,
            //                    //    };
            //                    //    _db.InvWarehousePOItemReceiveds.Add(aWarehousePoItemReceived);
            //                    //    _db.Entry(aWarehousePoItemReceived).State = EntityState.Modified;
            //                    //    _db.SaveChanges();
            //                }
            //                transaction.Commit();
            //                return _aModel.Respons(true, "Warehouse PO Successfully Updated");
            //            }
            //            _db.SaveChanges();
            //            transaction.Commit();
            //            return _aModel.Respons(true, "Sorry Warehouse PO Update Failed");
            //        }
            //        catch (Exception ex)
            //        {
            //            transaction.Rollback();
            //            return _aModel.Respons(true, "Sorry Some Error Happned");
            //        }
            //    }

            return null;
        }



        public ResponseModel GetAllWarehousePOReturnData()
        {
            var invWarehousePOReturnMaster = _aRepository.SelectAll();
            var InvWarehousePODetails = _db.InvWarehousePODetails;

            var data = from pOMast in invWarehousePOReturnMaster
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId

                       select new
                       {
                           pOMast.WarehousePOMasterId,
                           warehouse.WarehouseName,
                           pOMast.Status,
                           pOMast.IsActive,
                           ApplyDate = pOMast.CreatedDate,
                           ProductQuantity = InvWarehousePODetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),
                       };
            var WarehousePOReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePOReturnMasterAndDetail);
        }


        public ResponseModel GetAllWarehousePO()
        {
            var invWarehousePOMaster = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var InvWarehousePODetails = _db.InvWarehousePODetails;

            var data = (from pOMast in invWarehousePOMaster
                        join outlet in invOutlet on pOMast.WarehouseId equals outlet.OutletId
                        where pOMast.Status < 3
                        select new
                        {
                            pOMast.WarehousePOMasterId,
                            ApplyDate = pOMast.CreatedDate,
                            pOMast.CreatedDate,
                            pOMast.Status,
                            pOMast.IsActive,
                            TotalGrandPrice = GetGrandTotal(pOMast.WarehousePOMasterId),
                            outlet.OutletId,
                            outlet.OutletName,
                            ProductQuantity = InvWarehousePODetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),

                        }).ToList();
            var WarehousePOReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePOReturnMasterAndDetail);
        }
        public ResponseModel GetAllWarehousePOData()
        {
            var invWarehousePOMaster = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var InvWarehousePODetails = _db.InvWarehousePODetails;

            var data = (from pOMast in invWarehousePOMaster
                        join outlet in invOutlet on pOMast.WarehouseId equals outlet.OutletId
                        where pOMast.Status < 3
                        select new
                        {
                            pOMast.WarehousePOMasterId,
                            ApplyDate = pOMast.CreatedDate,
                            pOMast.CreatedDate,
                            pOMast.Status,
                            pOMast.IsActive,
                            TotalGrandPrice = GetGrandTotal(pOMast.WarehousePOMasterId),
                            outlet.OutletId,
                            outlet.OutletName,
                            ProductQuantity = InvWarehousePODetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),

                        }).ToList();
            var WarehousePOReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePOReturnMasterAndDetail);
        }

        public ResponseModel GetAllReceivedWarehousePOByWarehouse()
        {
            var invWarehousePOReturnMaster = _aRepository.SelectAll();
            var InvWarehousePODetails = _db.InvWarehousePODetails;
            var invProduct = _db.InvProducts;
            var invProductPrice = _db.InvProductPrices;
            var TotalPrice = _db.InvProductPrices;
            var data = from pOMast in invWarehousePOReturnMaster
                       join outlet in _db.InvOutlets on pOMast.WarehouseId equals outlet.OutletId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId

                       where pOMast.Status == 4
                       select new
                       {
                           pOMast.WarehousePOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,
                           warehouse.WarehouseId,
                           warehouse.WarehouseName,
                           outlet.OutletId,
                           outlet.OutletName,
                           ApplyDate = pOMast.CreatedDate,
                           TotalGrandPrice = GetGrandTotal(pOMast.WarehousePOMasterId),
                           ProductQuantity = InvWarehousePODetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),
                       };
            var WarehousePOReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePOReturnMasterAndDetail);
        }

        private double GetGrandTotal(int masterId)
        {
            var allProduct = _aInvProductRepository.SelectAll();
            var allPrice = _aInvProductPriceRepository.SelectAll().Where(p => p.IsActive == true);
            try
            {
                var selectedProduct = _aInvWarehousePODetailsRepository.SelectAll().Where(aa => aa.WarehousePOMasterId == masterId && aa.Status != 2).ToList();

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

        public ResponseModel GetIndividualWarehousePO(int WarehousePOMasterId)
        {
            var invWarehousePOReturnMaster = _aRepository.SelectAll();
            var invWarehousePODetails = _db.InvWarehousePODetails;
            var TotalPrice = 0;

            var data = from pOMast in invWarehousePOReturnMaster
                       join pODetls in invWarehousePODetails on pOMast.WarehousePOMasterId equals pODetls.WarehousePOMasterId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join outlet in _db.InvOutlets on pOMast.WarehouseId equals outlet.OutletId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId



                       where productPrice.IsActive == true && pODetls.WarehousePOMasterId == WarehousePOMasterId
                       select new
                       {
                           outlet.OutletName,
                           outlet.OutletId,
                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,
                           product.ProductFactoryBarcode,

                           pOMast.WarehousePOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,

                           pODetls.WarehousePODetailsId,
                           pODetls.ProductQuantity,
                           //pODetls.IsEdited,

                           productPrice.RetailPrice,
                           PriceAmount = (pODetls.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),
                           TotalPrice = TotalPrice + (pODetls.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),

                           item.ItemId,
                           item.ItemName,

                           size.SizeId,
                           size.SizeName,

                           uOm.UoMId,
                           uOm.UoMShortName,
                           OrderedQuantity = pODetls.ProductQuantity,

                           warehouse.WarehouseId,
                           warehouse.WarehouseName
                       };
            var WarehousePOReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePOReturnMasterAndDetail);
        }

        public ResponseModel GetASingleProducDataOfWarehousePO(int WarehousePODetailsId)
        {
            var invWarehousePOReturnMaster = _aRepository.SelectAll();
            var invWarehousePODetails = _db.InvWarehousePODetails;
            var data = from pOMast in invWarehousePOReturnMaster
                       join pODetls in invWarehousePODetails on pOMast.WarehousePOMasterId equals pODetls.WarehousePOMasterId
                       join outlet in _db.InvOutlets on pOMast.WarehouseId equals outlet.OutletId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && pODetls.WarehousePODetailsId == WarehousePODetailsId

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

                           pOMast.WarehousePOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,

                           pODetls.WarehousePODetailsId,
                           pODetls.ProductQuantity,
                           //pODetls.IsEdited,
                       };
            var WarehousePOReturnMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePOReturnMasterAndDetail);
        }


        public ResponseModel UpdateASingleProducDataOfWarehousePO(InvWarehousePODetail aObj)
        {
            try
            {
                DateTime aDate = DateTime.Now;

                InvWarehousePODetail aInvWarehousePODetail = _db.InvWarehousePODetails.Find(aObj.WarehousePODetailsId);
                aInvWarehousePODetail.IsActive = false;
                aInvWarehousePODetail.ModifiedDate = aDate;
                aInvWarehousePODetail.ProductQuantity = aObj.ProductQuantity;
               // aInvWarehousePODetail.IsEdited = true;
                _db.InvWarehousePODetails.Attach(aInvWarehousePODetail);
                _db.Entry(aInvWarehousePODetail).State = EntityState.Modified;
                _db.SaveChanges();
                return _aModel.Respons(true, "New Product Quantity Successfully Updated");
            }
            catch (Exception e)
            {
                return _aModel.Respons(false, "Sorry! Some  Error Happned");
            }
        }


        

        public ResponseModel ChangeStatusValueInMasterTable(InvWarehousePOMaster aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.Status != null)
                    {
                        DateTime aDate = DateTime.Now;
                        InvWarehousePOMaster invWarehousePOReturnMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
                        invWarehousePOReturnMaster.ModifiedDate = aDate;
                        invWarehousePOReturnMaster.Status = aObj.Status;
                        _db.InvWarehousePOMasters.Attach(invWarehousePOReturnMaster);
                        _db.Entry(invWarehousePOReturnMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.Status == 2)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Approved All  Successfully");
                        }
                        else if (aObj.Status == 3)
                        {
                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                            //m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvWarehouseStock aStock = new InvWarehouseStock()
                                {
                                    ProductId = p.ProductId,
                                    WarehouseId = p.WarehouseId,
                                    InOut = 2,
                                    WarehouseStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvWarehouseStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Sent Successfully");
                        }
                        else if (aObj.Status == 4)
                        {
                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                            //m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()

                                {
                                    ProductId = p.ProductId,
                                    //OutletId = p.OutletId,
                                    InOut = 1,
                                    OutletStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvOutletStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Received  Successfully");
                        }
                    }
                    transaction.Commit();
                    return _aModel.Respons(false, "Failed to Update Status");
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some  Error Happned");
                }
            }

        }


        public ResponseModel ChangeStatusValueInDetailTable(InvWarehousePODetail aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if ((aObj.Status != null) && (aObj.Status == 0) && (aObj.Status <= 10))
                    {
                        DateTime aDate = DateTime.Now;
                        InvWarehousePODetail aInvOutletPDetail = _db.InvWarehousePODetails.Find(aObj.WarehousePODetailsId);
                        aInvOutletPDetail.ModifiedDate = aDate;
                        aInvOutletPDetail.Status = aObj.Status;
                        _db.InvWarehousePODetails.Attach(aInvOutletPDetail);
                        _db.Entry(aInvOutletPDetail).State = EntityState.Modified;
                        _db.SaveChanges();


                        if (aObj.Status == 22)
                        {

                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved a Single Product.");
                        }
                        else if (aObj.Status == 1010)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Successfully Deleted.");
                        }
                    }

                    transaction.Commit();
                    return _aModel.Respons(false, "Failed to Update Status.");
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some  Error Happned.");
                }
            }

        }

        public ResponseModel ChangeStatusValueInMasterOrDetail(InvWarehousePODetail aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if ((aObj.Status != null) && (aObj.Status != 0) && (aObj.Status <= 10))
                    {
                        DateTime aDate = DateTime.Now;

                        InvWarehousePOMaster invWarehousePOReturnMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
                        invWarehousePOReturnMaster.ModifiedDate = aDate;
                        invWarehousePOReturnMaster.Status = aObj.Status;
                        _db.InvWarehousePOMasters.Attach(invWarehousePOReturnMaster);
                        _db.Entry(invWarehousePOReturnMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.Status == 2)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved a Single Product.");
                        }
                        else if (aObj.Status == 3)
                        {
                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                           //// m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvWarehouseStock aStock = new InvWarehouseStock()
                                {
                                    ProductId = p.ProductId,
                                    WarehouseId = p.WarehouseId,
                                    InOut = 2,
                                    WarehouseStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvWarehouseStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Sent Successfully.");
                        }
                        else if (aObj.Status == 4)
                        {
                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                           /// m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()

                                {
                                    ProductId = p.ProductId,
                                    ////OutletId = p.OutletId,
                                    InOut = 1,
                                    OutletStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvOutletStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Received  Successfully.");
                        }
                        else if (aObj.Status == 10)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Successfully Deleted.");
                        }
                    }

                    else if (aObj.Status > 10)
                    {
                        DateTime aDate = DateTime.Now;

                        InvWarehousePODetail InvWarehousePODetail = _db.InvWarehousePODetails.Find(aObj.WarehousePODetailsId);
                        InvWarehousePODetail.ModifiedDate = aDate;
                        InvWarehousePODetail.Status = aObj.Status;
                        _db.InvWarehousePODetails.Attach(InvWarehousePODetail);
                        _db.Entry(InvWarehousePODetail).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.Status == 22)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved a Single Product.");
                        }
                        else if (aObj.Status == 22)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved All Product.");
                        }
                        else if (aObj.Status == 44)
                        {
                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                           /// m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()

                                {
                                    ProductId = p.ProductId,
                                    ////OutletId = p.OutletId,
                                    InOut = 1,
                                    OutletStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvOutletStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Received  Successfully.");
                        }
                        else if (aObj.Status == 1010)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Successfully Deleted A Product.");
                        }
                    }
                    transaction.Commit();
                    return _aModel.Respons(false, "Failed to Update Status.");
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some  Error Happned.");
                }
            }

        }

        public ResponseModel ChangeStockValue(InvWarehousePOMaster aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.Status != null)
                    {
                        DateTime aDate = DateTime.Now;
                        if (aObj.Status == 2)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Approved All  Successfully");
                        }
                        else if (aObj.Status == 3)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Sent Successfully");
                        }
                        else if (aObj.Status == 4)
                        {
                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            /////m.OutletId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()
                                {
                                    ProductId = p.ProductId,
                                    ////OutletId = p.OutletId,
                                    InOut = 1,
                                    OutletStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvOutletStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            transaction.Commit();
                            return _aModel.Respons(true, "Received  Successfully");
                        }
                    }
                    transaction.Commit();
                    return _aModel.Respons(false, "Failed to Update Status");
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some  Error Happned");
                }
            }

        }

    }
}

