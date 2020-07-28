using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebMVCFlashCards.Models.ForResponses
{
    public class UserDeckAndCards
    {
        public List<UserDeck> Deck { get; set; }

        public List<UserCard> Cards { get; set; }
    }
}
