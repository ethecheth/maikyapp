namespace maikyapi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductId { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public string ProductDescription { get; set; } = string.Empty;
        public string ProductCategoryId { get; set; } = string.Empty;
        public decimal ProductPrice { get; set; }
        public decimal ProductQuantity { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? CreateBy { get; set; }
        public DateTime createDate { get; set; }
        public string? UpdateBy { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
