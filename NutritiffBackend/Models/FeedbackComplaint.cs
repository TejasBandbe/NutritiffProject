using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class FeedbackComplaint
{
    public int FcId { get; set; }

    public int CustomerId { get; set; }

    public int TiffinId { get; set; }

    public int VendorId { get; set; }

    public string Category { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime Timestamp { get; set; }

    public string? Status { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual Tiffin? Tiffin { get; set; }

    public virtual Vendor? Vendor { get; set; }
}
