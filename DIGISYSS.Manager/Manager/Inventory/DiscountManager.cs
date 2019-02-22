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
    public class DiscountManager : IDiscountManager
    {

        private IGenericRepository<InvDiscount> _aRepository;
        private ResponseModel _aModel;

        public DiscountManager()
        {
            _aRepository = new GenericRepositoryInv<InvDiscount>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateDiscount(InvDiscount aObj)
        {
            if (aObj.DiscountId == 0)
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

        public ResponseModel GetAllDiscount()
        {
            var allInvDiscount = _aRepository.SelectAll();


            var data = from A in allInvDiscount


                select new
                {
                    A.DiscountId,
                    A.DiscountCode,
                    A.DiscountName,
                    A.DiscountFixedAmount

                };
            return _aModel.Respons(data);
        }
    }
}
