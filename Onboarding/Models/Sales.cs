using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace Onboarding.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        [Display(Name = "Date Sold")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DateSold { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
