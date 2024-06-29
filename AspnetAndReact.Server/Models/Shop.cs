using System.ComponentModel.DataAnnotations;

namespace AspnetAndReact.Server.Models
{
    public class Shop
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
        public string ThemeColor { get; set; }
        [Required]
        public string UserId { get; set; }

    }
}
