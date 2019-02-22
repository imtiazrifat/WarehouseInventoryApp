﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class DistrictManager : IDistrictManager
    {
        private IGenericRepository<InvDistrictList> _aRepository;
        private ResponseModel _aModel;

        public DistrictManager()
        {
            _aRepository = new GenericRepositoryInv<InvDistrictList>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateDistrict(InvDistrictList aObj)
        {
            try
            {

                if (aObj.DistrictId ==0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New District Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "District Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllDistrict()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }

        
    }
}
