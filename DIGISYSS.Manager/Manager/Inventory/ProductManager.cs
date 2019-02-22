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
        private IGenericRepository<InvItem> _aItemRepository;
        private IGenericRepository<InvSize> _aSizeRepository;
        private IGenericRepository<InvUoM> _aUoMRepository;
        private IGenericRepository<InvColor> _aColorRepository;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;

        public ProductManager()
        {
            _aRepository = new GenericRepositoryInv<InvProduct>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aInvProductPriceRepository = new GenericRepositoryInv<InvProductPrice>();
            _aItemRepository = new GenericRepositoryInv<InvItem>();
            _aSizeRepository = new GenericRepositoryInv<InvSize>();
            _aUoMRepository = new GenericRepositoryInv<InvUoM>();
            _aColorRepository = new GenericRepositoryInv<InvColor>();
        }
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
                        ProductMainBarcode = aObj.ProductMainBarcode,
                        ProductFactoryBarcode = aObj.ProductFactoryBarcode,
                        FactoryId = aObj.FactoryId,
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
                        var statusProductMainBarcode =
                            _aRepository.SelectAll().Where((pc => pc.ProductMainBarcode == aObj.ProductMainBarcode)).ToList();
                        //    List<InvProduct> statusProductFactoryBarcode = null;
                        if (aObj.ProductFactoryBarcode != null)
                        {
                            var statusProductFactoryBarcode =
                                _aRepository.SelectAll()
                                    .Where((pc => pc.ProductFactoryBarcode == aObj.ProductFactoryBarcode))
                                    .ToList();
                            if (statusProductFactoryBarcode.Any())
                            {
                                return _aModel.Respons(true, "Product Factory Bar Code Already Exist.");
                            }

                        }

                        if ((aObj.ProductCode == null) || (aObj.ProductMainBarcode == null) || (aObj.RetailPrice == null) || (aObj.CostPrice == null) || (aObj.WholeSalePrice == null) || (aObj.ProductCode == null))
                        {
                            return _aModel.Respons(true, "Plese Fill All the Required Field(s)");
                        }
                        else if (statusProductCode.Any())
                        {
                            return _aModel.Respons(true, "Product Code Already Exist.");
                        }
                        else if (statusProductMainBarcode.Any())
                        {
                            return _aModel.Respons(true, "Product Main Bar Code Already Exist.");
                        }
                        else if ((aObj.ProductCode != null) && (aObj.ProductMainBarcode != null) && (aObj.CostPrice != null) && (aObj.WholeSalePrice != null) &&
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
                    else if ((aObj.ProductId > 0) && ((aObj.ProductMainBarcode != null) || (aObj.ProductFactoryBarcode != null)) && (aObj.ProductCode != null) && (aObj.CostPrice != null) &&
                             (aObj.WholeSalePrice != null) && (aObj.RetailPrice != null))
                    {
                        _db.InvProducts.Attach(aProduct);
                        _db.Entry(aProduct).State = EntityState.Modified;
                        _db.SaveChanges();

                        //start price checking logic

                        var invProductPrice = _db.InvProductPrices.Find(aObj.ProductPriceId);

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
                    else
                    {
                        transaction.Commit();
                        return _aModel.Respons(true, "Failed to Updated a Product");
                    }
                } // end of Try section
                catch (Exception e)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some  Error Happned");
                }
            }
        }

        public ResponseModel GetAllProductsForDd()
        {
            var data = _aRepository.SelectAll();
            var listB = data.Select(a => new
            {
                id = a.ProductId,
                text = a.ProductName
            });
            return _aModel.Respons(listB);
        }

        public ResponseModel GetAllProductData()
        {
            var invProduct = _aRepository.SelectAll();
            var invProductPrice = _aInvProductPriceRepository.SelectAll().Where(ppri => ppri.IsActive == true);
            var invFactory = _db.InvFactories;
            var invItem = _db.InvItems;
            var invSize = _db.InvSizes;
            var invUoM = _db.InvUoMs;
            var invColor = _db.InvColors;

            //To show Following info into  datatable of product view.

            var data = from pro in invProduct
                       join ppri in invProductPrice on pro.ProductId equals ppri.ProductId
                       join fac in invFactory on pro.FactoryId equals fac.FactoryId
                       join it in invItem on pro.ItemId equals it.ItemId
                       join sz in invSize on pro.SizeId equals sz.SizeId
                       join um in invUoM on pro.UoMId equals um.UoMId
                       join clr in invColor on pro.ColorId equals clr.ColorId

                       select new
                       {
                           pro.ProductId,
                           pro.ProductCode,
                           pro.ProductName,
                           pro.ProductMainBarcode,
                           pro.ProductFactoryBarcode,
                           pro.MinimumStock,
                           pro.IsActive,

                           ppri.ProductPriceId,
                           ppri.CostPrice,
                           ppri.WholeSalePrice,
                           ppri.RetailPrice,

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

        public ResponseModel LoadAllProductDd(int factoryId, int itemId, int uoMId, int sizeId, int colorId)
        {
            var allProduct = _aRepository.SelectAll();
            //if (factoryId != 0)
            //{
            //    var query = from pro in allProduct.Where(aa => aa.FactoryId == factoryId)
            //                select new  { id = pro.ProductId, text = pro.ProductName };
            // return _aModel.Respons(query);
            //}

            if (itemId != 0)
            {
                allProduct = allProduct.Where(aa => aa.ItemId == itemId);
            }

            if (uoMId != 0)
            {
                allProduct = allProduct.Where(aa => aa.UoMId == uoMId);
            }

            if (sizeId != 0)
            {
                allProduct = allProduct.Where(aa => aa.SizeId == sizeId);
            }

            if (colorId != 0)
            {
                allProduct = allProduct.Where(aa => aa.ColorId == colorId);
            }

            var aSearchedPoduct = from pro in allProduct
                                  select new { id = pro.ProductId, text = pro.ProductName + "(" + pro.ProductMainBarcode + ")" };
            return _aModel.Respons(aSearchedPoduct);
        }

        public ResponseModel GetASingleProductDetails(int productId)
        {
            var invProduct = _aRepository.SelectAll();
            var itemDetails = _aItemRepository.SelectAll();
            var allPrice = _aInvProductPriceRepository.SelectAll().Where(p => p.IsActive == true);
            var allSizes = _aSizeRepository.SelectAll();
            var allUoMs = _aUoMRepository.SelectAll();
            var allColors = _aColorRepository.SelectAll();
            ////   var invProductPurchase = _aRepository;

            //////To show Following info into  datatable of product view.
            var data = from pp in invProduct
                       where pp.ProductId == productId
                       join price in allPrice on pp.ProductId equals price.ProductId
                       join itm in itemDetails on pp.ItemId equals itm.ItemId
                       join size in allSizes on pp.SizeId equals size.SizeId
                       join uOm in allUoMs on pp.SizeId equals uOm.UoMId
                       join color in allColors on pp.SizeId equals color.ColorId
                       select new
                       {
                           pp.ProductId,
                           pp.ProductCode,
                           pp.ProductName,
                           pp.ProductMainBarcode,
                           pp.ProductFactoryBarcode,
                           pp.MinimumStock,
                           pp.FactoryId,
                           pp.ItemId,
                           pp.SizeId,
                           pp.UoMId,
                           pp.ColorId,

                           pp.IsActive,
                           price.CostPrice,
                           price.WholeSalePrice,
                           price.RetailPrice,

                           itm.ItemName,
                           size.SizeName,
                           uOm.UoMShortName,
                           color.ColorName


                       };

            var ass = data.ToList();
            return _aModel.Respons(data);
        }

        public ResponseModel GenarateBarcode(int itemId, int sizeId)
        {
            var autoGeneratedBarcode = "";
            var selectedItem = _aItemRepository.SelectedById(itemId);
            var selectedSize = _aSizeRepository.SelectedById(sizeId);

            var itemCodelength = selectedItem.ItemCode.Length;
            var itemCode = selectedItem.ItemCode.ToString();
            var itemCodeForBarcode = GenerateFourDigitCode(itemCodelength, itemCode);
            var sizeCodelength = selectedSize.SizeCode.Length;
            var sizeCode = selectedSize.SizeCode.ToString();
            var sizeCodeForBarcode = GenerateFourDigitCode(sizeCodelength, sizeCode);

            var invProducts = _aRepository.SelectAll().Where(a => a.ItemId == itemId && a.SizeId == sizeId);

            if (invProducts.Any())
            {
                var allSelectedBarcode = invProducts.Select(ee => ee.ProductMainBarcode);
                int max = 0;

                foreach (var aBarcode in allSelectedBarcode)
                {
                    int forCompare = Convert.ToInt32(aBarcode.Substring(aBarcode.Length - 3));

                    if (forCompare > max)
                    {
                        max = forCompare;
                    }
                }

                int codelength = (max + 1).ToString().Length;
                var txtMax = "";

                if (codelength < 4)
                {
                    for (int i = codelength; i < 4; i++)
                    {
                        txtMax += '0';
                    }
                    txtMax += max + 1;
                }
                autoGeneratedBarcode = itemCodeForBarcode + sizeCodeForBarcode + txtMax;
            }
            else
            {
                autoGeneratedBarcode = itemCodeForBarcode + sizeCodeForBarcode + "0001";
            }
            return _aModel.Respons(autoGeneratedBarcode);
        }

        public string GenerateFourDigitCode(int codelength, string code)
        {
            var generateFourDigitCode = "";
            if (codelength != 4)
            {
                if (codelength > 4)
                {
                    generateFourDigitCode = code.Remove(4);
                }
                if (codelength < 4)
                {
                    for (int i = codelength; i < 4; i++)
                    {
                        generateFourDigitCode += '0';
                    }
                    generateFourDigitCode += code;
                }
            }
            else
            {
                generateFourDigitCode = code;
            }
            return generateFourDigitCode;
        }
    }
}

