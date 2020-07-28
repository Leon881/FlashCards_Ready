using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebMVCFlashCards.Models;
using WebMVCFlashCards.Models.ForResponses;
using WebMVCFlashCards.Logic;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebMVCFlashCards.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class UserDeckController : Controller
    {
        FlashCardsContext db;
        public UserDeckController(FlashCardsContext context)
        {
            db = context;
        }

        [HttpGet]
        public JsonResult GetUserDeckAndCardsByDeckId()
        {
            var userIdentityId = db.Users.FirstOrDefault(users => users.Login == User.Identity.Name).Id;
            if ((Int32.TryParse(Request.Query["deckid"].ToString(), out int userDeckId) == false) || (userDeckId < 1)) return new JsonResult("Incorrect Deck Id");
            var result = DBInteraction.GetUserDeckAndCards(userIdentityId, userDeckId, db);
            return result.Deck.Count == 0 ? new JsonResult("Deck Not Fount") : new JsonResult(result);
        }
    }
}
