using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;
using NutritiffBackend.Models;

namespace NutritiffBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly NutritiffContext _context;

        public CustomersController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        [HttpGet("tiffins")]
        public IEnumerable<Tiffin> GetAllTiffins()
        {
            return _context.Tiffins.ToList();
        }

        //2
        [HttpGet("tiffins/veg")]
        public IEnumerable<Tiffin> GetVegTiffins()
        {
            return _context.Tiffins.Where(t => t.TiffinCategory == "veg").ToList();
        }

        //3
        [HttpGet("tiffins/nonveg")]
        public IEnumerable<Tiffin> GetNonvegTiffins()
        {
            return _context.Tiffins.Where(t => t.TiffinCategory == "nonveg").ToList();
        }

        //4
        [HttpPost("login")]
        public ActionResult<Customer> Login([FromBody] LoginRequest request)
        {
            var activeCustomer = _context.Customers.FirstOrDefault(
                c => c.Email == request.Email && c.Password == request.Password && c.ActiveStatus == "active");
            if (activeCustomer != null)
            {
                return new ActionResult<Customer>(activeCustomer);
            }
            else
            {
                return NotFound();
            }
        }

        //5
        [HttpPost("register")]
        public ActionResult<Customer> Register([FromBody] Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return new ActionResult<Customer>(customer);
        }

        //6
        [HttpPost("cart")]
        public ActionResult<Cart> AddToCart([FromBody] Cart cart)
        {
            _context.Carts.Add(cart);
            _context.SaveChanges();
            return new ActionResult<Cart>(cart);
        }

        //7
        [HttpPatch("cart/increase")]
        public ActionResult<Cart> IncreaseQuantity([FromBody] int cartId)
        { 
            var cartToUpdate = _context.Carts.FirstOrDefault(
                c => c.CartId == cartId);
            if (cartToUpdate != null)
            {
                cartToUpdate.Quantity += 1;
                _context.SaveChanges();
                return new ActionResult<Cart>(cartToUpdate);
            }
            else
            { return NotFound(); }
        }

        //8
        [HttpPatch("cart/decrease")]
        public ActionResult<Cart> DecreaseQuantity([FromBody] int cartId)
        {
            var cartToUpdate = _context.Carts.FirstOrDefault(
                c => c.CartId == cartId);
            if (cartToUpdate != null)
            {
                cartToUpdate.Quantity -= 1;
                _context.SaveChanges();
                return new ActionResult<Cart>(cartToUpdate);
            }
            else
            { return NotFound(); }
        }

        //9
        [HttpPost("placeorder")]
        public ActionResult<Order> PlaceOrder([FromBody] Order order)
        {
                _context.Orders.Add(order);
                _context.SaveChanges();
                return new ActionResult<Order>(order);
        }

        //10
        [HttpPost("myorders")]
        public IEnumerable<Order> GetMyOrders([FromBody] int customerId)
        { 
            var myorders =  _context.Orders.Where(
                o => o.CustomerId == customerId).ToList();
            if(myorders != null)
            {
                return myorders;
            }
            else
            { return Enumerable.Empty<Order>(); }
        }

        //11
        [HttpPatch("cancelorder")]
        public ActionResult<Order> CancelMyOrder([FromBody] int orderId)
        {
            var order = _context.Orders.FirstOrDefault(
                o => o.OrderId == orderId && o.Status == "ordered");
            if (order != null)
            {
                order.Status = "canceled";
                _context.SaveChanges();
                return new ActionResult<Order>(order);
            }
            else
            {
                return NotFound();
            }
        }

        //12
        [HttpPost("myorders/delivered")]
        public IEnumerable<Order> DeliveredOrders([FromBody] int customerId)
        {
            var order = _context.Orders.Where(
                o => o.CustomerId == customerId && o.Status == "delivered").ToList();
            if (order != null)
            {
                return order;
            }
            else
            { return Enumerable.Empty<Order>();}
        }

        //13
        [HttpPost("myorders/canceled")]
        public IEnumerable<Order> CanceledOrders([FromBody] int customerId)
        {
            var order = _context.Orders.Where(
                o => o.CustomerId == customerId && o.Status == "canceled").ToList();
            if (order != null)
            {
                return order;
            }
            else
            { return Enumerable.Empty<Order>(); }
        }

        //14
        [HttpPost("myorders/ordered")]
        public IEnumerable<Order> OrderedOrders([FromBody] int customerId)
        {
            var order = _context.Orders.Where(
                o => o.CustomerId == customerId && o.Status == "ordered").ToList();
            if (order != null)
            {
                return order;
            }
            else
            { return Enumerable.Empty<Order>(); }
        }

        //15
        [HttpGet]
        public ActionResult<Customer> GetProfile(int customerId)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == customerId);
            if(customer != null)
            {
                return new ActionResult<Customer>(customer);
            }
            else
            {
                return NotFound();
            }
        }

        //16
        [HttpPatch("updateprofile")]
        public ActionResult<Customer> UpdateProfile([FromBody] CustomerBody customer)
        {
            var updatedCustomer = _context.Customers.FirstOrDefault(
                c => c.CustomerId == customer.CustomerId);
            if(updatedCustomer != null)
            {
                updatedCustomer.Name = customer.Name;
                updatedCustomer.HomeAddress = customer.HomeAddress;
                updatedCustomer.WorkAddress = customer.WorkAddress;
                updatedCustomer.Pincode = customer.Pincode;
                updatedCustomer.Email = customer.Email;
                updatedCustomer.MobNo = customer.MobNo;
                _context.SaveChanges();
                return new ActionResult<Customer>(updatedCustomer);
            }
            else
            {
                return NotFound();
            }
        }

        //17
        [HttpPatch("changepassword")]
        public ActionResult<Customer> ChangePassword(int customerId, [FromBody] string password)
        {
            var customer = _context.Customers.FirstOrDefault(
                c => c.CustomerId == customerId);
            if(customer != null)
            {
                customer.Password = password;
                _context.SaveChanges();
                return new ActionResult<Customer>(customer);
            }
            else
            {
                return NotFound();
            }
        }
        
        //18
        [HttpPost("feedback")]
        public ActionResult<FeedbackComplaint> GiveFeedback([FromBody] FeedbackComplaint feedback)
        {
            _context.FeedbackComplaints.Add(feedback);
            _context.SaveChanges();
            return new ActionResult<FeedbackComplaint>(feedback);
        }

        //19
        [HttpPost("addtofavorites")]
        public ActionResult<Favorite> AddToFavorites([FromBody] Favorite favorite)
        {
            _context.Favorites.Add(favorite);
            _context.SaveChanges();
            return new ActionResult<Favorite>(favorite);
        }

        //20
        [HttpPost("purchaseplan")]
        public ActionResult<SubscriptionPurchase> PurchasePlan([FromBody] SubscriptionPurchase subscription)
        {
            _context.SubscriptionPurchases.Add(subscription);
            _context.SaveChanges();
            return new ActionResult<SubscriptionPurchase>(subscription);
        }

        //21
        [HttpPatch("cancelplan")]
        public ActionResult<SubscriptionPurchase> CancelPlan(int purchaseId) 
        {
            var plan = _context.SubscriptionPurchases.FirstOrDefault(
                p => p.PurchaseId ==  purchaseId);
            if(plan != null)
            {
                plan.Status = "inactive";
                _context.SaveChanges();
                return new ActionResult<SubscriptionPurchase>(plan);
            }
            else
            { return NotFound(); }
        }
    }
}
