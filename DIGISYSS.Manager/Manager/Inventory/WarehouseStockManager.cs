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
    public class WarehouseStockManager : IWarehouseStockManager
    {
        private IGenericRepository<InvWarehouseStock> _aRepository;
        private IGenericRepository<InvWarehouse> _aInvWarehouseRepository;
        private IGenericRepository<InvWarehousePODetail> _aInvWarehousePODetailsRepository;
        private IGenericRepository<InvProduct> _aInvProductRepository;
        private RetailSalesManagementEntities _db;
        private ResponseModel _aModel;


        public WarehouseStockManager()
        {
            _db = new RetailSalesManagementEntities();
            _aRepository = new GenericRepositoryInv<InvWarehouseStock>();
            _aInvProductRepository = new GenericRepositoryInv<InvProduct>();
            _aInvWarehouseRepository = new GenericRepositoryInv<InvWarehouse>();
            _aInvWarehousePODetailsRepository = new GenericRepositoryInv<InvWarehousePODetail>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateWarehouseStock(InvWarehouseStock aObj)
        {
            try
            {
                if (aObj.WarehouseStockId == 0)
                {
                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Warehouse Stock Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Warehouse Stock Successfully Updated");
                }
            }
            catch (Exception)
            {
                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        //public ResponseModel GetAllWarehouseStock()
        //{

        //    var invWarehouseStock = _aRepository.SelectAll();
        //    var invWarehouse = _db.InvWarehouses;
        //    var invProduct = _db.InvProducts;

        //    var data = (from warehouseStock in invWarehouseStock
        //                join product in invProduct on warehouseStock.ProductId equals product.ProductId
        //                join warehouse in invWarehouse on warehouseStock.WarehouseId equals warehouse.WarehouseId

        //                select new
        //                {
        //                    warehouseStock.WarehouseStockId,
        //                    //warehouseStock.WarehouseStockQuantity,
        //                    warehouseStock.InOut,

        //                    product.ProductId,
        //                    product.ProductName,

        //                    ApplyDate = warehouseStock.CreatedDate,
        //                    warehouseStock.CreatedDate,
        //                    warehouseStock.Status,
        //                    warehouseStock.IsActive,

        //                    warehouse.WarehouseId,
        //                    warehouse.WarehouseName,
        //                    WarehouseStockQuantity = invWarehouseStock.Where(m => m.WarehouseStockId == warehouseStock.WarehouseStockId).Select(m => m.WarehouseStockQuantity).Sum(),

        //                }).ToList();
        //    var warehouseStokData = data.ToList();
        //    return _aModel.Respons(warehouseStokData);
        //}

        public ResponseModel GetAllWarehouseStock()
        {
            //according to Outlet Stock Manager
            var allProduct = _aRepository.SelectAll().Where(a => a.WarehouseId == 1).ToList();

            var invWarehouseStock = allProduct.GroupBy(l => l.ProductId).Select(cl => new
            {
                WarehouseStockId = cl.First().WarehouseId,
                ProductId = cl.First().ProductId,
                WarehouseId = cl.First().WarehouseId,
                CurrentQuantity = (allProduct.Where(m => m.ProductId == cl.First().ProductId && m.InOut == 1).Select(w => w.WarehouseStockQuantity).Sum() -
                allProduct.Where(m => m.ProductId == cl.First().ProductId && m.InOut == 2).Select(w => w.WarehouseStockQuantity).Sum())
            });

            var invWarehouse = _db.InvWarehouses;
            var invProduct = _db.InvProducts;

            var data = (from WarehouseStock in invWarehouseStock
                        join product in invProduct on WarehouseStock.ProductId equals product.ProductId
                        join warehouse in invWarehouse on WarehouseStock.WarehouseId equals warehouse.WarehouseId

                        select new
                        {
                            WarehouseStock.WarehouseStockId,

                            product.ProductId,
                            product.ProductName,
                            warehouse.WarehouseId,
                            warehouse.WarehouseName,
                            WarehouseStockQuantity = WarehouseStock.CurrentQuantity

                        }).ToList();
            return _aModel.Respons(data);
        }
    }
}
