using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebMVCFlashCards.Models;
using System.Threading.Tasks;
using System.Text.Json;

namespace WebMVCFlashCards.Controllers
{
    [Route("[controller]")]
    public class BasicDecksController : ControllerBase
    {
        FlashCardsContext db;
        public BasicDecksController(FlashCardsContext context)
        {
            db = context;          
        }

        [HttpGet]
        public JsonResult GetAllBasicDecks()
        {
            return new JsonResult(db.BasicDecks.ToList());
        }
        /* Пока не нужно
        [HttpGet("{count}")]
        public JsonResult GetAllBasicDecksCount()
        {
            return new JsonResult(db.BasicDecks.Count());
        }
        */

    }
}