using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;
using NutritiffBackend.Models;

namespace NutritiffBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly NutritiffContext _context;

        public AdminsController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        [HttpPost("login")]
        public ActionResult<Admin> Login([FromBody] String password)
        {
            var admin = _context.Admins.FirstOrDefault(
                a => a.Password == password);
            if (admin != null)
            {
                return new ActionResult<Admin>(admin);
            }
            else { return NotFound(); }
        }

        //2
        [HttpGet("showpendingrequests")]
        public IEnumerable<Request> ShowPendingRequests()
        {
            var query = from vendor in _context.Vendors
                        join approvalRequest in _context.ApprovalRequests
                            on vendor.VendorId equals approvalRequest.VendorId
                        where approvalRequest.Status == "pending"
                        select new Request
                        {
                            VendorId = vendor.VendorId,
                            Name = vendor.Name,
                            Address = vendor.Address,
                            Pincode = vendor.Pincode,
                            Email = vendor.Email,
                            MobNo = vendor.MobNo
                        };
            var results = query.ToList();
            return results;
        }

        //3
        [HttpGet("showrequesthistory")]
        public IEnumerable<Request> ShowRequestHistory()
        {
            var query = from vendor in _context.Vendors
                        join approvalRequest in _context.ApprovalRequests
                            on vendor.VendorId equals approvalRequest.VendorId
                        select new Request
                        {
                            VendorId = vendor.VendorId,
                            Name = vendor.Name,
                            Address = vendor.Address,
                            Pincode = vendor.Pincode,
                            Email = vendor.Email,
                            MobNo = vendor.MobNo
                        };
            var results = query.ToList();
            return results;
        }

        //4
        [HttpPatch("approve")]
        public ActionResult<ApprovalRequest> ApproveTheVendor(int requestId)
        {
            var requestToApprove = _context.ApprovalRequests.FirstOrDefault(
                r => r.ReqId == requestId);
            if (requestToApprove != null)
            {
                requestToApprove.Status = "approved";
                _context.SaveChanges();
                return new ActionResult<ApprovalRequest>(requestToApprove);
            }
            else { return NotFound(); }
        }

        //5
        [HttpPatch("reject")]
        public ActionResult<ApprovalRequest> RejectTheVendor(int requestId)
        {
            var requestToApprove = _context.ApprovalRequests.FirstOrDefault(
                r => r.ReqId == requestId);
            if (requestToApprove != null)
            {
                requestToApprove.Status = "rejected";
                _context.SaveChanges();
                return new ActionResult<ApprovalRequest>(requestToApprove);
            }
            else { return NotFound(); }
        }

        //6
        [HttpGet("showapprovedvendors")]
        public IEnumerable<Vendor> ShowApprovedVendors()
        {
            return _context.Vendors.Where(v => v.Status == "approved").ToList();
        }

        //7
        [HttpGet("showallfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowAllFeedbacks()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var results = query.ToList();
            return results;
        }

        //8
        [HttpGet("showonlyfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowOnlyFeedbacks()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Category == "feedback"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var results = query.ToList();
            return results;
        }

        //9
        [HttpGet("showonlycomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowOnlyComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Category == "complaint"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var results = query.ToList();
            return results;
        }

        //10
        [HttpGet("showunderreviewcomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowUnderReviewComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Status == "under review"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var results = query.ToList();
            return results;
        }

        //11
        [HttpGet("showresolvedcomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowResolvedComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Status == "resolved"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var results = query.ToList();
            return results;
        }

        //12
        [HttpGet("showescalatedcomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowEscalatedComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Status == "escalated"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var results = query.ToList();
            return results;
        }

        //13
        [HttpPatch("resolvecomplaint")]
        public ActionResult<FeedbackComplaint> ResolveComplaint(int complaintId)
        {
            var complaintToResolve = _context.FeedbackComplaints.FirstOrDefault(
                c => c.FcId == complaintId);
            if(complaintToResolve != null)
            {
                complaintToResolve.Status = "resolved";
                _context.SaveChanges();
                return new ActionResult<FeedbackComplaint>(complaintToResolve);
            }
            else { return NotFound(); }
        }

        //14
        [HttpPatch("escalatecomplaint")]
        public ActionResult<FeedbackComplaint> EscalateComplaint(int complaintId)
        {
            var complaintToResolve = _context.FeedbackComplaints.FirstOrDefault(
                c => c.FcId == complaintId);
            if (complaintToResolve != null)
            {
                complaintToResolve.Status = "escalated";
                _context.SaveChanges();
                return new ActionResult<FeedbackComplaint>(complaintToResolve);
            }
            else { return NotFound(); }
        }
    }
}
