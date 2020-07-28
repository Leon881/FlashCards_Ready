using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebMVCFlashCards.Models;
using WebMVCFlashCards.Models.ForResponses;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebMVCFlashCards.Controllers
{
    [Route("[controller]")]
    public class BasicDeckController : Controller
    {
        FlashCardsContext db;
        public BasicDeckController(FlashCardsContext context)
        {
            db = context;           
        }

        [HttpGet]
        public JsonResult GetBasicDeckAndCardsByDeckId()
        {
            var result = new BasicDeckAndCards();            
            if((Int32.TryParse(Request.Query["deckid"].ToString(),out int basicDeckId)==false)||(basicDeckId<1)) return new JsonResult("Incorrect Deck Id");          
            result.Deck = db.BasicDecks.Where(basicDecks => basicDecks.DeckId == basicDeckId).ToList();
            result.Cards = db.BasicCards.Where(basicCards => basicCards.DeckId == basicDeckId).ToList();
            return result.Deck.Count==0? new JsonResult("Deck Not Fount"):new JsonResult(result);
        }

    }
}
