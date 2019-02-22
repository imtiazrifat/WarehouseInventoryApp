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
   public  class ProductWarrentyManager: IProductWarrentyManager
   {
       private ResponseModel _aModel;
       private IGenericRepository<InvProductWarrenty> _aRepository;

       public ProductWarrentyManager()
       {
           _aModel=new ResponseModel();
           _aRepository =new GenericRepositoryInv<InvProductWarrenty>();
       }

       public ResponseModel CreateProductWarrenty(InvProductWarrenty aObj)
       {
            if (aObj.ProductWarrentyId == 0)
            {
                aObj.CreatedDate = DateTime.Now;
                _aRepository.Insert(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "New Product Warrenty Details Successfully Saved");
            }
            else
            {
                _aRepository.Update(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "Product Warrenty Details Successfully Updated");
            }
        }

        public ResponseModel GetAllProductWarrenty()
        {
            var allInvProductWarrenty = _aRepository.SelectAll();


            var data = from A in allInvProductWarrenty


                       select new
                       {
                           A.ProductWarrentyId,
                           A.ProductId,
                           A.IsReplacementWarrenty,
                           A.WarrentyPeriodId,
                           A.WarrentyExpireDate,
                           A.ServicePeriod,
                           A.WarrentyDescription,
                           A.Ex1,

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
