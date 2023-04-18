namespace RespuestosAPI.DTOs
{
    public class ResponseWrapper<T1, T2>
    {
        public int RetCode { get; set; }
        public string Mensaje { get; set; }
        public T1 Value { get; set; }
        public T2 Token { get; set; }
    }
}
