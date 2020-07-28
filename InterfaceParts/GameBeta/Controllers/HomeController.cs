using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GameBeta.Models;
using Microsoft.EntityFrameworkCore;

namespace GameBeta.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationContext db;

        public HomeController( ApplicationContext context)
        {
           db = context;
        }

        public IActionResult Index()
        {
            return View(db.Packs.ToList());
        }

        public IActionResult MyPacks()
        {
            return View(db.UserPacks.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(MyPack pack)
        {
            db.UserPacks.Add(pack);
            await db.SaveChangesAsync();
            return RedirectToAction("MyPacks");
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id != null)
            {
                MyPack pack = await db.UserPacks.FirstOrDefaultAsync(p => p.Id == id);
                if (pack != null)
                {
                    db.UserPacks.Remove(pack);
                    await db.SaveChangesAsync();
                    return RedirectToAction("MyPacks");
                }
            }
            return NotFound();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
