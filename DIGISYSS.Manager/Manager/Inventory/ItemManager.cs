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
    public class ItemManager : IItemManager
    {
        private IGenericRepository<InvItem> _aRepository;
        private ResponseModel _aModel;

        public ItemManager()
        {
            _aRepository = new GenericRepositoryInv<InvItem>();
            _aModel = new ResponseModel();
        }
        public ResponseModel CreateItem(InvItem aObj)
        {
            try
            {
                if (aObj.ItemId == 0)
                {
                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Item Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Item Successfully Updated");
                }
            }
            catch (Exception)
            {
                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllItem()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);
        }

        public ResponseModel GetAllItemDropDownData()
        {
            var data = _aRepository.SelectAll();
            var listB = data.Select(a => new
            {
                id = a.ItemId,
                text = a.ItemName
            });
            return _aModel.Respons(listB);
        }
    }
}
