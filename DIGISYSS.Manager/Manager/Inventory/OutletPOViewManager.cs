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
    public class OutletPOViewManager : IOutletPOViewManager
    {
      
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public OutletPOViewManager()
        {
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
        }
        public ResponseModel CreateOutletPOViewDetails()
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;
                    //InvOutletPOViewMaster aOutletPoMaster = new InvOutletPOViewMaster()
                    //{
                    //    OutletPOViewMasterId = OutletPOViewData.OutletPOViewMasterId,
                    //    WarehouseName = OutletPOViewData.WarehouseName,
                    //    Status = false,
                    //    CreatedDate = aDate,
                    //};

                    //if (OutletPOViewData.OutletPOViewMasterId == 0)
                    //{
                    //    _db.InvOutletPOViewMasters.Add(aOutletPoMaster);
                    //    _db.SaveChanges();

                    //    foreach (var aData in productList)
                    //    {
                    //        InvOutletPOViewDetail aOutletPoDetails = new InvOutletPOViewDetail()
                    //        {
                    //            OutletPOViewMasterId = aOutletPoMaster.OutletPOViewMasterId,
                    //            ProductId = aData.ProductId,
                    //            ProductQuantity = aData.ProductQuantity,
                    //            CreatedDate = aDate,
                                
                    //        };
                    //        _db.InvOutletPOViewDetails.Add(aOutletPoDetails);
                    //    }
                    //    _db.SaveChanges();
                    //    transaction.Commit();
                    //    return _aModel.Respons(true, "New OutletPOView Successfully Saved");
                    //}

                    //else if (OutletPOViewData.OutletPOViewMasterId > 0)
                    //{
                    //    _db.InvOutletPOViewMasters.Attach(aOutletPoMaster);
                    //    _db.Entry(aOutletPoMaster).State = EntityState.Modified;
                    //    _db.SaveChanges();

                    //    var invPoDetails = _db.InvOutletPOViewDetails.Find(OutletPOViewData.OutletPOViewDetailsId);
                        
                    //    invPoDetails.IsActive = false;
                    //    invPoDetails.ModifiedDate = aDate;

                    //    _db.InvOutletPOViewDetails.Attach(invPoDetails);
                    //    _db.Entry(invPoDetails).State = EntityState.Modified;
                    //    _db.SaveChanges();

                    //    foreach (var aData in productList)
                    //    {
                    //        InvOutletPOViewDetail aOutletPoDetails = new InvOutletPOViewDetail()
                    //        {
                    //            OutletPOViewMasterId = aOutletPoMaster.OutletPOViewMasterId,
                    //            ProductId = aData.ProductId,
                    //            ProductQuantity = aData.ProductQuantity,
                    //            CreatedDate = aDate,
                    //        };
                    //        _db.InvOutletPOViewDetails.Add(aOutletPoDetails);
                    //        _db.SaveChanges();
                    //    }
                    //    transaction.Commit();
                    //    return _aModel.Respons(true, "Sorry OutletPOView Update Failed");
                    //}

                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry OutletPOView Update Failed");
                }
                catch (Exception)
                {
                    _db.SaveChanges();
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }

        }
        public ResponseModel GetAllOutletPOViewData()
        {
            //var invOutletPoMaster = _aRepository.SelectAll();
            //var invOutletPoDetails = _db.InvOutletPOViewDetails;

            //var data = from pOMast in invOutletPoMaster
            //          //join pODetls in invOutletPoDetails on pOMast.OutletPOViewMasterId equals pODetls.OutletPOViewMasterId

            //           select new
            //           {
            //               pOMast.OutletPOViewMasterId,
            //               //PoMast.OutletPOViewCode,
            //               pOMast.WarehouseName,
            //               pOMast.Status,
            //               pOMast.IsActive,

            //               //pODetls.OutletPOViewDetailsId,
            //               //pODetls.ProductId,
            //               //pODetls.ProductQuantity,
            //               ProductQuantity = invOutletPoDetails.Where(m => m.OutletPOViewMasterId == pOMast.OutletPOViewMasterId).Select(m => m.ProductQuantity).Sum(),
            //           };
            //var outletPoMasterAndDetail = data.ToList();
            //return _aModel.Respons(outletPoMasterAndDetail);

            return null;
        }


    }
}

