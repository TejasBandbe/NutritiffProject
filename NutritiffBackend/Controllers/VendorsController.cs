using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;
using NutritiffBackend.Models;

namespace NutritiffBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorsController : ControllerBase
    {
        private readonly NutritiffContext _context;

        public VendorsController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        [HttpPost("login")]
        public ActionResult<Vendor> Login([FromBody] VendorBody vendor)
        { 
            var activeVendor = _context.Vendors.FirstOrDefault(
                v => v.Email == vendor.Email && v.Password == vendor.Password && v.ActiveStatus == "active");
            if (activeVendor != null)
            {
                return new ActionResult<Vendor>(activeVendor);
            }
            else
            {
                return NotFound();
            }
        }

        //2
        [HttpPost("register")]
        public ActionResult<Vendor> Register([FromBody] Vendor vendor)
        {
            _context.Vendors.Add(vendor);
            _context.SaveChanges();
            return new ActionResult<Vendor>(vendor);
        }

        //3
        [HttpPost("myorders")]
        public IEnumerable<OrdersToDisplay> ShowMyOrders([FromBody] int vendorId)
        {
            var query = from order in _context.Orders
                        join tiffin in _context.Tiffins on order.TiffinId equals tiffin.TiffinId
                        join customer in _context.Customers on order.CustomerId equals customer.CustomerId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where vendor.VendorId == vendorId
                        select new OrdersToDisplay
                        {
                            orderId = order.OrderId,
                            customerName = customer.Name,
                            homeAddress = customer.HomeAddress,
                            workAddress = customer.WorkAddress,
                            vendorName = vendor.Name,
                            tiffinName = tiffin.TiffinName,
                            quantity = order.Quantity
                        };

            var results = query.ToList();
            return (IEnumerable<OrdersToDisplay>)results;
        }

        //4
        [HttpGet("mytiffins")]
        public IEnumerable<Tiffin> ShowMyTiffins(int vendorId)
        {
            var mytiffins = _context.Tiffins.Where(
                t => t.VendorId == vendorId).ToList();
            return mytiffins;
        }

        //5
        [HttpPost("addtiffin")]
        public ActionResult<Tiffin> AddTiffin([FromBody]Tiffin tiffin)
        {
            _context.Tiffins.Add(tiffin);
            _context.SaveChanges();
            return new ActionResult<Tiffin>(tiffin);
        }

        //6
        [HttpPost("gettiffin")]
        public ActionResult<Tiffin> GetTffinById([FromBody] int tiffinId)
        {
            var tiffin = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffinId);
            if(tiffin != null)
            {
                return new ActionResult<Tiffin>(tiffin);
            }
            else { return NotFound(); }
        }

        //7
        [HttpPatch("updatetiffin")]
        public ActionResult<Tiffin> UpdateTiffin([FromBody] Tiffin tiffin)
        {
            var tiffinToUpdate = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffin.TiffinId);
            if (tiffinToUpdate != null)
            {
                tiffinToUpdate.TiffinName = tiffin.TiffinName;
                tiffinToUpdate.Description = tiffin.Description;
                tiffinToUpdate.TiffinCategory = tiffin.TiffinCategory;
                tiffinToUpdate.TiffinPrice = tiffin.TiffinPrice;
                tiffinToUpdate.ImageLink = tiffin.ImageLink;
                _context.SaveChanges();
                return new ActionResult<Tiffin>(tiffinToUpdate);
            }
            else { return NotFound(); }
        }

        //8
        [HttpPatch("deletetiffin")]
        public ActionResult<Tiffin> DeleteTiffin([FromBody] int tiffinId)
        {
            var tiffinToDelete = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffinId);
            if (tiffinToDelete != null)
            {
                tiffinToDelete.Status = "inactive";
                _context.SaveChanges();
                return new ActionResult<Tiffin>(tiffinToDelete);
            }
            else { return NotFound(); }
        }

        //9
        [HttpPatch("activethetiffin")]
        public ActionResult<Tiffin> ActiveTheTiffin([FromBody] int tiffinId)
        {
            var tiffinToUpdate = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffinId);
            if (tiffinToUpdate != null)
            {
                tiffinToUpdate.Status = "active";
                _context.SaveChanges();
                return new ActionResult<Tiffin>(tiffinToUpdate);
            }
            else { return NotFound(); }
        }
    }
}
