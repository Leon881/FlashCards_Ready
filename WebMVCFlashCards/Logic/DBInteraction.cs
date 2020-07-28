using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebMVCFlashCards.Models.ForResponses;
using WebMVCFlashCards.Models;
using Newtonsoft.Json;

namespace WebMVCFlashCards.Logic
{
    abstract class DBInteraction
    {
        public static readonly string[] StatusCode = {"Success", "Incorrect Deck Id", "Such a deck does not exist", "This user already has a deck with this id"};
        
        public static int AddDeck(UserDeckAndCards newUserDeck, FlashCardsContext db, int userIdentityId)
        {            
            newUserDeck.Deck[0].UserId = userIdentityId;
            foreach(var card in newUserDeck.Cards)
            {
                card.UserId = userIdentityId;
            }
            if (GetUserDeck(newUserDeck.Deck[0].UserId, newUserDeck.Deck[0].DeckId, db).Count != 0) return 3;
            db.UsersDecks.Add(newUserDeck.Deck[0]);
            foreach (var card in newUserDeck.Cards)
            {
                db.UsersCards.Add(card);
            }
            db.SaveChanges();
            return 0;
        }
        public static int RemoveDeck(int userId, string strUserDeckId, FlashCardsContext db)
        {                    
            if ((Int32.TryParse(strUserDeckId, out int userDeckId) == false) || (userDeckId < 1)) return 1;
            var result = GetUserDeckAndCards(userId, userDeckId, db);
            if (result.Deck.Count == 0) return 2;
            db.UsersDecks.Remove(result.Deck[0]);
            db.UsersCards.RemoveRange(result.Cards);
            db.SaveChanges();
            return 0;
        }    

        public static UserDeckAndCards GetUserDeckAndCards(int userId, int userDeckId, FlashCardsContext db)
        {
            var result = new UserDeckAndCards();
            result.Deck = GetUserDeck(userId, userDeckId, db);
            result.Cards = GetUserCards(userId, userDeckId, db);           
            return result;
        }

        

        public static List<UserDeck> GetUserDecks(int userId, FlashCardsContext db)
        { 
            return db.UsersDecks.Where(usersDecks => usersDecks.UserId == userId).ToList();                     
        }

        public static List<UserDeck> GetUserDeck(int userId,int userDeckId, FlashCardsContext db)
        {
            return db.UsersDecks.Where(usersDecks => (usersDecks.UserId == userId) && (usersDecks.DeckId == userDeckId)).ToList();
        }

        public static List<UserCard> GetUserCards(int userId, int userDeckId, FlashCardsContext db)
        {
            return db.UsersCards.Where(usersCards => (usersCards.UserId == userId) && (usersCards.DeckId == userDeckId)).ToList();
        }


    }
}
