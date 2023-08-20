using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class Vendor
{
    public int VendorId { get; set; }

    public string Name { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string Pincode { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string MobNo { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string ActiveStatus { get; set; } = null!;

    public virtual ICollection<ApprovalRequest> ApprovalRequests { get; set; } = new List<ApprovalRequest>();

    public virtual ICollection<FeedbackComplaint> FeedbackComplaints { get; set; } = new List<FeedbackComplaint>();

    public virtual ICollection<Tiffin> Tiffins { get; set; } = new List<Tiffin>();
}
