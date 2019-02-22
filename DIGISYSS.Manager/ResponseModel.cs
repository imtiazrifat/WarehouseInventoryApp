using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace DIGISYSS.Manager

{
 public   class ResponseModel
    {
        public ResponseModel()
        {
            Message = "An error has occured while data get !";
        }
        public bool Status { get; set; }
        public string Message { get; set; }

        public object Data { get; set; }

        public object Data2 { get; set; }
        public ResponseModel Respons(bool isSuccess, string msg)
        {
            return new ResponseModel { Status = isSuccess, Message = msg, Data = null };
        }
        public ResponseModel Respons(object data)
        {
            return new ResponseModel { Message = "Data Get Successfully!", Status = true, Data = data };
        }
        public ResponseModel Respons(object data, object data2)
        {
            return new ResponseModel { Message = "Data Get Successfully!", Status = true, Data = data, Data2 = data2 };
        }
    }
}
