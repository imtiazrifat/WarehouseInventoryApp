using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Manager.Manager.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class WarrentyPeriodManager : IWarrentyPeriodManager
    {
        private ResponseModel _aModel;
        private IGenericRepository<InvWarrentyPeriod> _aRepository;

        public WarrentyPeriodManager()
        {
            _aModel = new ResponseModel();
            _aRepository = new GenericRepositoryInv<InvWarrentyPeriod>();
        }

        public ResponseModel CreateWarrentyPeriod(InvWarrentyPeriod aObj)
        {
            if (aObj.WarrentyPeriodId == 0)
            {
                aObj.CreatedDate = DateTime.Now;
                _aRepository.Insert(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, "New Warrenty period Details Successfully Saved");
            }
            else
            {
                _aRepository.Update(aObj);
                _aRepository.Save();
                return _aModel.Respons(true, " Warrenty period Successfully Updated");
            }
        }


        public ResponseModel GetAllWarrentyPeriod()
        {
            var allInvWarrentyPeriod = _aRepository.SelectAll();


            var data = from A in allInvWarrentyPeriod


                select new
                {
                    A.WarrentyPeriodId,
                    A.WarrentyName,
                    A.WarrentyDays,
                    A.WarrentyDetails

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
