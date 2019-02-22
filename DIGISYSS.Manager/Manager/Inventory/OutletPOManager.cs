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
    public class OutletPOManager : IOutletPOManager
    {
        private IGenericRepository<InvOutletPOMaster> _aRepository;
        private IGenericRepository<InvOutletPODetail> _aInvOutletPODetailsRepository;
        private IGenericRepository<InvOutlet> _aInvOutletRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        private TopInvoiceNo _invoiceNo;

        public OutletPOManager()
        {
            _aRepository = new GenericRepositoryInv<InvOutletPOMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvOutletPODetailsRepository = new GenericRepositoryInv<InvOutletPODetail>();
            _aInvOutletRepository = new GenericRepositoryInv<InvOutlet>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
            _invoiceNo = new TopInvoiceNo();
        }
        public ResponseModel CreateOutletPODetails(OutletPODetailsViewModel OutletPOData, List<ProductOutletPOVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;
                    InvOutletPOMaster aOutletPoMaster = new InvOutletPOMaster()
                    {
                        OutletPOMasterId = OutletPOData.OutletPOMasterId,
                        //   WarehouseName = OutletPOData.WarehouseName,
                        //WarehouseId = OutletPOData.WarehouseId,
                        WarehouseId = 1,
                        //  OutletId = OutletPOData.OutletId,
                        OutletId = 1,
                        Status = 0,
                        IsActive = true,
                        CreatedDate = aDate,
                    };

                    if (OutletPOData.OutletPOMasterId == 0)
                    {
                        _db.InvOutletPOMasters.Add(aOutletPoMaster);
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            InvOutletPODetail aOutletPoDetails = new InvOutletPODetail()
                            {
                                OutletPOMasterId = aOutletPoMaster.OutletPOMasterId,
                                OutletPODetailsId = aData.OutletPODetailsId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                IsActive = true,
                                CreatedDate = aDate,
                            };
                            _db.InvOutletPODetails.Add(aOutletPoDetails);
                        }
                        _db.SaveChanges();
                        transaction.Commit();
                        return _aModel.Respons(true, "New OutletPO Successfully Saved");
                    }

                    else if (OutletPOData.OutletPOMasterId > 0)
                    {
                        _db.InvOutletPOMasters.Attach(aOutletPoMaster);
                        _db.Entry(aOutletPoMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        var invPoDetails = _db.InvOutletPODetails.Find(OutletPOData.OutletPODetailsId);

                        invPoDetails.IsActive = false;
                        invPoDetails.ModifiedDate = aDate;

                        _db.InvOutletPODetails.Attach(invPoDetails);
                        _db.Entry(invPoDetails).State = EntityState.Modified;
                        _db.SaveChanges();

                        foreach (var aData in productList)
                        {
                            InvOutletPODetail aOutletPoDetails = new InvOutletPODetail()
                            {
                                OutletPOMasterId = aOutletPoMaster.OutletPOMasterId,
                                OutletPODetailsId = aData.OutletPODetailsId,
                                ProductId = aData.ProductId,
                                ProductQuantity = aData.ProductQuantity,
                                IsActive = true,
                                CreatedDate = aDate
                            };
                            _db.InvOutletPODetails.Add(aOutletPoDetails);
                            _db.Entry(aOutletPoDetails).State = EntityState.Modified;
                            _db.SaveChanges();
                        }
                        transaction.Commit();
                        return _aModel.Respons(true, "Successfully Updated  Outlet PO");
                    }
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry Outlet PO Update Failed");
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }

        }


        ////// To show Specific Data to Outlet PO View 
        public ResponseModel GetAllOutletPOData()
        {
            var invOutletPoMaster = _aRepository.SelectAll();
            var invOutletPoDetails = _db.InvOutletPODetails;

            var data = from pOMast in invOutletPoMaster
                           ////// join pODetls in invOutletPoDetails on pOMast.OutletPOMasterId equals pODetls.OutletPOMasterId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join outlet in _db.InvOutlets on pOMast.WarehouseId equals outlet.OutletId

                       select new
                       {
                           pOMast.OutletPOMasterId,
                           //PoMast.OutletPOCode,
                           pOMast.Status,
                           ApplyDate = pOMast.CreatedDate,

                           //pODetls.OutletPODetailsId,
                           //pODetls.ProductId,
                           //pODetls.ProductQuantity,
                           pOMast.IsActive,
                           pOMast.IsChanged,
                           pOMast.IsDeleted,
                           pOMast.IsEdited,
                           pOMast.IsReturned,
                           ProductQuantity = invOutletPoDetails.Where(m => m.OutletPOMasterId == pOMast.OutletPOMasterId).Select(m => m.ProductQuantity).Sum(),

                           warehouse.WarehouseId,
                           warehouse.WarehouseName,
                           outlet.OutletId,
                           outlet.OutletName,
                       };
            var outletPoMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoMasterAndDetail);
        }

        ////// To show All Request of Outlet to  Warehouse PO. 
        public ResponseModel GetAllOutletPOView()
        {
            var invOutletPoMaster = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var invOutletPoDetails = _db.InvOutletPODetails;

            var data = (from pOMast in invOutletPoMaster
                            //join pODetls in invOutletPoDetails on pOMast.OutletPOMasterId equals pODetls.OutletPOMasterId
                        join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                        join outlet in invOutlet on pOMast.OutletId equals outlet.OutletId
                        where pOMast.Status < 3
                        select new
                        {
                            pOMast.OutletPOMasterId,
                            ApplyDate = pOMast.CreatedDate,

                            //pOMast.WarehouseId,
                            //pOMast.WarehouseName,
                            pOMast.CreatedDate,
                            pOMast.Status,
                            pOMast.IsActive,
                            pOMast.IsChanged,
                            pOMast.IsDeleted,
                            pOMast.IsEdited,
                            pOMast.IsReturned,
                            TotalGrandPrice = GetGrandTotal(pOMast.OutletPOMasterId),
                            ProductQuantity = invOutletPoDetails.Where(m => m.OutletPOMasterId == pOMast.OutletPOMasterId).Select(m => m.ProductQuantity).Sum(),

                            warehouse.WarehouseId,
                            warehouse.WarehouseName,
                            outlet.OutletId,
                            outlet.OutletName,
                        }).ToList();
            var outletPoMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoMasterAndDetail);
        }

        private double GetGrandTotal(int masterId)
        {
            // var invOutletPoDetails = _db.InvOutletPODetails;
            var allProduct = _aInvProductRepository.SelectAll();
            var allPrice = _aInvProductPriceRepository.SelectAll().Where(p => p.IsActive == true);
            try
            {
                var selectedProduct = _aInvOutletPODetailsRepository.SelectAll().Where(aa => aa.OutletPOMasterId == masterId && aa.Status != 2).ToList();

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

        ////// To show Individual Request of Outlet PO to  Warehouse. 
        public ResponseModel GetIndividualOutletPOView(int OutletPOMasterId)
        {
            var invOutletPoMaster = _aRepository.SelectAll();//efficint if write query written heare and select only matched to master Id
            var invOutletPoDetails = _db.InvOutletPODetails;
            var TotalPrice = 0;

            var data = from pOMast in invOutletPoMaster
                       join pODetls in invOutletPoDetails on pOMast.OutletPOMasterId equals pODetls.OutletPOMasterId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join outlet in _db.InvOutlets on pOMast.OutletId equals outlet.OutletId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && pODetls.OutletPOMasterId == OutletPOMasterId
                       select new
                       {
                           product.ProductId,
                           product.ProductName,
                           product.ProductMainBarcode,
                           product.ProductFactoryBarcode,

                           pOMast.OutletPOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,
                           pOMast.IsChanged,
                           pOMast.IsDeleted,
                           pOMast.IsEdited,

                           pODetls.OutletPODetailsId,
                           //pODetls.ProductId,
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

        public ResponseModel GetAllReceivedOutletPoByWarehouse()
        {
            var invOutletPoMaster = _aRepository.SelectAll();
            var InvOutletPODetails = _db.InvOutletPODetails;
            var invProduct = _db.InvProducts;
            var invProductPrice = _db.InvProductPrices;
            var TotalPrice = _db.InvProductPrices;
            var data = from pOMast in invOutletPoMaster
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join outlet in _db.InvOutlets on pOMast.OutletId equals outlet.OutletId

                       where pOMast.Status == 4
                       select new
                       {
                           pOMast.OutletPOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,
                           pOMast.IsDeleted,
                           pOMast.IsReturned,

                           ApplyDate = pOMast.CreatedDate,
                           TotalGrandPrice = GetGrandTotal(pOMast.OutletPOMasterId),
                           ProductQuantity = InvOutletPODetails.Where(m => m.OutletPOMasterId == pOMast.OutletPOMasterId).Select(m => m.ProductQuantity).Sum(),

                           warehouse.WarehouseId,
                           warehouse.WarehouseName,
                           outlet.OutletId,
                           outlet.OutletName,
                       };
            var outletPoMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoMasterAndDetail);
        }


        ////// To show Details Data of a single Product of  Requested by Outlet PO to  Warehouse. 
        public ResponseModel GetASingleProducDataOfOutletPOView(int OutletPODetailsId)
        {
            var invOutletPoMaster = _aRepository.SelectAll();
            var invOutletPoDetails = _db.InvOutletPODetails;

            var data = from pOMast in invOutletPoMaster
                       join pODetls in invOutletPoDetails on pOMast.OutletPOMasterId equals pODetls.OutletPOMasterId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join outlet in _db.InvOutlets on pOMast.OutletId equals outlet.OutletId
                       join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                       join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join item in _db.InvItems on product.ItemId equals item.ItemId
                       join factory in _db.InvFactories on product.FactoryId equals factory.FactoryId
                       join size in _db.InvSizes on product.SizeId equals size.SizeId
                       join uOm in _db.InvUoMs on product.UoMId equals uOm.UoMId
                       join color in _db.InvColors on product.ColorId equals color.ColorId

                       where productPrice.IsActive == true && pODetls.OutletPODetailsId == OutletPODetailsId

                       select new
                       {
                           pOMast.OutletPOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,

                           pODetls.OutletPODetailsId,
                           pODetls.ProductQuantity,
                           pODetls.IsEdited,

                           warehouse.WarehouseId,
                           warehouse.WarehouseName,
                           outlet.OutletId,
                           outlet.OutletName,

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
                       };
            var outletPoMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoMasterAndDetail);
        }


        public ResponseModel UpdateASingleProducDataOfOutletPOView(InvOutletPODetail aObj)
        {

            try
            {
                DateTime aDate = DateTime.Now;

                InvOutletPODetail invOutletPODetail = _db.InvOutletPODetails.Find(aObj.OutletPODetailsId);
                invOutletPODetail.IsActive = false;
                invOutletPODetail.ModifiedDate = aDate;
                invOutletPODetail.ProductQuantity = aObj.ProductQuantity;
                invOutletPODetail.IsEdited = true;
                _db.InvOutletPODetails.Attach(invOutletPODetail);
                _db.Entry(invOutletPODetail).State = EntityState.Modified;
                _db.SaveChanges();
                return _aModel.Respons(true, "Product Quantity Successfully Updated");
            }
            catch (Exception e)
            {
                return _aModel.Respons(false, "Sorry! Some  Error Happned");
            }
        }


        public ResponseModel GetAllApprovedOutletPOViewByWarehouse()
        {
            var invOutletPoMaster = _aRepository.SelectAll();//efficint if write query written heare and select only matched to master Id
            var invOutletPoDetails = _db.InvOutletPODetails;
            var invProduct = _db.InvProducts;
            var invProductPrice = _db.InvProductPrices;
            var TotalPrice = _db.InvProductPrices;


            var data = from pOMast in invOutletPoMaster
                           //join pODetls in invOutletPoDetails on pOMast.OutletPOMasterId equals pODetls.OutletPOMasterId
                           //join product in _db.InvProducts on pODetls.ProductId equals product.ProductId
                           //join productPrice in _db.InvProductPrices on product.ProductId equals productPrice.ProductId
                       join warehouse in _db.InvWarehouses on pOMast.WarehouseId equals warehouse.WarehouseId
                       join outlet in _db.InvOutlets on pOMast.OutletId equals outlet.OutletId

                       where pOMast.Status == 2
                       select new
                       {
                           ApplyDate = pOMast.CreatedDate,

                           pOMast.OutletPOMasterId,
                           pOMast.Status,
                           pOMast.IsActive,
                           TotalGrandPrice = GetGrandTotal(pOMast.OutletPOMasterId),

                           ProductQuantity = invOutletPoDetails.Where(m => m.OutletPOMasterId == pOMast.OutletPOMasterId).Select(m => m.ProductQuantity).Sum(),

                           warehouse.WarehouseId,
                           warehouse.WarehouseName,
                           outlet.OutletId,
                           outlet.OutletName,
                       };
            var outletPoMasterAndDetail = data.ToList();
            return _aModel.Respons(outletPoMasterAndDetail);
        }

        public ResponseModel ChangeStatusValueInMasterTable(InvOutletPOMaster aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.Status != null)
                    {
                        DateTime aDate = DateTime.Now;
                        InvOutletPOMaster invOutletPoMaster = _db.InvOutletPOMasters.Find(aObj.OutletPOMasterId);
                        invOutletPoMaster.ModifiedDate = aDate;
                        invOutletPoMaster.Status = aObj.Status;
                        _db.InvOutletPOMasters.Attach(invOutletPoMaster);
                        _db.Entry(invOutletPoMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.Status == 2)
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, "Approved All  Successfully");
                        }
                        else if (aObj.Status == 3)
                        {
                            var data = (from m in _db.InvOutletPOMasters
                                        join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
                                        where m.OutletPOMasterId == aObj.OutletPOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            m.OutletId,

                                            d.OutletPODetailsId,
                                            d.ProductId,
                                            d.ProductQuantity,

                                        }).ToList();

                            /////////////  added 04-05-2017 
                            InvOutletPOInvoiceMaster aInvOutletPoInvoiceMaster = new InvOutletPOInvoiceMaster()
                            {
                              
                                Original_OutletPOMasterId = invOutletPoMaster.OutletPOMasterId,
                                OutletPOInvoiceNo = (_invoiceNo.GetNewInvoiceNo()),

                                WarehouseId = invOutletPoMaster.WarehouseId,
                                OutletId = invOutletPoMaster.OutletId,

                                Status = 0,
                                IsActive = true,
                                IsEdited = false,
                                IsDeleted = false,
                                IsReturned = false,
                                CreatedDate = aDate
                            };
                            _db.InvOutletPOInvoiceMasters.Add(aInvOutletPoInvoiceMaster);
                            _db.SaveChanges();

                            foreach (var p in data)
                            {

                                ///// added 04-05-2017
                                InvOutletPOInvoiceDetail aInvOutletPoInvoiceDetail = new InvOutletPOInvoiceDetail()
                                {

                                    OutletPOInvoiceMasterId = aInvOutletPoInvoiceMaster.OutletPOInvoiceMasterId,
                                    Original_OutletPODetailsId = p.OutletPODetailsId,
                                    ProductId = p.ProductId,
                                    ProductQuantity = p.ProductQuantity,

                                    Status = 0,
                                    IsActive = true,
                                    IsEdited = false,
                                    IsDeleted = false,
                                    IsReturned = false,
                                    CreatedDate = aDate
                                };
                                _db.InvOutletPOInvoiceDetails.Add(aInvOutletPoInvoiceDetail);
                                _db.SaveChanges();

                                InvWarehouseStock aStock = new InvWarehouseStock()
                                {
                                    ProductId = p.ProductId,
                                    WarehouseId = p.WarehouseId,
                                    InOut = 2,
                                    Note = "Sent To Outlet",
                                    WarehouseStockQuantity = p.ProductQuantity,
                                    CreatedDate = DateTime.Now
                                };
                                _db.InvWarehouseStocks.Add(aStock);
                                _db.SaveChanges();
                            }
                            _db.SaveChanges();
                            transaction.Commit();
                            return _aModel.Respons(true, "Successfully Sent.");
                        }
                        else if (aObj.Status == 4)
                        {
                            var data = (from m in _db.InvOutletPOMasters
                                        join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
                                        where m.OutletPOMasterId == aObj.OutletPOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                            m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()
                                {
                                    ProductId = p.ProductId,
                                    OutletId = p.OutletId,
                                    InOut = 1,
                                    Note = "Received From Warehouse",
                                    OutletStockQuantity = p.ProductQuantity,
                                    IsActive = true,
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


        public ResponseModel ChangeStatusValueInDetailTable(InvOutletPODetail aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if ((aObj.Status != null) && (aObj.Status == 0) && (aObj.Status <= 10))
                    {
                        DateTime aDate = DateTime.Now;
                        InvOutletPODetail invOutletPoDetail = _db.InvOutletPODetails.Find(aObj.OutletPODetailsId);
                        invOutletPoDetail.ModifiedDate = aDate;
                        invOutletPoDetail.Status = aObj.Status;
                        _db.InvOutletPODetails.Attach(invOutletPoDetail);
                        _db.Entry(invOutletPoDetail).State = EntityState.Modified;
                        _db.SaveChanges();


                        if (aObj.Status == 2)   /////////Here only 2 for master table status change and 22 for detail table.
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved a Single Product.");
                        }
                        else if (aObj.Status == 1010)
                        {
                            //InvOutletPOMaster invOutletPoMaster = _db.InvOutletPOMasters.Find(aObj.OutletPOMasterId);
                            //invOutletPoMaster.ModifiedDate = aDate;
                            //invOutletPoMaster.Status = aObj.Status;
                            //invOutletPoMaster.IsActive = false;
                            //_db.InvOutletPOMasters.Add(invOutletPoMaster);
                            //_db.Entry(invOutletPoMaster).State = EntityState.Modified;
                            //_db.SaveChanges();

                            transaction.Commit();
                            return _aModel.Respons(true, "Successfully Updated.");
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

        public ResponseModel ChangeStatusValueInMasterOrDetail(InvOutletPODetail aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if ((aObj.Status != null) && (aObj.Status != 0) && (aObj.Status <= 10))
                    {
                        DateTime aDate = DateTime.Now;

                        InvOutletPOMaster invOutletPoMaster = _db.InvOutletPOMasters.Find(aObj.OutletPOMasterId);
                        invOutletPoMaster.ModifiedDate = aDate;
                        invOutletPoMaster.Status = aObj.Status;
                        _db.InvOutletPOMasters.Attach(invOutletPoMaster);
                        _db.Entry(invOutletPoMaster).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.Status == 2)   /////////Here only 2 for master table status change and 22 for detail table.
                        {

                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved a Single Product.");
                        }
                        else if (aObj.Status == 3)
                        {
                            var data = (from m in _db.InvOutletPOMasters
                                        join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
                                        where m.OutletPOMasterId == aObj.OutletPOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                            m.OutletId
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
                            return _aModel.Respons(true, "Successfully Sent.");
                        }
                        else if (aObj.Status == 4)
                        {
                            var data = (from m in _db.InvOutletPOMasters
                                        join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
                                        where m.OutletPOMasterId == aObj.OutletPOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                            m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()

                                {
                                    ProductId = p.ProductId,
                                    OutletId = p.OutletId,
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
                            //InvOutletPOMaster invOutletPoMaster = _db.InvOutletPOMasters.Find(aObj.OutletPOMasterId);
                            //invOutletPoMaster.ModifiedDate = aDate;
                            //invOutletPoMaster.Status = aObj.Status;
                            //invOutletPoMaster.IsActive = false;
                            //_db.InvOutletPOMasters.Attach(invOutletPoMaster);
                            //_db.Entry(invOutletPoMaster).State = EntityState.Modified;
                            //_db.SaveChanges();

                            transaction.Commit();
                            return _aModel.Respons(true, "Successfully Deleted.");
                        }
                    }

                    else if (aObj.Status > 10)
                    {
                        DateTime aDate = DateTime.Now;

                        InvOutletPODetail invOutletPoDetail = _db.InvOutletPODetails.Find(aObj.OutletPODetailsId);
                        invOutletPoDetail.ModifiedDate = aDate;
                        invOutletPoDetail.Status = aObj.Status;
                        _db.InvOutletPODetails.Attach(invOutletPoDetail);
                        _db.Entry(invOutletPoDetail).State = EntityState.Modified;
                        _db.SaveChanges();

                        if (aObj.Status == 22)   /////////Here only 2 for master table status change and 22 for detail table.
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved a Single Product.");
                        }
                        else if (aObj.Status == 22)    ///////////Here only 2 for master table status change and 22 for detail table.
                        {
                            transaction.Commit();
                            return _aModel.Respons(true, " Successfully Approved All Product.");
                        }
                        else if (aObj.Status == 44)
                        {
                            var data = (from m in _db.InvOutletPOMasters
                                        join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
                                        where m.OutletPOMasterId == aObj.OutletPOMasterId
                                        select
                                        new
                                        {
                                            m.WarehouseId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                            m.OutletId
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()

                                {
                                    ProductId = p.ProductId,
                                    OutletId = p.OutletId,
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

        public ResponseModel ChangeStockValue(InvOutletPOMaster aObj)
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
                            var data = (from m in _db.InvOutletPOMasters
                                        join d in _db.InvOutletPODetails on m.OutletPOMasterId equals d.OutletPOMasterId
                                        where m.OutletPOMasterId == aObj.OutletPOMasterId
                                        select
                                        new
                                        {
                                            m.OutletId,
                                            d.ProductId,
                                            d.ProductQuantity,
                                        }).ToList();
                            foreach (var p in data)
                            {
                                InvOutletStock aStock = new InvOutletStock()
                                {
                                    ProductId = p.ProductId,
                                    OutletId = p.OutletId,
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

        //public ResponseModel ChangeStatusValue(InvWarehousePODetail aObj)
        //{
        //    //// var invOutletPoMaster = _aRepository.SelectAll();//efficint if write query written heare and select only matched to master Id
        //    //var invOutletPoDetails = _db.InvOutletPODetails;
        //    //var invProduct = _db.InvProducts;
        //    //var invProductPrice = _db.InvProductPrices;
        //    //var TotalPrice = _db.InvProductPrices;

        //    try
        //    {
        //        if ((aObj.Status != null) )
        //        {
        //            DateTime aDate = DateTime.Now;
        //            InvOutletPOMaster invOutletPoMaster = _db.InvOutletPOMasters.Find(aObj.OutletPOMasterId);
        //            invOutletPoMaster.ModifiedDate = aDate;
        //            invOutletPoMaster.Status = aObj.Status;
        //            _db.InvOutletPOMasters.Attach(invOutletPoMaster);
        //            _db.Entry(invOutletPoMaster).State = EntityState.Modified;
        //            _db.SaveChanges();
        //            if (aObj.Status == 2)
        //            {
        //                return _aModel.Respons(true, "Approved All  Successfully");
        //            }

        //            else if (aObj.Status == 3)
        //            {
        //                return _aModel.Respons(true, "Sent to Outlet Successfully");
        //            }
        //            else if (aObj.Status == 4)
        //            {
        //                return _aModel.Respons(true, "Received  Successfully");
        //            }
        //        }

        //        //else if ((aObj.Status != null) && (aObj.OutletPODetailsId >0 ) )
        //        //{
        //        //    DateTime aDate = DateTime.Now;
        //        //    InvOutletPODetail invOutletPoDetail = _db.InvOutletPODetails.Find(aObj.OutletPODetailsId);
        //        //    invOutletPoDetail.ModifiedDate = aDate;
        //        //    invOutletPoDetail.Status = aObj.Status;
        //        //    _db.InvOutletPODetails.Attach(invOutletPoDetail);
        //        //    _db.Entry(invOutletPoDetail).State = EntityState.Modified;
        //        //    _db.SaveChanges();
        //        //    return _aModel.Respons(true, "Approved Individual Successfully");
        //        //}
        //        return _aModel.Respons(false, "Failed to Approve,Receive or Sent to Outlet");
        //    }
        //    catch (Exception e)
        //    {
        //        return _aModel.Respons(false, "Sorry! Some  Error Happned");
        //    }
        //}







        //public ResponseModel ChangeStockValue(InvWarehousePOMaster aObj)
        //{
        //    using (var transaction = _db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            if (aObj.Status != null)
        //            {
        //                DateTime aDate = DateTime.Now;
        //                ////InvWarehousePOMaster invWarehousePoMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
        //                //invWarehousePoMaster.ModifiedDate = aDate;
        //                //invWarehousePoMaster.Status = aObj.Status;
        //                //_db.InvWarehousePOMasters.Attach(invWarehousePoMaster);
        //                //_db.Entry(invWarehousePoMaster).State = EntityState.Modified;
        //                //_db.SaveChanges();

        //                if (aObj.Status == 2)
        //                {
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Approved All  Successfully");
        //                }
        //                else if (aObj.Status == 3)
        //                {
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Sent Successfully");
        //                }
        //                else if (aObj.Status == 4)
        //                {
        //                    var data = (from m in _db.InvWarehousePOMasters
        //                                join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
        //                                where m.WarehousePOMasterId == aObj.WarehousePOMasterId
        //                                select
        //                                new
        //                                {
        //                                    m.WarehouseId,
        //                                    d.ProductId,
        //                                    d.ProductQuantity,
        //                                }).ToList();
        //                    foreach (var p in data)
        //                    {
        //                        InvWarehouseStock aStock = new InvWarehouseStock()
        //                        {
        //                            ProductId = p.ProductId,
        //                            WarehouseId = p.WarehouseId,
        //                            InOut = 1,
        //                            WarehouseStockQuantity = p.ProductQuantity,
        //                            CreatedDate = DateTime.Now
        //                        };
        //                        _db.InvWarehouseStocks.Add(aStock);
        //                        _db.SaveChanges();
        //                    }
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Received  Successfully");
        //                }
        //            }
        //            transaction.Commit();
        //            return _aModel.Respons(false, "Failed to Update Status");
        //        }
        //        catch (Exception e)
        //        {
        //            transaction.Rollback();
        //            return _aModel.Respons(false, "Sorry! Some  Error Happned");
        //        }
        //    }

        //}





        //public ResponseModel ChangeStockValue(InvWarehousePOMaster aObj)
        //{
        //    using (var transaction = _db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            if (aObj.Status != null)
        //            {
        //                DateTime aDate = DateTime.Now;
        //                ////InvWarehousePOMaster invWarehousePoMaster = _db.InvWarehousePOMasters.Find(aObj.WarehousePOMasterId);
        //                //invWarehousePoMaster.ModifiedDate = aDate;
        //                //invWarehousePoMaster.Status = aObj.Status;
        //                //_db.InvWarehousePOMasters.Attach(invWarehousePoMaster);
        //                //_db.Entry(invWarehousePoMaster).State = EntityState.Modified;
        //                //_db.SaveChanges();

        //                if (aObj.Status == 2)
        //                {
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Approved All  Successfully");
        //                }
        //                else if (aObj.Status == 3)
        //                {
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Sent Successfully");
        //                }
        //                else if (aObj.Status == 4)
        //                {
        //                    var data = (from m in _db.InvWarehousePOMasters
        //                                join d in _db.InvWarehousePODetails on m.WarehousePOMasterId equals d.WarehousePOMasterId
        //                                where m.WarehousePOMasterId == aObj.WarehousePOMasterId
        //                                select
        //                                new
        //                                {
        //                                    m.WarehouseId,
        //                                    d.ProductId,
        //                                    d.ProductQuantity,
        //                                }).ToList();
        //                    foreach (var p in data)
        //                    {
        //                        InvWarehouseStock aStock = new InvWarehouseStock()
        //                        {
        //                            ProductId = p.ProductId,
        //                            WarehouseId = p.WarehouseId,
        //                            InOut = 1,
        //                            WarehouseStockQuantity = p.ProductQuantity,
        //                            CreatedDate = DateTime.Now
        //                        };
        //                        _db.InvWarehouseStocks.Add(aStock);
        //                        _db.SaveChanges();
        //                    }
        //                    transaction.Commit();
        //                    return _aModel.Respons(true, "Received  Successfully");
        //                }
        //            }
        //            transaction.Commit();
        //            return _aModel.Respons(false, "Failed to Update Status");
        //        }
        //        catch (Exception e)
        //        {
        //            transaction.Rollback();
        //            return _aModel.Respons(false, "Sorry! Some  Error Happned");
        //        }
        //    }

        //}
    }
}

