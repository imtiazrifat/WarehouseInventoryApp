//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using DIGISYSS.Entities;
//using DIGISYSS.Entities.ViewModel;
//using DIGISYSS.Manager.Interface.Inventory;
//using DIGISYSS.Repositories;

//namespace DIGISYSS.Manager.Manager.Inventory
//{
//    public class ProductManager : IProductManager
//    {
//        private IGenericRepository<InvProduct> _aRepository;
//        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;

//        private ResponseModel _aModel;
//        private RetailSalesManagementEntities _db;

//        public ProductManager()
//        {
//            _aRepository = new GenericRepositoryInv<InvProduct>();
//            _aModel = new ResponseModel();
//            _db = new RetailSalesManagementEntities();
//            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
//        }

//        public ResponseModel CreateProductDetails(ProductDetailsViewModel aObj)
//        {
//            using (var transaction = _db.Database.BeginTransaction())
//            {
//                try
//                {
//                    DateTime aDate = DateTime.Now;
//                    InvProduct aProduct = new InvProduct()
//                    {
//                        ProductId = aObj.ProductId,
//                        ProductCode = aObj.ProductCode,
//                        ProductName = aObj.ProductName,
//                        ProductMainBarCode = aObj.ProductMainBarCode,
//                        ProductFactoryBarCode = aObj.ProductFactoryBarCode,
//                        ItemId = aObj.ItemId,
//                        SizeId = aObj.SizeId,
//                        ColorId = aObj.ColorId,
//                        MinimumStock = aObj.MinimumStock,
//                        ProductFrontImage = aObj.ProductFrontImage,
//                        ProductBackImage = aObj.ProductBackImage,
//                        UoMId = aObj.UoMId,
//                        CreatedDate = aDate,
//                        IsActive = true,



//                    };
//                    InvProductPrice aProductPrice = new InvProductPrice()
//                    {
//                        ProductPriceId = aObj.ProductPriceId,
//                        ProductId = aProduct.ProductId,
//                        CostPrice = aObj.CostPrice,
//                        WholeSalePrice = aObj.WholeSalePrice,
//                        RetailPrice = aObj.RetailPrice,
//                        CreatedDate = aDate,
//                        IsActive = true

//                    };
//                    if (aObj.ProductId == 0)
//                    {




//                        _aRepository.Insert(aProduct);
//                        _aRepository.Save();
//                        //_db.InvProducts.Add(aProduct);
//                        //_db.SaveChanges();


//                        _aInvProductPriceRepository.Insert(aProductPrice);
//                        _aInvProductPriceRepository.Save();
//                        //_db.InvProductPrices.Add(aProductPrice);
//                        //_db.SaveChanges();
//                        transaction.Commit();
//                        return _aModel.Respons(true, "New Student Successfully Saved");

//                    }
//                    else
//                    {
//                        _aRepository.Update(aProduct);
//                        _aRepository.Save();
//                        _aInvProductPriceRepository.Update(aProductPrice);
//                        _aInvProductPriceRepository.Save();
//                        //aObj.CreatedDate = aDate;
//                        //_aRepository.Update(aProduct);
//                        //_aRepository.Save();
//                        return _aModel.Respons(true, "Student Successfully Updated");
//                    }
//                }
//                catch (Exception e)
//                {
//                    transaction.Rollback();
//                    return _aModel.Respons(false, "Sorry! Some Error Error Happned");
//                }

//            }


//        }


//        public ResponseModel GetAllProductData()
//        {
//            var invProduct = _aRepository.SelectAll();
//            var invProductPrice = _aInvProductPriceRepository.SelectAll().Where(ppri => ppri.IsActive == true);
//            var invItem = _db.InvItems;
//            var invSize = _db.InvSizes;
//            var invUoM = _db.InvUoMs;
//            var invColor = _db.InvColors;


//            //To show Following info into  datatable of product view.

//            var data = from pro in invProduct
//                       join ppri in invProductPrice on pro.ProductId equals ppri.ProductId
//                       join it in invItem on pro.ItemId equals it.ItemId
//                       join sz in invSize on pro.SizeId equals sz.SizeId
//                       join um in invUoM on pro.UoMId equals um.UoMId
//                       join clr in invColor on pro.ColorId equals clr.ColorId


//                       select new
//                       {

//                           pro.ProductId,
//                           pro.ProductCode,
//                           pro.ProductName,
//                           pro.ProductMainBarCode,
//                           pro.ProductFactoryBarCode,
//                           pro.MinimumStock,
//                           pro.IsActive,

//                           ppri.ProductPriceId,
//                           ppri.CostPrice,
//                           ppri.WholeSalePrice,
//                           ppri.RetailPrice,

//                           it.ItemId,
//                           it.ItemName,

//                           sz.SizeId,
//                           sz.SizeName,

//                           um.UoMId,
//                           um.UoMShortName,

//                           clr.ColorId,
//                           clr.ColorName,




//                       };

//            var ass = data.ToList();
//            return _aModel.Respons(ass);
//        }


//    }
//}








using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class ProductManager : IProductManager
    {
        private IGenericRepository<InvProduct> _aRepository;
        private IGenericRepository<InvProductPrice> _aInvProductPriceRepository;

        //private IGenericRepository<InvItem> _aInvItemRepository;
        //private IGenericRepository<InvSize> _aInvSizeRepository;
        //private IGenericRepository<InvUoM> _aInvUomRepository;
        //private IGenericRepository<InvColor> _aInvColoRepository;

        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public ProductManager()
        {
            _aRepository = new GenericRepositoryInv<InvProduct>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
        }


        //public ResponseModel CreateProductDetails(ProductDetailsViewModel aObj)
        //{
        //    using (var transaction = _db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            DateTime aDate = DateTime.Now;
        //            InvProduct aProduct = new InvProduct()
        //            {
        //                ProductId = aObj.ProductId,
        //                ProductCode = aObj.ProductCode,
        //                ProductName = aObj.ProductName,
        //                ProductMainBarCode = aObj.ProductMainBarCode,
        //                ProductFactoryBarCode = aObj.ProductFactoryBarCode,
        //                ColorId = aObj.ColorId,
        //                ItemId = aObj.ItemId,
        //                SizeId = aObj.SizeId,
        //                UoMId = aObj.UoMId,
        //                MinimumStock = aObj.MinimumStock,
        //                ProductFrontImage = aObj.ProductFrontImage,
        //                ProductBackImage = aObj.ProductBackImage,
        //                CreatedDate = aObj.CreatedDate,
        //                IsActive = aObj.IsActive,

        //            };


        //            _db.InvProducts.Add(aProduct);
        //            _db.SaveChanges();

        //            if (aObj.ProductId == 0)
        //            {
        //                InvProductPrice aProductPrice = new InvProductPrice()
        //                {
        //                    ProductId = aObj.ProductId,
        //                    ProductPriceId = aObj.ProductPriceId,
        //                    CostPrice = aObj.CostPrice,
        //                    WholeSalePrice = aObj.WholeSalePrice,
        //                    RetailPrice = aObj.RetailPrice,
        //                    CreatedDate = aObj.CreatedDate,
        //                    IsActive = true

        //                };
        //                _db.InvProductPrices.Add(aProductPrice);
        //                _db.SaveChanges();
        //                transaction.Commit();
        //                return _aModel.Respons(true, "New Produc Successfully Saevd");
        //            }



        //            else
        //            {

        //                _db.InvProducts.Attach(aProduct);
        //                _db.Entry(aProduct).State=EntityState.Modified;
        //                _db.SaveChanges();


        //                var invProductPrice = _db.InvProductPrices.Find(aObj.ProductPriceId);
        //                if ((invProductPrice.CostPrice != aObj.CostPrice) ||
        //                    (invProductPrice.WholeSalePrice != aObj.WholeSalePrice) ||
        //                    (invProductPrice.RetailPrice != aObj.RetailPrice))
        //                {
        //                    invProductPrice.IsActive = false;
        //                    invProductPrice.ModifiedDate = aDate;
        //                    _db.InvProductPrices.Attach(invProductPrice);
        //                    _db.
        //                    _db.SaveChanges();
        //                }
        //            }



        //            return null;
        //        }
        //        catch (Exception)
        //        {
        //            transaction.Rollback();
        //            return _aModel.Respons(false, "Sorry! Some Error Error Happned");
        //        }
        //    }


        //}




        public ResponseModel CreateProductDetails(ProductDetailsViewModel aObj)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    DateTime aDate = DateTime.Now;
                    InvProduct aProduct = new InvProduct()
                    {
                        ProductId = aObj.ProductId,
                        ProductCode = aObj.ProductCode,
                        ProductName = aObj.ProductName,
                        ProductMainBarCode = aObj.ProductMainBarCode,
                        ProductFactoryBarCode = aObj.ProductFactoryBarCode,
                        ItemId = aObj.ItemId,
                        SizeId = aObj.SizeId,
                        ColorId = aObj.ColorId,
                        UoMId = aObj.UoMId,
                        MinimumStock = aObj.MinimumStock,
                        ProductFrontImage = aObj.ProductFrontImage,
                        ProductBackImage = aObj.ProductBackImage,

                        CreatedDate = aDate,
                        IsActive = aObj.ProductIsActive,
                    };

                    if ((aObj.ProductId == 0)) //this is new
                    {

                        var statusProductCode =
                            _aRepository.SelectAll().Where((pc => pc.ProductCode == aObj.ProductCode));
                        var statusProductMainBarCode =
                            _aRepository.SelectAll().Where((pc => pc.ProductMainBarCode == aObj.ProductMainBarCode));
                        var statusProductFactoryBarCode =
                            _aRepository.SelectAll()
                                .Where((pc => pc.ProductFactoryBarCode == aObj.ProductFactoryBarCode));


                        if ((aObj.ProductCode == null) || (aObj.ProductMainBarCode == null) || (aObj.ProductFactoryBarCode == null) || (aObj.RetailPrice == null) || (aObj.CostPrice == null) || (aObj.WholeSalePrice == null) || (aObj.ProductCode == null))
                        {
                            return _aModel.Respons(true, "Plese Fill All the Required Field(s)");
                        }


                        else if (statusProductCode.Any())
                        {
                            return _aModel.Respons(true, "Product Code Already Exist.");
                        }

                        else if (statusProductMainBarCode.Any())
                        {
                            return _aModel.Respons(true, "Product Main Bar Code Already Exist.");
                        }

                        else if (statusProductFactoryBarCode.Any())
                        {
                            return _aModel.Respons(true, "Product Factory Bar Code Already Exist.");
                        }



                        else if ((aObj.ProductCode != null) && (aObj.ProductMainBarCode != null) && (aObj.ProductFactoryBarCode != null) && (aObj.CostPrice != null) && (aObj.WholeSalePrice != null) &&
                                 (aObj.RetailPrice != null))

                        {
                            _db.InvProducts.Add(aProduct);
                            _db.SaveChanges();

                            InvProductPrice aProductPrice = new InvProductPrice()
                            {
                                ProductPriceId = aObj.ProductPriceId,
                                ProductId = aProduct.ProductId,
                                CostPrice = aObj.CostPrice,
                                WholeSalePrice = aObj.WholeSalePrice,
                                RetailPrice = aObj.RetailPrice,
                                CreatedDate = aDate,
                                IsActive = true

                            };



                            _db.InvProductPrices.Add(aProductPrice);
                            _db.SaveChanges();

                            transaction.Commit();
                            return _aModel.Respons(true, "New Product Successfully Saved");
                        }

                        else
                        {


                            _db.SaveChanges();
                            transaction.Commit();
                            return _aModel.Respons(true, "Failed to  Save New Product");
                        }


                    }

                    else if ((aObj.ProductId > 0))
                    {
                        _db.InvProducts.Attach(aProduct);
                        _db.Entry(aProduct).State = EntityState.Modified;
                        _db.SaveChanges();

                        var invProduct = _db.InvProducts.Find(aObj.ProductId);
                        var invProductPrice = _db.InvProductPrices.Find(aObj.ProductPriceId);

                        if ((aObj.ProductCode == null) || (aObj.ProductMainBarCode == null) || (aObj.ProductFactoryBarCode == null) || (aObj.RetailPrice == null) || (aObj.CostPrice == null) || (aObj.WholeSalePrice == null) || (aObj.ProductCode == null))
                        {
                            return _aModel.Respons(true, "Plese Fill All the Required Field(s)");
                        }


                        else if (((aObj.ProductCode == invProduct.ProductCode) && (aObj.ProductCode != null)) && (aObj.ProductMainBarCode != null) && (aObj.ProductFactoryBarCode != null) && (aObj.ProductCode != null) && (aObj.CostPrice != null) &&
                             (aObj.WholeSalePrice != null) && (aObj.RetailPrice != null))    // During edit previous saved Product code must be same(not changed).And required fields musnt not null.
                        {


                            //start price checking logic



                            if ((invProductPrice.CostPrice != aObj.CostPrice) || (invProductPrice.WholeSalePrice != aObj.WholeSalePrice) || (invProductPrice.RetailPrice != aObj.RetailPrice))
                            {
                                //inactive previous price
                                invProductPrice.IsActive = false;
                                invProductPrice.ModifiedDate = aDate;

                                _db.InvProductPrices.Attach(invProductPrice);
                                _db.Entry(invProductPrice).State = EntityState.Modified;
                                _db.SaveChanges();

                                //creaete new price
                                InvProductPrice aProductPrice = new InvProductPrice()
                                {
                                    ProductPriceId = aObj.ProductPriceId,
                                    ProductId = aObj.ProductId,
                                    CostPrice = aObj.CostPrice,
                                    WholeSalePrice = aObj.WholeSalePrice,
                                    RetailPrice = aObj.RetailPrice,
                                    CreatedDate = aDate,
                                    IsActive = true

                                };

                                _db.InvProductPrices.Add(aProductPrice);
                                _db.SaveChanges();

                            }

                            transaction.Commit();
                            return _aModel.Respons(true, "New Product Successfully Updated");
                        }
                    }




                    else
                    {
                        transaction.Commit();
                        return _aModel.Respons(true, "Failed to Updated a Product");
                    }



                } // end of Try section



                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some Error Error Happned");
                }




            }



        }







        public ResponseModel GetAllProductData()
        {
            var invProduct = _aRepository.SelectAll();
            var invProductPrice = _aInvProductPriceRepository.SelectAll().Where(ppri => ppri.IsActive == true);
            var invItem = _db.InvItems;
            var invSize = _db.InvSizes;
            var invUoM = _db.InvUoMs;
            var invColor = _db.InvColors;


            //To show Following info into  datatable of product view.

            var data = from pro in invProduct
                       join ppri in invProductPrice on pro.ProductId equals ppri.ProductId
                       join it in invItem on pro.ItemId equals it.ItemId
                       join sz in invSize on pro.SizeId equals sz.SizeId
                       join um in invUoM on pro.UoMId equals um.UoMId
                       join clr in invColor on pro.ColorId equals clr.ColorId


                       select new
                       {

                           pro.ProductId,
                           pro.ProductCode,
                           pro.ProductName,
                           pro.ProductMainBarCode,
                           pro.ProductFactoryBarCode,
                           pro.MinimumStock,
                           pro.IsActive,

                           ppri.ProductPriceId,
                           ppri.CostPrice,
                           ppri.WholeSalePrice,
                           ppri.RetailPrice,

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

