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
    public class WarehousePOManager : IWarehousePOManager
    {
        private IGenericRepository<InvWarehousePOMaster> _aRepository;
        private IGenericRepository<InvWarehousePODetail> _aInvWarehousePODetailsRepository;
        private IGenericRepository<InvWarehousePOItemReceived> _aInvWarehousePoItemGenericRepository;
        private IGenericRepository<InvWarehouse> _aInvWarehouseRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        private TopInvoiceNo _invoiceNo;

        public WarehousePOManager()
        {
            _aRepository = new GenericRepositoryInv<InvWarehousePOMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvWarehousePODetailsRepository = new GenericRepositoryInv<InvWarehousePODetail>();
            _aInvWarehousePoItemGenericRepository = new GenericRepositoryInv<InvWarehousePOItemReceived>();
            _aInvWarehouseRepository = new GenericRepositoryInv<InvWarehouse>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
            _invoiceNo = new TopInvoiceNo();
        }
        
       /// <summary>
       /// ///Clock frock
       /// </summary>
       /// <param name="WarehousePOData"></param>
       /// <param name="productList"></param>
       /// <returns></returns>
        public ResponseModel CreateWarehousePODetails(WarehousePODetailsViewModel WarehousePOData, List<ProductWarehousePOVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;
                    InvWarehousePOMaster aWarehousePoMaster = new InvWarehousePOMaster()
                    {

                        // WarehouseId = WarehousePOData.WarehouseId,
                        WarehousePOMasterId = WarehousePOData.WarehousePOMasterId,
                        WarehouseId = 1, //////////In UI there is no Warehouse Id so initialy warehouse id =1 sending to database
                        SupplierId = WarehousePOData.SupplierId,
                        UniqueId = WarehousePOData.UniqueId,
                        POReference = WarehousePOData.POReference,
                        Status = 0,
                        IsActive = true,
                        IsDeleted = false,
                        IsEdited = false,
                        IsReturned = false,
                        CreatedDate = aDate,
                    };

                    if (WarehousePOData.WarehousePOMasterId == 0)
                    {
                        _db.InvWarehousePOMasters.Add(aWarehousePoMaster);
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            InvWarehousePOInvoiceDetail aWarehousePoInvoiceDetails = new InvWarehousePOInvoiceDetail()
                            {
                                WarehousePOInvoiceDetailsId = aData.WarehousePOInvoiceDetailsId,
                                Original_WarehousePODetailsId = aData.WarehousePODetailsId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.OrderedQuantity,
                                IsActive = true,
                                IsDeleted = false,
                                IsEdited = false,
                                IsReturned = false,
                                CreatedDate = aDate,
                            };
                            _db.InvWarehousePOInvoiceDetails.Add(aWarehousePoInvoiceDetails);
                            _db.SaveChanges();
                        }
                        _db.SaveChanges();
                        transaction.Commit();
                        return _aModel.Respons(true, "Warehouse PO successfully returned");
                    }
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry Warehouse PO returned Failed");
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }
        }


        ////// To show Specific Data to Warehouse PO View 
        public ResponseModel GetAllWarehousePOData()
        {
            var invWarehousePoMaster = _aRepository.SelectAll();
            var invWarehousePoDetails = _db.InvWarehousePODetails;

            var data = from pOMast in invWarehousePoMaster
                       join supplier in _db.InvSuppliers on pOMast.SupplierId equals supplier.SupplierId
                      // join poDetail in _db.InvWarehousePODetails on pOMast.WarehousePOMasterId equals poDetail.WarehousePOMasterId
                       
                       select new
                       {
                           pOMast.WarehousePOMasterId,
                           pOMast.UniqueId,
                           pOMast.POReference,
                           pOMast.Status,
                           pOMast.IsActive,

                           //poDetail.WarehousePODetailsId,


                           ApplyDate = pOMast.CreatedDate,

                           supplier.SupplierId,
                           supplier.SupplierName,
                           ProductQuantity = invWarehousePoDetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),
                       };
            var WarehousePoMasterAndDetail = data.ToList().Distinct();
            return _aModel.Respons(WarehousePoMasterAndDetail);
        }

        ////// To show All Request of Warehouse to  Warehouse PO. 
        public ResponseModel GetAllWarehousePOView()
        {
            var invWarehousePoMaster = _aRepository.SelectAll();
            var invWarehouse = _db.InvWarehouses.ToList();
            var invWarehousePoDetails = _db.InvWarehousePODetails;

            var data = (from pOMast in invWarehousePoMaster
                        join Warehouse in invWarehouse on pOMast.WarehouseId equals Warehouse.WarehouseId

                        select new
                        {
                            pOMast.WarehousePOMasterId,
                            ApplyDate = pOMast.CreatedDate, 
                            pOMast.CreatedDate,
                            pOMast.Status,
                            pOMast.IsActive,
                            TotalGrandPrice = GetGrandTotal(pOMast.WarehousePOMasterId),
                            Warehouse.WarehouseId,
                            Warehouse.WarehouseName,
                            ProductQuantity = invWarehousePoDetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),

                        }).ToList();
            var WarehousePoMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePoMasterAndDetail);
        }


        private double GetGrandTotal(int masterId)
        {
            // var invWarehousePoDetails = _db.InvWarehousePODetails;
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

        ////// To show Individual Request of Warehouse PO to  Warehouse. 
        public ResponseModel GetIndividualWarehousePOView(int WarehousePOMasterId)
        {
            var invWarehousePoMaster = _aRepository.SelectAll();
            var invWarehousePoDetails = _db.InvWarehousePODetails;
            var invWarehousePOItemReceived = _db.InvWarehousePOItemReceiveds;
            var TotalPrice = _db.InvProductPrices;

            var data = from pOMast in invWarehousePoMaster
                       join pODetls in invWarehousePoDetails on pOMast.WarehousePOMasterId equals pODetls.WarehousePOMasterId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join warehousePOItemReceived in invWarehousePOItemReceived on pODetls.WarehousePODetailsId equals warehousePOItemReceived.WarehousePODetailsId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join supplier in _db.InvSuppliers on pOMast.SupplierId equals supplier.SupplierId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && pODetls.WarehousePOMasterId == WarehousePOMasterId
                       select new
                       {
                           supplier.SupplierId,
                           supplier.SupplierName,

                           product.ProductId,
                           product.ProductName,
                          /* MBarcode=*/product.ProductMainBarcode,
                          /* FBarcode=*/product.ProductFactoryBarcode,

                           productPrice.ProductPriceId,
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

                           PriceAmount = (pODetls.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),

                           OrderedQuantity = pODetls.ProductQuantity,

                           warehousePOItemReceived.WarehousePOItemReceivedId,
                           ReceivedQuantity = warehousePOItemReceived.ItemReceivedQuantity,/////////// Warehouse PO Item Received Quantity
                           RemainingQuantity = (pODetls.ProductQuantity) - (warehousePOItemReceived.ItemReceivedQuantity)
                       };
            var WarehousePoMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePoMasterAndDetail);
        }


        ////// To show Details Data of a single Product of  Requested by Warehouse PO to  Warehouse. 
        public ResponseModel GetASingleProducDataOfWarehousePOView(int WarehousePODetailsId)
        {
            var invWarehousePoMaster = _aRepository.SelectAll();
            var invWarehousePoDetails = _db.InvWarehousePODetails;
            var invWarehousePOItemReceived = _db.InvWarehousePOItemReceiveds;

            var data = from pOMast in invWarehousePoMaster
                       join pODetls in invWarehousePoDetails on pOMast.WarehousePOMasterId equals pODetls.WarehousePOMasterId
                       join warehousePOItemReceived in invWarehousePOItemReceived on pODetls.WarehousePODetailsId equals warehousePOItemReceived.WarehousePODetailsId
                       join supplier in _db.InvSuppliers on pOMast.SupplierId equals supplier.SupplierId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
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
                           //productPrice.CostPrice,
                           //productPrice.WholeSalePrice,
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
                          
                           PriceAmount = (pODetls.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),


                           OrderedQuantity = pODetls.ProductQuantity,

                           warehousePOItemReceived.WarehousePOItemReceivedId,
                           ReceivedQuantity = warehousePOItemReceived.ItemReceivedQuantity,/////////// Warehouse PO Item Received Quantity
                           RemainingQuantity = (pODetls.ProductQuantity) - (warehousePOItemReceived.ItemReceivedQuantity)





                           //////// Addded on 27-02-2017 , if add these then have to try not to use  Method "GetIndividualWarehousePOView".
                           //supplier.SupplierName,
                           //PriceAmount = (pODetls.ProductQuantity) * Convert.ToDouble(productPrice.RetailPrice),



                       };
            var WarehousePoMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePoMasterAndDetail);
        }


        public ResponseModel UpdateASingleProducDataOfWarehousePOView(InvWarehousePOItemReceived aObj)
        {
            try
            {
                DateTime aDate = DateTime.Now;

                InvWarehousePOItemReceived invWarehousePOItemReceived = _db.InvWarehousePOItemReceiveds.Find(aObj.WarehousePOItemReceivedId);
                invWarehousePOItemReceived.IsActive = false;
                invWarehousePOItemReceived.ModifiedDate = aDate;
                invWarehousePOItemReceived.ItemReceivedQuantity = aObj.ItemReceivedQuantity;

                _db.InvWarehousePOItemReceiveds.Attach(invWarehousePOItemReceived);
                _db.Entry(invWarehousePOItemReceived).State = EntityState.Modified;
                _db.SaveChanges();
                return _aModel.Respons(true, "New Product Quantity Successfully Updated");
            }
            catch (Exception e)
            {
                return _aModel.Respons(false, "Sorry! Some  Error Happned");
            }
        }


        public ResponseModel GetAllApprovedWarehousePOViewByWarehouse()
        {
            var invWarehousePoMaster = _aRepository.SelectAll();
            var invWarehousePoDetails = _db.InvWarehousePODetails;

            var data = from pOMast in invWarehousePoMaster
                          
                       join Warehouse in _db.InvWarehouses on pOMast.WarehouseId equals Warehouse.WarehouseId
                       where pOMast.Status == 2
                       select new
                       {
                           Warehouse.WarehouseName,
                           ApplyDate = pOMast.CreatedDate,
                           pOMast.WarehousePOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,

                           ProductQuantity = invWarehousePoDetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),
                       };
            var WarehousePoMasterAndDetail = data.ToList();
            return _aModel.Respons(WarehousePoMasterAndDetail);
        }

        public ResponseModel ChangeStatusValue(InvWarehousePOMaster aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.Status != null)
                    {
                        DateTime aDate = DateTime.Now;
                        InvWarehousePOMaster invWarehousePoMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
                        invWarehousePoMaster.ModifiedDate = aDate;
                        invWarehousePoMaster.Status = aObj.Status;
                        _db.InvWarehousePOMasters.Attach(invWarehousePoMaster);
                        _db.Entry(invWarehousePoMaster).State = EntityState.Modified;
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


                            InvWarehousePOInvoiceMaster aWarehousePoInvoiceMaster = new InvWarehousePOInvoiceMaster()
                            {
                                Original_WarehousePOMasterId = invWarehousePoMaster.WarehousePOMasterId,
                                WarehousePOInvoiceNo = (_invoiceNo.GetNewInvoiceNo()),

                                WarehouseId = invWarehousePoMaster.WarehouseId,

                                Status = 0,
                                IsActive = true,
                                IsEdited = false,
                                IsDeleted = false,
                                IsReturned = false,
                                CreatedDate = aDate

                            };
                            _db.InvWarehousePOInvoiceMasters.Add(aWarehousePoInvoiceMaster);
                            _db.SaveChanges();

                            var data = (from m in _db.InvWarehousePOMasters
                                        join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
                                        where m.WarehousePOMasterId == aObj.WarehousePOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.WarehousePODetailsId, ///// added 04-05-2017
                                            d.ProductId,
                                            d.ProductQuantity,
                                        }).ToList();
                            foreach (var p in data)
                            {
                                ///// added 04-05-2017
                                InvWarehousePOInvoiceDetail invWarehousePoInvoiceDetail = new InvWarehousePOInvoiceDetail()
                                {

                                    WarehousePOInvoiceMasterId = aWarehousePoInvoiceMaster.WarehousePOInvoiceMasterId,
                                    Original_WarehousePODetailsId = p.WarehousePODetailsId,
                                    ProductId = p.ProductId,
                                    ProductQuantity = p.ProductQuantity,

                                    Status = 0,
                                    IsActive = true,
                                    IsEdited = false,
                                    IsDeleted = false,
                                    IsReturned = false,
                                    CreatedDate = aDate
                                };
                                _db.InvWarehousePOInvoiceDetails.Add(invWarehousePoInvoiceDetail);
                                _db.SaveChanges();

                                
                                InvWarehouseStock aStock = new InvWarehouseStock()
                                {
                                    ProductId = p.ProductId,
                                    WarehouseId = p.WarehouseId,
                                    InOut = 1,
                                    WarehouseStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvWarehouseStocks.Add(aStock);
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



        public ResponseModel ChangeStockValue(InvWarehousePOMaster aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.Status != null)
                    {
                        DateTime aDate = DateTime.Now;
                        ////InvWarehousePOMaster invWarehousePoMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
                        //invWarehousePoMaster.ModifiedDate = aDate;
                        //invWarehousePoMaster.Status = aObj.Status;
                        //_db.InvWarehousePOMasters.Attach(invWarehousePoMaster);
                        //_db.Entry(invWarehousePoMaster).State = EntityState.Modified;
                        //_db.SaveChanges();

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
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvWarehouseStock aStock = new InvWarehouseStock()
                                {
                                    ProductId = p.ProductId,
                                    WarehouseId = p.WarehouseId,
                                    InOut = 1,
                                    WarehouseStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvWarehouseStocks.Add(aStock);
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


       //public ResponseModel ChangeStockValue(InvOutletPOMaster aObj)
       //             {
       //                 using (var transaction = _db.Database.BeginTransaction())
       //                 {
       //                     try
       //                     {
       //                         if (aObj.Status != null)
       //                         {
       //                             DateTime aDate = DateTime.Now;
       //                             ////InvWarehousePOMaster invWarehousePoMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
       //                             //invWarehousePoMaster.ModifiedDate = aDate;
       //                             //invWarehousePoMaster.Status = aObj.Status;
       //                             //_db.InvWarehousePOMasters.Attach(invWarehousePoMaster);
       //                             //_db.Entry(invWarehousePoMaster).State = EntityState.Modified;
       //                             //_db.SaveChanges();

       //                             if (aObj.Status == 2)
       //                             {
       //                                 transaction.Commit();
       //                                 return _aModel.Respons(true, "Approved All  Successfully");
       //                             }
       //                             else if (aObj.Status == 3)
       //                             {
       //                                 transaction.Commit();
       //                                 return _aModel.Respons(true, "Sent Successfully");
       //                             }
       //                             else if (aObj.Status == 4)
       //                             {
       //                                 var data = (from m in _db.InvOutletPOMasters
       //                                             join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
       //                                             where m.OutletPOMasterId == aObj.OutletPOMasterId
       //                                             select
       //                                             new
       //                                             {
       //                                                 m.OutletId,
       //                                                 d.ProductId,
       //                                                 d.ProductQuantity,
       //                                             }).ToList();
       //                                 foreach (var p in data)
       //                                 {
       //                                     InvOutletStock aStock = new InvOutletStock()
       //                                     {
       //                                         ProductId = p.ProductId,
       //                                         OutletId = p.OutletId,
       //                                         InOut = 1,
       //                                         OutletStockQuantity = p.ProductQuantity,
       //                                         CreatedDate = DateTime.Now
       //                                     };
       //                                     _db.InvOutletStocks.Add(aStock);
       //                                     _db.SaveChanges();
       //                                 }
       //                                 transaction.Commit();
       //                                 return _aModel.Respons(true, "Received  Successfully");
       //                             }
       //                         }
       //                         transaction.Commit();
       //                         return _aModel.Respons(false, "Failed to Update Status");
       //                     }
       //                     catch (Exception e)
       //                     {
       //                         transaction.Rollback();
       //                         return _aModel.Respons(false, "Sorry! Some  Error Happned");
       //                     }
       //                 }

       //             }





    }
}


