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
    public class SupplierManager: ISupplierManager
    {
        private IGenericRepository<InvSupplier> _aRepository;
        private ResponseModel _aModel;
        public SupplierManager()
        {
            _aRepository = new GenericRepositoryInv<InvSupplier>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateSupplier(InvSupplier aObj)
        {
            if (aObj.SupplierId == 0)
            {
                aObj.CreatedDate = DateTime.Now;
                _aRepository.Insert(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "New Supplier Details Successfully Saved");
            }
            else
            {
                _aRepository.Update(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "Supplierr Details Successfully Updated");
            }
        }

        public ResponseModel GetAllSupplierNameForDd()
        {
            var data = _aRepository.SelectAll();
            var listB = data.Select(a => new
            {
                id = a.SupplierId,
                text = a.SupplierName
            });
            return _aModel.Respons(listB);
        }


        public ResponseModel GetAllSupplier()
        {
            var allSupplier = _aRepository.SelectAll();

            var data = from A in allSupplier
                       select new
                       {
                           A.SupplierId,
                           A.SupplierCode,
                           A.SupplierName,
                           A.SupplierDetails,
                           A.SupplierNumber,
                           A.AddressCode,
                           A.Ex1

                           //A.CreatedBy,
                           //A.CreationDate,
                           //A.ModifyBy,
                           //A.ModifyDate,
                           //A.IsActive,
                           //A.IsDeleted,
                           //HAC.AssetTaxName
                       };

            return _aModel.Respons(data);
        }
    }
}
