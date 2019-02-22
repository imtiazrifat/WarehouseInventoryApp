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
    


        public class TaxManger : ITaxManager
        {
            private IGenericRepository<InvTax> _aRepository;
            private ResponseModel _aModel;
            public TaxManger()
            {
                _aRepository = new GenericRepositoryInv<InvTax>();
                _aModel = new ResponseModel();
            }


            public ResponseModel CreateTax(InvTax aObj)
            {
                if (aObj.TaxId == 0)
                {
                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New Asset Details Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "Asset Details Successfully Updated");
                }
            }

            public ResponseModel GetAllTax()
            {
                var allInvTax = _aRepository.SelectAll();


                var data = from A in allInvTax


                           select new
                           {
                               A.TaxId,
                               A.TaxCode,
                               A.TaxName,
                               A.PercentAmount,
                               A.FixedAmount,

                               //A.CreatedBy,
                               //A.CreationDate,
                               //A.ModifyBy,
                               //A.ModifyDate,
                               //A.IsActive,
                               //A.IsDeleted,
                               //HAC.AssetTaxName
                           };

                return _aModel.Respons(data);
            }


        }
    }
