namespace RespuestosAPI.DTOs
{
    public class ResponseWrapper<T>
    {
        public int RetCode { get; set; }
        public string Mensaje { get; set; }
        public T Value { get; set; }
    }
}
