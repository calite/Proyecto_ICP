using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using RespuestosAPI.DTOs;
using System.Security.Cryptography;

namespace RespuestosAPI.Servicios
{
    public class HashService
    {
        public ResultadoHash Hash(string valor)
        {
            var sal = new byte[16];
            using (var random = RandomNumberGenerator.Create())
            {
                random.GetBytes(sal);
            }
            return Hash(valor, sal);
        }

        public ResultadoHash Hash(string valor, byte[] sal)
        {
            var llaveDerivada = KeyDerivation.Pbkdf2(
                password: valor,
                salt: sal,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 32);

            var hash = Convert.ToBase64String(llaveDerivada);

            return new ResultadoHash()
            {
                Hash = hash,
                Sal = sal
            };
        }
    }
}
