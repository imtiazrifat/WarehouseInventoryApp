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
    public class PackageDetailsManager : IPackageDetailsManager
    {
        //private IGenericRepository<InvPackageDetails> _aRepository;
        private ResponseModel _aModel;

        public PackageDetailsManager()
        {
            //_aRepository = new GenericRepositoryInv<InvPackageDetails>();
            _aModel = new ResponseModel();
        }

        //public ResponseModel CreatePackageDetails(InvPackageDetails aObj)
        //{
        //    try
        //    {

        //        if (aObj.PackageDetailsId == 0)
        //        {

        //            aObj.CreatedDate = DateTime.Now;
        //            _aRepository.Insert(aObj);
        //            _aRepository.Save();
        //            return _aModel.Respons(true, "New Package Details Successfully Saved");
        //        }
        //        else
        //        {
        //            _aRepository.Update(aObj);
        //            _aRepository.Save();
        //            return _aModel.Respons(true, "Package Details Successfully Updated");
        //        }

        //    }
        //    catch (Exception)
        //    {

        //        return _aModel.Respons(false, "Sorry! Some Error Happned.");
        //    }
        //}

        public ResponseModel CreatePackageDetails(InvPackageDetail aObj)
        {
            throw new NotImplementedException();
        }

        public ResponseModel GetAllPackageDetails()
        {
            //var data = _aRepository.SelectAll();
            //return _aModel.Respons(data);
            return null;

        }

        
    }
}
