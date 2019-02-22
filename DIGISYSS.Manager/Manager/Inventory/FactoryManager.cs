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
    public class FactoryManager : IFactoryManager
    {
        private IGenericRepository<InvFactory> _aRepository;
        private ResponseModel _aModel;

        public FactoryManager()
        {
            _aRepository = new GenericRepositoryInv<InvFactory>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateFactory(InvFactory aObj)
        {
            try
            {

                if (aObj.FactoryId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Factory Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Factory Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllFactory()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }
        public ResponseModel GetAllFactoryDropDownData()
        {
            var data = _aRepository.SelectAll();

            var listB = data.Select(a => new
            {
                id = a.FactoryId,
                text = a.FactoryName

            });

            return _aModel.Respons(listB);
        }


    }
}
