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
    public class WareHouseManager: IWareHouseManager
    {
        private IGenericRepository<InvWarehouse> _aRepository;
        private ResponseModel _aModel;
        public WareHouseManager()
        {
            _aRepository = new GenericRepositoryInv<InvWarehouse>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateWareHouse(InvWarehouse aObj)
        {
            if (aObj.WarehouseId == 0)
            {
                aObj.CreatedDate = DateTime.Now;
                _aRepository.Insert(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "New Asset Details Successfully Saved");
            }
            else
            {
                _aRepository.Update(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "Asset Details Successfully Updated");
            }
        }

        public ResponseModel GetAllWarehouseNameForDd()
        {
            var data = _aRepository.SelectAll();
            var listB = data.Select(a => new
            {
                id = a.WarehouseId,
                text = a.WarehouseName
            });
            return _aModel.Respons(listB);
        }


        public ResponseModel GetAllWareHouse()
        {
            var allWareHouse = _aRepository.SelectAll();

            var data = from A in allWareHouse
                       select new
                       {
                           A.WarehouseId,
                           A.WarehouseCode,
                           A.WarehouseName,
                           A.WarehouseDetails,
                           A.WarehouseNumber,
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
