using Nutritiff.Models;

namespace NutritiffBackend.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }

        public int TiffinId { get; set; }

        public int Quantity { get; set; }

        public double Price { get; set; }

        public virtual Order? Order { get; set; }

        public virtual Tiffin? Tiffin { get; set; }
    }
}
