using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class OutletStockManager : IOutletStockManager
    {
        private IGenericRepository<InvOutletStock> _aRepository;
        private IGenericRepository<InvWarehouse> _aInvWarehouseRepository;
        private IGenericRepository<InvWarehousePODetail> _aInvWarehousePODetailsRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private RetailSalesManagementEntities _db;
        private ResponseModel _aModel;


        public OutletStockManager()
        {
            _db = new RetailSalesManagementEntities();
            _aRepository = new GenericRepositoryInv<InvOutletStock>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvWarehouseRepository = new GenericRepositoryInv<InvWarehouse>();
            _aInvWarehousePODetailsRepository = new GenericRepositoryInv<InvWarehousePODetail>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateOutletStock(InvOutletStock aObj)
        {
            try
            {
                if (aObj.OutletStockId == 0)
                {
                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New  Stock Successfully Added to Outlet");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Outlet Stock Successfully Updated");
                }
            }
            catch (Exception)
            {
                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllOutletStock()
        {
            //we are taking that this user is for Outlet 1

            var allProduct = _aRepository.SelectAll().Where(a => a.OutletId == 1).ToList();

            var invOutletStock = allProduct.GroupBy(l => l.ProductId).Select(cl => new
            {
                OutletStockId = cl.First().OutletId,
                IsActive = cl.First().IsActive,
                ProductId = cl.First().ProductId,
                OutletId = cl.First().OutletId,
                CurrentQuantity = (allProduct.Where(m => m.ProductId == cl.First().ProductId && m.InOut == 1).Select(w => w.OutletStockQuantity).Sum() -
                allProduct.Where(m => m.ProductId == cl.First().ProductId && m.InOut == 2).Select(w => w.OutletStockQuantity).Sum())
            });

            //  var xxx = invOutletStock.ToList();

            var invOutlet = _db.InvOutlets;
            var invProduct = _db.InvProducts;

            var data = (from outletStock in invOutletStock
                        join product in invProduct on outletStock.ProductId equals product.ProductId
                        join outlet in invOutlet on outletStock.OutletId equals outlet.OutletId

                        select new
                        {
                            outletStock.OutletStockId,
                            //outletStock.OutletStockQuantity,
                            //outletStock.InOut,

                            product.ProductId,
                            product.ProductName,

                            // ApplyDate = OutletStock.CreatedDate,
                            // outletStock.CreatedDate,
                            // outletStock.Status,
                             outletStock.IsActive,

                            outlet.OutletId,
                            outlet.OutletName,
                            OutletStockQuantity = outletStock.CurrentQuantity
                        }).ToList();

            //var invOutletStock = _aRepository.SelectAll();
            //var invOutlet = _db.InvOutlets;
            //var invProduct = _db.InvProducts;
            //var data = (from OutletStock in invOutletStock
            //            join product in invProduct on OutletStock.ProductId equals product.ProductId
            //            join outlet in invOutlet on OutletStock.OutletId equals outlet.OutletId

            //            select new
            //            {
            //                OutletStock.OutletStockId,
            //                //OutletStock.OutletStockQuantity,
            //                OutletStock.InOut,

            //                product.ProductId,
            //                product.ProductName,

            //                ApplyDate = OutletStock.CreatedDate,
            //                OutletStock.CreatedDate,
            //                OutletStock.Status,
            //                OutletStock.IsActive,

            //                outlet.OutletId,
            //                outlet.OutletName,
            //                OutletStockQuantity =
            //                    invOutletStock.Where(m => m.OutletStockId == OutletStock.OutletStockId)
            //                        .Select(m => m.OutletStockQuantity)
            //                        .Sum(),
            //            }).ToList();

            return _aModel.Respons(data);
        }

        public ResponseModel GetStockQuantityOfAProduct(int productId)
        {
            var quantityIn = (from stock in _db.InvOutletStocks
                            where stock.ProductId == productId && stock.InOut == 1
                            select stock.OutletStockQuantity).Sum();
            var quantityOut = (from stock in _db.InvOutletStocks
                            where stock.ProductId == productId && stock.InOut == 2
                            select stock.OutletStockQuantity).Sum();

            if (quantityIn  == null){ quantityIn = 0;}
            if (quantityOut == null){quantityOut = 0;}

            var data = (from stock in _db.InvOutletStocks
                        where stock.ProductId == productId /*&& stock.InOut == 1*/
                        select new
                        {
                            OutletStockQuantity = quantityIn- quantityOut,
                        }).ToList();

            //var allProduct = _aRepository.SelectAll().Where(a => a.OutletId == 1).ToList();

            //var invOutletStock = allProduct.GroupBy(l => l.ProductId).Select(cl => new
            //{
            //    OutletStockId = cl.First().OutletId,
            //    ProductId = cl.First().ProductId,
            //    OutletId = cl.First().OutletId,
            //    CurrentQuantity = (allProduct.Where(m => m.ProductId == cl.First().ProductId && m.InOut == 1).Select(w => w.OutletStockQuantity).Sum() -
            //    allProduct.Where(m => m.ProductId == cl.First().ProductId && m.InOut == 2).Select(w => w.OutletStockQuantity).Sum())
            //});

            return _aModel.Respons(data);
        }
    }
}
