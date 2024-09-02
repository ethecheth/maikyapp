namespace maikyapi.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public string CategoryId { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
