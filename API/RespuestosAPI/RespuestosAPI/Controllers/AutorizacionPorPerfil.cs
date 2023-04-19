using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace RespuestosAPI.Controllers
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class AutorizacionPorPerfil : Attribute, IAuthorizationFilter
    {
        private readonly string[] RolesPermitidos;

        public AutorizacionPorPerfil(string[] rolesPermitidos)
        {
            RolesPermitidos = rolesPermitidos;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {

            var user = context.HttpContext.User;


            bool tienePermiso = false;

            foreach (var rol in RolesPermitidos)
            {
                if (rol == user.Claims.FirstOrDefault(r => r.Type == "rol")?.Value)
                {
                    tienePermiso = true;
                }
            }

            if (!user.Identity.IsAuthenticated || !tienePermiso)
            {
                context.Result = new UnauthorizedResult();
            }

        }
    }
}
