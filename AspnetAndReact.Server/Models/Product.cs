﻿using System.ComponentModel.DataAnnotations;

namespace AspnetAndReact.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public string? ShopId { get; set; }
        [Required]
        public string CategoryId { get; set; }

    }
}
