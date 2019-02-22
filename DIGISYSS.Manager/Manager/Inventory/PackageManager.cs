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
    public class PackageManager : IPackageManager
    {
        private IGenericRepository<InvPackageMaster> _aRepository;
        private IGenericRepository<InvPackageDetail> _aInvPackageDetailsRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public PackageManager()
        {
            _aRepository = new GenericRepositoryInv<InvPackageMaster>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvPackageDetailsRepository = new GenericRepositoryInv<InvPackageDetail>();
        }
        public ResponseModel CreatePackageDetails(PackageDetailsViewModel packageData, List<ProductPackageVM> productList)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;

                    InvPackageMaster aPackageMaster = new InvPackageMaster()
                    {
                        PackageMasterId = packageData.PackageMasterId,
                        PackageName = packageData.PackageName,
                        CreatedDate = aDate,
                        IsActive = true,
                        IsDeleted = false,
                        
                    };
                    _db.InvPackageMasters.Add(aPackageMaster);
                    _db.SaveChanges();

                    foreach (var aData in productList)
                    {
                        InvPackageDetail aPackageDetails = new InvPackageDetail()
                        {
                            PackageMasterId = aPackageMaster.PackageMasterId,
                            ProductId = aData.ProductId,
                            ProductQuantity = aData.ProductQuantity,
                            IsActive = true,
                            IsDeleted = false,
                            CreatedDate = aDate,
                        };
                        _db.InvPackageDetails.Add(aPackageDetails);
                    }
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "New Package Successfully Saved");
                }
                catch (Exception)
                {
                    _db.SaveChanges();
                    transaction.Commit();
                    return _aModel.Respons(true, "Failed to  Save New Package");
                }
            }

        }

        public ResponseModel GetAllPackageData()
        {
            var invPackageMaster = _aRepository.SelectAll();
            var invPackageDetails = _db.InvPackageDetails;



            var data = from pkagMast in invPackageMaster
                            join pkgDetls in invPackageDetails on pkagMast.PackageMasterId equals pkgDetls.PackageMasterId

                       select new
                       {
                           pkagMast.PackageMasterId,
                           pkagMast.PackageCode,
                           pkagMast.PackageName,
                           pkagMast.IsActive,
                           //sumQuantity = invPackageDetails.Where(m => m.PackageMasterId == pkagMast.PackageMasterId).Select(m => m.ProductQuantity).Sum(),
                           pkgDetls.PackageDetailsId,
                           pkgDetls.ProductId,
                           pkgDetls.ProductQuantity,
                       };
            var pkgMasterAndDetails = data.ToList();
            return _aModel.Respons(pkgMasterAndDetails);
        }
    }
}

