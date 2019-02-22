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
    public class SizeManager : ISizeManager
    {
        private IGenericRepository<InvSize> _aRepository;
        private ResponseModel _aModel;

        public SizeManager()
        {
            _aRepository = new GenericRepositoryInv<InvSize>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateSize(InvSize aObj)
        {
            try
            {

                if (aObj.SizeId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Size Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Size Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllSize()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }
        public ResponseModel GetAllSizeDropDownData()
        {
            var data = _aRepository.SelectAll();

            var listB = data.Select(a => new
            {
                id = a.SizeId,
                text = a.SizeName

            });

            return _aModel.Respons(listB);
        }


    }
}
