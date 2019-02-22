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
    public class ProductPriceManager : IProductPriceManager
    {
        private IGenericRepository<InvProductPrice> _aRepository;
        private ResponseModel _aModel;

        public ProductPriceManager()
        {
            _aRepository = new GenericRepositoryInv<InvProductPrice>();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateProductPrice(InvProductPrice aObj)
        {
            try
            {

                if (aObj.ProductPriceId ==0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New ProductPrice Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "ProductPrice Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllProductPrice()
        {
            var data = _aRepository.SelectAll();
            return _aModel.Respons(data);

        }

        
    }
}
