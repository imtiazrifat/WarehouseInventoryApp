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
    public class UoMManager : IUoMManager
    {
        private IGenericRepository<InvUoM> _aRepository;
        private ResponseModel _aModel;

        public UoMManager()
        {
            _aRepository = new GenericRepositoryInv<InvUoM>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateUoM(InvUoM aObj)
        {
            try
            {

                if (aObj.UoMId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New UoM Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "UoM Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllUoM()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }

        public ResponseModel GetAllUoMDropDownData()
        {
            var data = _aRepository.SelectAll();

            var listB = data.Select(a => new
            {
                id = a.UoMId,
                text = a.UoMShortName

            });

            return _aModel.Respons(listB);
        }


    }
}
