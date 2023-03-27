using Microsoft.AspNetCore.Mvc;

namespace RespuestosAPI.Controllers
{
    public class RepuestosController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
