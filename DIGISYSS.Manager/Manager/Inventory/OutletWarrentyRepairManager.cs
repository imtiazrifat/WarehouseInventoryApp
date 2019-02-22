using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class OutletWarrentyRepairManager : IOutletWarrentyRepairManager
    {
        private IGenericRepository<InvOutletWarrentyRepair> _aRepository;
        private IGenericRepository<InvOutlet> _aInvOutletRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        private TopInvoiceNo _invoiceNo;

        public OutletWarrentyRepairManager()
        {
            _aRepository = new GenericRepositoryInv<InvOutletWarrentyRepair>();
            _aInvOutletRepository = new GenericRepositoryInv<InvOutlet>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _invoiceNo = new TopInvoiceNo();
        }
        
        public ResponseModel CreateOutletWarrentyRepair(InvOutletWarrentyRepair aObj)
        {
            try
            {

                if (aObj.OutletWarrentyRepairId == 0)
                {
                    aObj.CreatedDate = DateTime.Now;

                    aObj.RepairTokenNo = (_invoiceNo.GetNewInvoiceNo());
                    aObj.Note = "RepairRequest";
                    aObj.IsActive = true;
                    aObj.IsReceived = true;
                    aObj.IsRepaired = false;
                    aObj.IsReturned = 1;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Repair request successfully saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Outlet Warrenty Repair Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }
        public ResponseModel SaveOutletWarrentyDataFromWarehouse(InvOutletWarrentyRepair aObj)
        {
            try
            {
                var invOultletWarrentyRepair = _db.InvOutletWarrentyRepairs.Find(aObj.OutletWarrentyRepairId);
                
                invOultletWarrentyRepair.ModifiedDate = DateTime.Now;
                
                if (aObj.OutletWarrentyRepairId >0)
                {
                    //aObj.ModifiedDate = DateTime.Now;

                    invOultletWarrentyRepair.Problem = aObj.Problem;
                    invOultletWarrentyRepair.ReturnDate = aObj.ReturnDate;
                    invOultletWarrentyRepair.RepairCost = aObj.RepairCost;
                    invOultletWarrentyRepair.Note = aObj.Note;
                    invOultletWarrentyRepair.RepairStatus = aObj.RepairStatus;
              
                    _db.InvOutletWarrentyRepairs.Attach(invOultletWarrentyRepair);
                    _db.Entry(invOultletWarrentyRepair).State = EntityState.Modified;
                    _db.SaveChanges();

                    return _aModel.Respons(true, "Outlet warrenty data  successfully added");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Outlet warrenty data  successfully added.");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }
        public ResponseModel GetAllOutletWarrentyRepairRequest()
        {

            var invOutletWarrentyRepair = _aRepository.SelectAll();
            var invOutlet = _db.InvOutlets.ToList();
            var invWarehouse = _db.InvWarehouses;

            var data = (from outletWarrentyRepair in invOutletWarrentyRepair
                            // join warehouse in _db.InvWarehouses on outletWarrentyRepair.WarehouseId equals warehouse.WarehouseId
                        join outlet in invOutlet on outletWarrentyRepair.OutletId equals outlet.OutletId
                        join product in _db.InvProducts on outletWarrentyRepair.ProductId equals product.ProductId

                        where outletWarrentyRepair.IsActive == true
                        select new
                        {
                            outletWarrentyRepair.OutletWarrentyRepairId,
                            outletWarrentyRepair.RepairTokenNo,
                            outletWarrentyRepair.OutletSaleInvoiceNo,
                            //outletWarrentyRepair.OutletPOInvoiceNo,
                            outletWarrentyRepair.OutletInvoiceDetailsId,
                            outletWarrentyRepair.Problem,
                            outletWarrentyRepair.ProductQuantity,
                            outletWarrentyRepair.RepairCost,
                            outletWarrentyRepair.PurchaseDate,
                            outletWarrentyRepair.EstimatedReturnDate,
                            outletWarrentyRepair.ReturnDate,
                            outletWarrentyRepair.RepairStatus,
                            outletWarrentyRepair.WarrentyType,
                            outletWarrentyRepair.Note,


                            BuyDate = outletWarrentyRepair.CreatedDate,
                            outletWarrentyRepair.CreatedDate,
                            outletWarrentyRepair.Status,
                            outletWarrentyRepair.IsActive,

                            outletWarrentyRepair.IsEdited,
                            outletWarrentyRepair.ModifiedDate,
                            outletWarrentyRepair.IsReturned,
                            outletWarrentyRepair.IsRepaired,
                            outletWarrentyRepair.IsReceived,

                            outlet.OutletId,
                            outlet.OutletName,

                            product.ProductId,
                            product.ProductName,

                        }).ToList();
            var outletoutletWarrentyRepairer = data.ToList();
            return _aModel.Respons(outletoutletWarrentyRepairer);
        }
    }
}
