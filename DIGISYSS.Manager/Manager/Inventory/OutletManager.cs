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
    public class OutletManager : IOutletManager
    {
        private IGenericRepository<InvOutlet> _aRepository;
        private ResponseModel _aModel;

        public OutletManager()
        {
            _aRepository = new GenericRepositoryInv<InvOutlet>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateOutlet(InvOutlet aObj)
        {
            try
            {
                if (aObj.OutletId == 0)
                {
                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Outlet Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Outlet Successfully Updated");
                }
            }
            catch (Exception)
            {
                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllOutlet()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);
        }
        public ResponseModel GetAllOutletDropDownData()
        {
            var data = _aRepository.SelectAll();

            var listB = data.Select(a => new
            {
                id = a.OutletId,
                text = a.OutletName
            });
            return _aModel.Respons(listB);
        }
    }
}
