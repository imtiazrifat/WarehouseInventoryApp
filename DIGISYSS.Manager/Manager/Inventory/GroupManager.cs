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
    public class GroupManager : IGroupManager
    {
        private IGenericRepository<InvGroup> _aRepository;
        private ResponseModel _aModel;

        public GroupManager()
        {
            _aRepository = new GenericRepositoryInv<InvGroup>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateGroup(InvGroup aObj)
        {
            try
            {

                if (aObj.GroupId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Group Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Group Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllGroup()
        {
            var data = _aRepository.SelectAll();
           var listB = data.Select(a => new
            {
                id = a.GroupId,
                text = a.GroupName

            });

            return _aModel.Respons(data);

            //Get Drop Down list
            //  var data = _aRepository.SelectAll();
            //  // return _aModel.Respons(data);

            //  var listB = data.Select(a => new
            //  {
            //      id = a.GroupId,
            //      text = a.GroupName

            //  });
            ////  var assdad = listB.ToList();
            //  return _aModel.Respons(listB);

        }

        public ResponseModel GetAllGroupDropDownData()
        {
            var data = _aRepository.SelectAll();
           
            var listB = data.Select(a => new
            {
                id = a.GroupId,
                text = a.GroupName

            });
           
            return _aModel.Respons(listB);
        }
    }
}
