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
    public class WarehousePOViewManager : IWarehousePOViewManager
    {
       // private IGenericRepository<InvWarehousePOMaster> _aRepository;
       // private IGenericRepository<InvWarehousePODetail> _aInvWarehousePODetailsRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public WarehousePOViewManager()
        {
          //  _aRepository = new GenericRepositoryInv<InvWarehousePOMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            //_aInvWarehousePODetailsRepository = new GenericRepositoryInv<InvWarehousePODetail>();
        }
        public ResponseModel CreateWarehousePODetails()
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;
                    //InvWarehousePOMaster aOutletPoMaster = new InvWarehousePOMaster()
                    //{
                    //    WarehousePOMasterId = WarehousePOData.WarehousePOMasterId,
                    //    WarehouseName = WarehousePOData.WarehouseName,
                    //    Status = false,
                    //    CreatedDate = aDate,
                    //};

                    //if (WarehousePOData.WarehousePOMasterId == 0)
                    //{
                    //    _db.InvWarehousePOMasters.Add(aOutletPoMaster);
                    //    _db.SaveChanges();

                    //    foreach (var aData in productList)
                    //    {
                    //        InvWarehousePODetail aOutletPoDetails = new InvWarehousePODetail()
                    //        {
                    //            WarehousePOMasterId = aOutletPoMaster.WarehousePOMasterId,
                    //            ProductId = aData.ProductId,
                    //            ProductQuantity = aData.ProductQuantity,
                    //            CreatedDate = aDate,
                                
                    //        };
                    //        _db.InvWarehousePODetails.Add(aOutletPoDetails);
                    //    }
                    //    _db.SaveChanges();
                    //    transaction.Commit();
                    //    return _aModel.Respons(true, "New WarehousePO Successfully Saved");
                    //}

                    //else if (WarehousePOData.WarehousePOMasterId > 0)
                    //{
                    //    _db.InvWarehousePOMasters.Attach(aOutletPoMaster);
                    //    _db.Entry(aOutletPoMaster).State = EntityState.Modified;
                    //    _db.SaveChanges();

                    //    var invPoDetails = _db.InvWarehousePODetails.Find(WarehousePOData.WarehousePODetailsId);
                        
                    //    invPoDetails.IsActive = false;
                    //    invPoDetails.ModifiedDate = aDate;

                    //    _db.InvWarehousePODetails.Attach(invPoDetails);
                    //    _db.Entry(invPoDetails).State = EntityState.Modified;
                    //    _db.SaveChanges();

                    //    foreach (var aData in productList)
                    //    {
                    //        InvWarehousePODetail aOutletPoDetails = new InvWarehousePODetail()
                    //        {
                    //            WarehousePOMasterId = aOutletPoMaster.WarehousePOMasterId,
                    //            ProductId = aData.ProductId,
                    //            ProductQuantity = aData.ProductQuantity,
                    //            CreatedDate = aDate,
                    //        };
                    //        _db.InvWarehousePODetails.Add(aOutletPoDetails);
                    //        _db.SaveChanges();
                    //    }
                    //    transaction.Commit();
                    //    return _aModel.Respons(true, "Sorry WarehousePO Update Failed");
                    //}

                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Sorry WarehousePO Update Failed");
                }
                catch (Exception)
                {
                    _db.SaveChanges();
                    transaction.Rollback();
                    return _aModel.Respons(true, "Sorry Some Error Happned");
                }
            }

        }
        public ResponseModel GetAllWarehousePOData()
        {
            //var invOutletPoMaster = _aRepository.SelectAll();
            //var invOutletPoDetails = _db.InvWarehousePODetails;

            //var data = from pOMast in invOutletPoMaster
            //          //join pODetls in invOutletPoDetails on pOMast.WarehousePOMasterId equals pODetls.WarehousePOMasterId

            //           select new
            //           {
            //               pOMast.WarehousePOMasterId,
            //               //PoMast.WarehousePOCode,
            //               pOMast.WarehouseName,
            //               pOMast.Status,
            //               pOMast.IsActive,

            //               //pODetls.WarehousePODetailsId,
            //               //pODetls.ProductId,
            //               //pODetls.ProductQuantity,
            //               ProductQuantity = invOutletPoDetails.Where(m => m.WarehousePOMasterId == pOMast.WarehousePOMasterId).Select(m => m.ProductQuantity).Sum(),
            //           };
            //var outletPoMasterAndDetail = data.ToList();
            //return _aModel.Respons(outletPoMasterAndDetail);

            return null;
        }


    }
}

