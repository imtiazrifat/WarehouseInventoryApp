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
    public class CityManager : ICityManager
    {
        private IGenericRepository<InvCityList> _aRepository;
        private ResponseModel _aModel;

        public CityManager()
        {
            _aRepository = new GenericRepositoryInv<InvCityList>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateCity(InvCityList aObj)
        {
            try
            {

                if (aObj.CityId ==0)
                {

                    //aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New City Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "City Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllCity()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }

        
    }
}
