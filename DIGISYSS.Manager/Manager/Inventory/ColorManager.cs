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
    public class ColorManager : IColorManager
    {
        private IGenericRepository<InvColor> _aRepository;
        private ResponseModel _aModel;

        public ColorManager()
        {
            _aRepository = new GenericRepositoryInv<InvColor>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateColor(InvColor aObj)
        {
            try
            {

                if (aObj.ColorId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Color Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Color Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllColor()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }
        public ResponseModel GetAllColorDropDownData()
        {
            var data = _aRepository.SelectAll();

            var listB = data.Select(a => new
            {
                id = a.ColorId,
                text = a.ColorName

            });

            return _aModel.Respons(listB);
        }


    }
}
