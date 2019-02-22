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
    public class AddressManager : IAddressManager
    {
        private IGenericRepository<InvAddress> _aRepository;
        private ResponseModel _aModel;

        public AddressManager()
        {
            _aRepository = new GenericRepositoryInv<InvAddress>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateAddress(InvAddress aObj)
        {
            try
            {

                if (aObj.AddressId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Address Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Address Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllAddress()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }


    }
}
