using System.Net;
using Newtonsoft.Json;

namespace ECommerce.Service.Dtos
{
    public class GeneralDto
    {
        public class Response
        {
            public Response()
            {

            }
            public Response(bool isError = false)
            {
                if (isError == true)
                {
                    Error = true;
                    Message = "An error was occured!";
                }
            }
            public bool Error { get; set; } = false;
            public string Message { get; set; }
            public object Data { get; set; }
            public object Common { get; set; }
            public string Code { get; set; }
        }

        public class Response<T>
        {
            public Response()
            {

            }
            public Response(bool isError = false)
            {
                if (isError == true)
                {
                    Error = true;
                    Message = "An error was occured!";
                }
            }
            public bool Error { get; set; } = false;
            public string Message { get; set; }
            public T Data { get; set; }
            public object Common { get; set; }
            public string Code { get; set; }
        }

        public class Select
        {
            public string Label { get; set; }
            public object Value { get; set; }
            public object Common { get; set; }
        }

        public class IdRequest
        {
            public int Id { get; set; }
        }
        public class StringRequest
        {
            public string Value { get; set; }
        }
    }

    public class ResponseResult<T>
    {
        private HttpStatusCode code;
        public HttpStatusCode Code
        {
            get { return code; }
            set
            {
                code = value;
            }
        }
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public T Data { get; set; }

        /// <summary>
        /// Default instance of Service Response Result
        /// </summary>
        public ResponseResult()
        {
            Code = HttpStatusCode.Forbidden;
        }


        public ResponseResult(HttpStatusCode code)
        {
            Code = code;
        }

    }
}
