using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Mapping;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class ProductPurchaseManager : IProductPurchaseManager
    {
        private IGenericRepository<InvProductPurchase> _aRepository;
        //private IGenericRepository<InvItem> _aItemRepository;
        private IGenericRepository<InvProduct> _aProductRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        public ProductPurchaseManager()
        {
            _aRepository = new GenericRepositoryInv<InvProductPurchase>();

            _aProductRepository = new GenericRepositoryInv<InvProduct>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateProductPurchase(InvProductPurchase aObj)
        {
            try
            {

                if (aObj.ProductPurchaseId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New ProductPurchase Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "ProductPurchase Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllProductPurchaseData()
        {
            var invProductPurchase = _aRepository.SelectAll();
            // var invProductPrice = _aInvProductPriceRepository.SelectAll().Where(ppri => ppri.IsActive == true);
            var invFactory = _db.InvFactories;
            var invItem = _db.InvItems;
            var invSize = _db.InvSizes;
            var invUoM = _db.InvUoMs;
            var invColor = _db.InvColors;


            //To show Following info into  datatable of product view.

            var data = from ppur in invProductPurchase

                       join fac in invFactory on ppur.FactoryId equals fac.FactoryId
                       join it in invItem on ppur.ItemId equals it.ItemId
                       join sz in invSize on ppur.SizeId equals sz.SizeId
                       join um in invUoM on ppur.UoMId equals um.UoMId
                       join clr in invColor on ppur.ColorId equals clr.ColorId


                       select new
                       {

                           ppur.ProductPurchaseId,
                           ppur.ProductCode,
                           ppur.ProductName,
                           ppur.ProductMainBarcode,
                           ppur.ProductFactoryBarcode,
                           ppur.MinimumStock,
                           ppur.CurrentStock,
                           ppur.NewStock,
                           ppur.PurchaseQuantity,
                           ppur.IsActive,


                           ppur.CostPrice,
                           ppur.WholeSalePrice,
                           ppur.RetailPrice,


                           fac.FactoryId,
                           fac.FactoryName,


                           it.ItemId,
                           it.ItemName,

                           sz.SizeId,
                           sz.SizeName,

                           um.UoMId,
                           um.UoMShortName,

                           clr.ColorId,
                           clr.ColorName,

                       };

            var ass = data.ToList();
            return _aModel.Respons(ass);

        }


       

       
    }
}
