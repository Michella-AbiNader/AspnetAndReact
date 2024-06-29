using System.ComponentModel.DataAnnotations;

namespace AspnetAndReact.Server.Models
{
    public class Cart
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int ShopId { get; set; }
        [Required]
        public int Quantity { get; set; }

    }
}

