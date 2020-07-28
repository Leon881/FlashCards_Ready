using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebMVCFlashCards.Models
{
    public class BasicCard
    {
        
        public int DeckId { get; set; }
  
        public int CardId { get; set; }
        
        public string Eng { get; set; }

        public string Rus { get; set; }
    }
}
