using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DIGISYSS.Entities;
using DIGISYSS.Entities.ViewModel;
using DIGISYSS.Manager.Interface.Inventory;
using DIGISYSS.Repositories;

namespace DIGISYSS.Manager.Manager.Inventory
{
    public class StudentManager : IStudentManager
    {
        private IGenericRepository<TestStudent> _aRepository;
        private IGenericRepository<TestStudentAddress> _aTestStudentAddress;
        private IGenericRepository<TestStudentHistory> _aTestStudentHistory;
        private ResponseModel _aModel;
        private RetailSalesManagementEntities _db;
        public StudentManager()
        {
            _aRepository = new GenericRepositoryInv<TestStudent>();
            _aModel = new ResponseModel();
            _db = new RetailSalesManagementEntities();
            _aTestStudentAddress = new GenericRepositoryInv<TestStudentAddress>();
            _aTestStudentHistory = new GenericRepositoryInv<TestStudentHistory>();
        }
        public ResponseModel CreateStudentDetails(StudentDetails aObj)
        {
            //_aRepository.Insert(aObj);
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {
                    if (aObj.StudentId == 0)
                    {
                        //var status = _aRepository.SelectAll().Where(a => a.StudentCode == aObj.StudentCode);
                        //if (status.Any())
                        //{
                        //    return _aModel.Respons(false, "Student Code Already Exist.");
                        //}

                        DateTime aDate = DateTime.Now;

                        TestStudent aStudent = new TestStudent()
                        {
                            StudentName = aObj.StudentName,
                            StudentPhone = aObj.StudentPhone

                        };


                        //aObj.CreatedDate = aDate;
                        _db.TestStudents.Add(aStudent);
                        _db.SaveChanges();

                        TestStudentAddress aStudentAddress = new TestStudentAddress()
                        {
                            Address = aObj.Address,
                            Country = aObj.Country,
                            StudentId = aStudent.StudentId

                        };
                        // List<TestStudentAddress> aStudentAddress;
                        //foreach (var testStudentAddress in aStudentAddress)
                        //{
                        //    _db.TestStudentAddresses.Add(testStudentAddress);
                        //}
                        //_db.SaveChanges();
                        _db.TestStudentAddresses.Add(aStudentAddress);
                        // throw new Exception("good");

                        TestStudentHistory aStudentHistory = new TestStudentHistory()
                        {
                            HistoryDetials = aObj.HistoryDetials,
                            HistoryTitle = aObj.HistoryTitle,
                            StudentId = aStudent.StudentId
                        };
                        _db.TestStudentHistories.Add(aStudentHistory);
                        _db.SaveChanges();


                        transaction.Commit();
                        return _aModel.Respons(true, "New Student Successfully Saved");

                    }
                    else
                    {
                        DateTime aDate = DateTime.Now;
                        //aObj.CreatedDate = aDate;
                        //_aRepository.Update(aObj);
                        //_aRepository.Save();
                        return _aModel.Respons(true, "New Student Successfully Updated");
                    }
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return _aModel.Respons(false, "Sorry! Some Error Error Happned");
                }

            }

        }

        public ResponseModel GetAllStudentData()   // Must RND
        {
            var testStudents = _aRepository.SelectAll();
            var testStudentAddresses = _aTestStudentAddress.SelectAll();
            var testStudentHistories = _aTestStudentHistory.SelectAll();

            var data = from s in testStudents
                       join a in testStudentAddresses on s.StudentId equals a.StudentId
                       join h in testStudentHistories on s.StudentId equals h.StudentId
                       select new
                       {
                           s.StudentId,
                           s.StudentName,
                           s.StudentPhone,
                           a.Address,
                           a.Country,
                           a.StudentAddressId,
                           h.HistoryId,
                           h.HistoryTitle,
                           h.HistoryDetials
                       };

            var asa = data.ToList();
            return _aModel.Respons(data);
        }

        //public ResponseModel CreateStudent(InvStudent aObj)
        //{
        //    try
        //    {

        //        if (aObj.StudentId == 0)
        //        {

        //            aObj.CreatedDate = DateTime.Now;
        //            _aRepository.Insert(aObj);
        //            _aRepository.Save();
        //            return _aModel.Respons(true, "New Student Successfully Saved");
        //        }
        //        else
        //        {
        //            _aRepository.Update(aObj);
        //            _aRepository.Save();
        //            return _aModel.Respons(true, "Student Successfully Updated");
        //        }

        //    }
        //    catch (Exception)
        //    {

        //        return _aModel.Respons(false, "Sorry! Some Error Happned.");
        //    }
        //}

        //public ResponseModel GetAllStudent()
        //{
        //    var data = _aRepository.SelectAll();
        //    return _aModel.Respons(data);

        //}



    }
}
