using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebMVCFlashCards.Models
{
    public class BasicDeck
    {        
        public int DeckId { get; set; }
        public string Title { get; set; }

        public int Progress { get; set; }

        public int Size { get; set; }

    }
}
