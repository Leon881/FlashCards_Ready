using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebMVCFlashCards.Models;
using System.Threading.Tasks;
using System.Text.Json;
using Newtonsoft.Json;
using System.IO;
using System;
using WebMVCFlashCards.Models.ForResponses;
using WebMVCFlashCards.Logic;
using Microsoft.AspNetCore.Authorization;

namespace WebMVCFlashCards.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class UsersDecksController : ControllerBase
    {
        FlashCardsContext db;
        public UsersDecksController(FlashCardsContext context)
        {
            db = context;
        }

        [HttpGet]
        public JsonResult DecksList()
        {
            var userIdentityId = db.Users.FirstOrDefault(users => users.Login == User.Identity.Name).Id;
            var resultList = DBInteraction.GetUserDecks(userIdentityId, db);
            return resultList.Count == 0 ? new JsonResult("Decks not found") : new JsonResult(resultList);          
        }
        
        

        [HttpDelete]
        public JsonResult RemoveDeck()
        {
            var userIdentityId = db.Users.FirstOrDefault(users => users.Login == User.Identity.Name).Id;
            return new JsonResult(DBInteraction.StatusCode[DBInteraction.RemoveDeck(userIdentityId, Request.Query["deckid"].ToString(),db)]);  
        }

        [HttpPost]
        public JsonResult UpdateDeck()
        {
            var stream = new StreamReader(Request.Body);
            var body = stream.ReadToEndAsync().Result;
            UserDeckAndCards newUserDeck = JsonConvert.DeserializeObject<UserDeckAndCards>(body);
            var userIdentityId = db.Users.FirstOrDefault(users => users.Login == User.Identity.Name).Id;
            var removeStatus = DBInteraction.RemoveDeck(userIdentityId, newUserDeck.Deck[0].DeckId.ToString(), db);
            return new JsonResult(removeStatus == 0 ? DBInteraction.StatusCode[DBInteraction.AddDeck(newUserDeck, db,userIdentityId)] : DBInteraction.StatusCode[removeStatus]);
        }

        [HttpPost]
        public JsonResult UpdateDeckProgress()
        {
            var stream = new StreamReader(Request.Body);
            var body = stream.ReadToEndAsync().Result;
            var userIdentityId = db.Users.FirstOrDefault(users => users.Login == User.Identity.Name).Id;
            UserDeck updateDeck = JsonConvert.DeserializeObject<UserDeck>(body);
            UserDeck userdbdeck = DBInteraction.GetUserDeck(userIdentityId, updateDeck.DeckId, db)[0];
            if (userdbdeck == null) return new JsonResult("Such a deck does not exist");
            userdbdeck.Progress = updateDeck.Progress;
            db.UsersDecks.Update(userdbdeck);
            db.SaveChanges();
            return new JsonResult("success");
        }

        /* Пока не нужно.
        [HttpGet("{count}")]
        public JsonResult GetAllUsersDecksCount()
        {
            var userId = Request.Query["userid"].ToString();
            var resultList = db.UsersDecks.FromSqlRaw("SELECT * FROM UsersDecks WHERE UserId=" + userId).ToList();
            return new JsonResult(resultList.Count());
        }
        */


    }
}