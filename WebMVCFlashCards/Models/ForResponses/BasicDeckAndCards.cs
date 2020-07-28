using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebMVCFlashCards.Models;

namespace WebMVCFlashCards.Models.ForResponses
{
    public class BasicDeckAndCards
    {
        public List<BasicDeck> Deck { get; set; }

        public List<BasicCard> Cards {get; set;}

    }
}
