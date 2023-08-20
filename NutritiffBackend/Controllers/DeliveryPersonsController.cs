using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;

namespace NutritiffBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryPersonsController : ControllerBase
    {
        private readonly NutritiffContext _context;
        public DeliveryPersonsController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        [HttpPatch("deliver")]
        public ActionResult<Order> Deliver(int orderId)
        {
            var orderToDeliver = _context.Orders.FirstOrDefault(
                o => o.OrderId == orderId);
            if(orderToDeliver != null)
            {
                orderToDeliver.Status = "delivered";
                _context.SaveChanges();
                return new ActionResult<Order>(orderToDeliver);
            }
            else { return NotFound(); }
        }
    }
}
