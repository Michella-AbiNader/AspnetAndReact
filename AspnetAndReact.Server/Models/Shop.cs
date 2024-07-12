using System.ComponentModel.DataAnnotations;

namespace AspnetAndReact.Server.Models
{
    public class Shop
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? Category { get; set; }
        public string? ImageUrl { get; set; }
        public string? ThemeColor { get; set; }
        public string? UserId { get; set; }

    }
}
