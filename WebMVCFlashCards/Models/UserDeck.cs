using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebMVCFlashCards.Models
{
    public class UserDeck
    {
        public int UserId { get; set; }
        public int DeckId { get; set; }
      
        public string Title { get; set; }

        public int Progress { get; set; }

        public int Size { get; set; }


    }
}

