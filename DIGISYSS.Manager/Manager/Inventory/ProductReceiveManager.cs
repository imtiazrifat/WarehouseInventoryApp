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
    public class ProductReceiveManager : IProductReceiveManager
    {
        private IGenericRepository<InvProductReceive> _aRepository;
        //private IGenericRepository<InvItem> _aItemRepository;
        private IGenericRepository<InvProduct> _aProductRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        public ProductReceiveManager()
        {
            _aRepository = new GenericRepositoryInv<InvProductReceive>();

            _aProductRepository = new GenericRepositoryInv<InvProduct>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aModel = new ResponseModel();
        }

        public ResponseModel CreateProductReceive(InvProductReceive aObj)
        {
            try
            {

                if (aObj.ProductReceiveId == 0)
                {

                    aObj.CreatedDate = DateTime.Now;
                    _aRepository.Insert(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "New ProductReceive Successfully Saved");
                }
                else
                {
                    _aRepository.Update(aObj);
                    _aRepository.Save();
                    return _aModel.Respons(true, "ProductReceive Successfully Updated");
                }

            }
            catch (Exception)
            {

                return _aModel.Respons(false, "Sorry! Some Error Happned.");
            }
        }

        public ResponseModel GetAllProductReceiveData()
        {
            var invProductReceive = _aRepository.SelectAll();
           // var invProductPrice = _aInvProductPriceRepository.SelectAll().Where(ppri => ppri.IsActive == true);
            var invFactory = _db.InvFactories;
            var invItem = _db.InvItems;
            var invSize = _db.InvSizes;
            var invUoM = _db.InvUoMs;
            var invColor = _db.InvColors;


            //To show Following info into  datatable of product view.

            var data = from prece in invProductReceive
                       
                       join fac in invFactory on prece.FactoryId equals fac.FactoryId
                       join it in invItem on prece.ItemId equals it.ItemId
                       join sz in invSize on prece.SizeId equals sz.SizeId
                       join um in invUoM on prece.UoMId equals um.UoMId
                       join clr in invColor on prece.ColorId equals clr.ColorId


                       select new
                       {

                           prece.ProductReceiveId,
                           prece.ProductCode,
                           prece.ProductReceiveDate,
                           prece.ProductName,
                           prece.ProductMainBarcode,
                           prece.ProductFactoryBarcode,
                           prece.MinimumStock,
                           prece.CurrentStock,
                           prece.NewStock,
                           prece.PurchaseQuantity,
                           prece.IsActive,

                           
                           prece.CostPrice,
                           prece.WholeSalePrice,
                           prece.RetailPrice,


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


        public ResponseModel LoadAllProductDd(int itemId)
        {

            var allProduct= _aProductRepository.SelectAll();








            //if (factoryId != 0)
            //{
            //    var query = from pro in allProduct.Where(aa => aa.FactoryId == factoryId)
            //                select new  { id = pro.ProductId, text = pro.ProductName };
            //    //var data = allProduct.Where(aa => aa.UoMId == uoMId).new
            //    //{
            //    //    id = aa.ProductCode,
            //    //    text = pro.ProductName
            //    //}; ;
            //  //  var aaa = query.ToList();
            //    return _aModel.Respons(query);
            //}

           if (itemId != 0)
            {
                var query = from pro in allProduct.Where(aa => aa.ItemId == itemId)
                            select new { id = pro.ProductId, text = pro.ProductName };
                //var data = allProduct.Where(aa => aa.UoMId == uoMId).new
                //{
                //    id = aa.ProductCode,
                //    text = pro.ProductName
                //}; ;
                //  var aaa = query.ToList();
                return _aModel.Respons(query);
            }



            //else if (uoMId != 0)
            //{
            //    var query = from pro in allProduct.Where(aa => aa.UoMId == uoMId)
            //                select new { id = pro.ProductId, text = pro.ProductName };
            //    //var data = allProduct.Where(aa => aa.UoMId == uoMId).new
            //    //{
            //    //    id = aa.ProductCode,
            //    //    text = pro.ProductName
            //    //}; ;
            //    //  var aaa = query.ToList();
            //    return _aModel.Respons(query);
            //}

            //else if (sizeId != 0)
            //{
            //    var query = from pro in allProduct.Where(aa => aa.SizeId == sizeId)
            //                select new { id = pro.ProductId, text = pro.ProductName };
            //    //var data = allProduct.Where(aa => aa.UoMId == uoMId).new
            //    //{
            //    //    id = aa.ProductCode,
            //    //    text = pro.ProductName
            //    //}; ;
            //    //  var aaa = query.ToList();
            //    return _aModel.Respons(query);
            //}

            //if (colorId != 0)
            //{
            //    var query = from pro in allProduct.Where(aa => aa.ColorId == colorId)
            //                select new { id = pro.ProductId, text = pro.ProductName };
            //    //var data = allProduct.Where(aa => aa.UoMId == uoMId).new
            //    //{
            //    //    id = aa.ProductCode,
            //    //    text = pro.ProductName
            //    //}; ;
            //    //  var aaa = query.ToList();
            //    return _aModel.Respons(query);
            //}

            else
            {
                return _aModel.Respons("LoadAll ProductDd  Error Happned.");
            }

            //if ((uoMId == 0) && (sizeId == 0) && (colorId == 0))
            //{
            //    var data = from itm in _aItemRepository.SelectAll()
            //               join pro in _aProductRepository.SelectAll()
            //               on itm.ItemId equals pro.ItemId
            //               where itm.ItemId == itemId
            //               select new
            //               {
            //                   id = pro.ProductCode,
            //                   text = pro.ProductName
            //               };
            //    return _aModel.Respons(data);
            //}



            //else if ((uoMId == 0) && (sizeId == 0))
            //{
            //    var data = from itm in _aItemRepository.SelectAll()
            //               join pro in _aProductRepository.SelectAll()
            //               on itm.ItemId equals pro.ItemId
            //               where itm.ItemId == itemId
            //               select new
            //               {
            //                   id = pro.ProductCode,
            //                   text = pro.ProductName
            //               };
            //    return _aModel.Respons(data);
            //}



            //else if ((uoMId == 0) && (colorId == 0))
            //{
            //    var data = from itm in _aItemRepository.SelectAll()
            //               join pro in _aProductRepository.SelectAll()
            //               on itm.ItemId equals pro.ItemId
            //               where itm.ItemId == itemId
            //               select new
            //               {
            //                   id = pro.ProductCode,
            //                   text = pro.ProductName
            //               };
            //    return _aModel.Respons(data);
            //}

            //else if ((sizeId == 0) && (colorId == 0))
            //{
            //    var data = from itm in _aItemRepository.SelectAll()
            //               join pro in _aProductRepository.SelectAll()
            //                on itm.ItemId equals pro.ItemId
            //               where itm.ItemId == itemId
            //               select new
            //               {
            //                   id = pro.ProductCode,
            //                   text = pro.ProductName
            //               };
            //    return _aModel.Respons(data);
            //}


            //else
            //{
            //    return _aModel.Respons(false, "Sorry! Some Error Happned.");
            //}


        }


    }
}
