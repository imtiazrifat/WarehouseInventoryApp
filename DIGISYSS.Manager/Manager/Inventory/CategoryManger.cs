using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class CategoryManger: ICategoryManager
    {
        private IGenericRepository<InvCategory> _aRepository;
        private ResponseModel _aModel;
        public CategoryManger()
        {
            _aRepository = new GenericRepositoryInv<InvCategory>();
            _aModel = new ResponseModel();
        }

       
        public ResponseModel CreateCategory(InvCategory aObj)
        {
            if (aObj.CategoryId == 0)
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

        public ResponseModel GetAllCategory()
        {
            var allInvCategory = _aRepository.SelectAll();
            

            var data = from A in allInvCategory


                       select new
                       {
                           A.CategoryId,
                           A.CategoryCode,
                           A.CategoryName,
                           A.CategoryDetails,
                           //A.CreatedBy,
                           //A.CreationDate,
                           //A.ModifyBy,
                           //A.ModifyDate,
                           //A.IsActive,
                           //A.IsDeleted,
                           //HAC.AssetCategoryName
                       };

            return _aModel.Respons(data);
        }


    }
}
