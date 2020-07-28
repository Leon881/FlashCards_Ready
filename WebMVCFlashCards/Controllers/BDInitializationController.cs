using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebMVCFlashCards.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebMVCFlashCards.Controllers
{
    [Route("[controller]")]
    public class BDInitializationController : Controller
    {
        FlashCardsContext db;
        public BDInitializationController(FlashCardsContext context)
        {
            db = context;
            if (!db.UsersDecks.Any())
            {
                db.Users.Add(new User { Login = "vadim", Password = "12345" });
                db.Users.Add(new User { Login = "sasha", Password = "12345" });
                db.Users.Add(new User { Login = "maxim", Password = "12345" });
                db.SaveChanges();

                db.BasicDecks.Add(new BasicDeck { Title = "Animals", Progress = 0, Size = 3 });
                db.BasicCards.Add(new BasicCard { DeckId = 1, CardId = 1, Eng = "Chicken", Rus = "Курица" });
                db.BasicCards.Add(new BasicCard { DeckId = 1, CardId = 2, Eng = "Girraffe", Rus = "Жираф" });
                db.BasicCards.Add(new BasicCard { DeckId = 1, CardId = 0, Eng = "Elephant", Rus = "Слон" });
                db.SaveChanges();

                db.BasicDecks.Add(new BasicDeck { Title = "People", Progress = 0, Size = 3 });
                db.BasicCards.Add(new BasicCard { DeckId = 2, CardId = 1, Eng = "Man", Rus = "Мужчина" });
                db.BasicCards.Add(new BasicCard { DeckId = 2, CardId = 2, Eng = "Woman", Rus = "Женщина" });
                db.BasicCards.Add(new BasicCard { DeckId = 2, CardId = 0, Eng = "Child", Rus = "Ребёнок" });
                db.SaveChanges();

                db.BasicDecks.Add(new BasicDeck { Title = "Sport", Progress = 0, Size = 3 });
                db.BasicCards.Add(new BasicCard { DeckId = 3, CardId = 1, Eng = "Football", Rus = "Футбол" });
                db.BasicCards.Add(new BasicCard { DeckId = 3, CardId = 2, Eng = "Basketball", Rus = "Баскетбол" });
                db.BasicCards.Add(new BasicCard { DeckId = 3, CardId = 0, Eng = "Swimming", Rus = "Плавание" });
                db.SaveChanges();

                db.BasicDecks.Add(new BasicDeck { Title = "IT", Progress = 0, Size = 3 });
                db.BasicCards.Add(new BasicCard { DeckId = 4, CardId = 1, Eng = "Computer", Rus = "Компьютер" });
                db.BasicCards.Add(new BasicCard { DeckId = 4, CardId = 2, Eng = "Screen", Rus = "Экран" });
                db.BasicCards.Add(new BasicCard { DeckId = 4, CardId = 0, Eng = "Keyboard", Rus = "Клавиатура" });
                db.SaveChanges();


                db.UsersDecks.Add(new UserDeck { DeckId = 1, UserId = 1, Title = "Colors", Progress = 0, Size = 10 });
                db.UsersCards.Add(new UserCard { CardId = 1, DeckId = 1, UserId = 1, Eng = "Red", Rus = "Красный"});
                db.UsersCards.Add(new UserCard { CardId = 2, DeckId = 1, UserId = 1, Eng = "Green", Rus = "Зелёный"});
                db.UsersCards.Add(new UserCard { CardId = 3, DeckId = 1, UserId = 1, Eng = "Blue", Rus = "Синий" });
                db.UsersCards.Add(new UserCard { CardId = 4, DeckId = 1, UserId = 1, Eng = "Yellow", Rus = "Жёлтый" });
                db.UsersCards.Add(new UserCard { CardId = 5, DeckId = 1, UserId = 1, Eng = "Black", Rus = "Чёрный" });
                db.UsersCards.Add(new UserCard { CardId = 6, DeckId = 1, UserId = 1, Eng = "White", Rus = "Белый"});
                db.UsersCards.Add(new UserCard { CardId = 7, DeckId = 1, UserId = 1, Eng = "Pink", Rus = "Розовый" });
                db.UsersCards.Add(new UserCard { CardId = 8, DeckId = 1, UserId = 1, Eng = "Orange", Rus = "Оранжевый" });
                db.UsersCards.Add(new UserCard { CardId = 9, DeckId = 1, UserId = 1, Eng = "Brown", Rus = "Коричневый" });
                db.UsersCards.Add(new UserCard { CardId = 0, DeckId = 1, UserId = 1, Eng = "Gray", Rus = "Серый" });
                db.SaveChanges();

                db.UsersDecks.Add(new UserDeck { DeckId = 2, UserId = 1, Title = "Transport", Progress = 0, Size = 12 });
                db.UsersCards.Add(new UserCard { CardId = 1, DeckId = 2, UserId = 1, Eng = "Car", Rus = "Автомобиль"});
                db.UsersCards.Add(new UserCard { CardId = 2, DeckId = 2, UserId = 1, Eng = "Bus", Rus = "Автобус" });
                db.UsersCards.Add(new UserCard { CardId = 3, DeckId = 2, UserId = 1, Eng = "Airplane", Rus = "Самолёт"});
                db.UsersCards.Add(new UserCard { CardId = 4, DeckId = 2, UserId = 1, Eng = "Truck", Rus = "Грузовик" });
                db.UsersCards.Add(new UserCard { CardId = 5, DeckId = 2, UserId = 1, Eng = "Helicopter", Rus = "Вертолёт" });
                db.UsersCards.Add(new UserCard { CardId = 6, DeckId = 2, UserId = 1, Eng = "Motorcycle", Rus = "Мотоцикл" });
                db.UsersCards.Add(new UserCard { CardId = 7, DeckId = 2, UserId = 1, Eng = "Boat", Rus = "Лодка"});
                db.UsersCards.Add(new UserCard { CardId = 8, DeckId = 2, UserId = 1, Eng = "Ship", Rus = "Корабль" });
                db.UsersCards.Add(new UserCard { CardId = 9, DeckId = 2, UserId = 1, Eng = "Train", Rus = "Поезд"});
                db.UsersCards.Add(new UserCard { CardId = 10, DeckId = 2, UserId = 1, Eng = "Scooter", Rus = "Скутер" });
                db.UsersCards.Add(new UserCard { CardId = 11, DeckId = 2, UserId = 1, Eng = "Bicycle", Rus = "Велосипед" });
                db.UsersCards.Add(new UserCard { CardId = 0, DeckId = 2, UserId = 1, Eng = "Van", Rus = "Фургон" });
                db.SaveChanges();

                db.UsersDecks.Add(new UserDeck { DeckId = 1, UserId = 2, Title = "Sport", Progress = 0, Size = 4 });
                db.UsersCards.Add(new UserCard { CardId = 1, DeckId = 1, UserId = 2, Eng = "Football", Rus = "Футбол"});
                db.UsersCards.Add(new UserCard { CardId = 2, DeckId = 1, UserId = 2, Eng = "Swimming", Rus = "Плавание" });
                db.UsersCards.Add(new UserCard { CardId = 3, DeckId = 1, UserId = 2, Eng = "Box", Rus = "Бокс"});
                db.UsersCards.Add(new UserCard { CardId = 0, DeckId = 1, UserId = 2, Eng = "Kybersport", Rus = "Киберспорт"});              
                db.SaveChanges();

                db.UsersDecks.Add(new UserDeck { DeckId = 1, UserId = 3, Title = "Letters", Progress = 0, Size = 4 });
                db.UsersCards.Add(new UserCard { CardId = 1, DeckId = 1, UserId = 3, Eng = "a", Rus = "а" });
                db.UsersCards.Add(new UserCard { CardId = 2, DeckId = 1, UserId = 3, Eng = "b", Rus = "б" });
                db.UsersCards.Add(new UserCard { CardId = 3, DeckId = 1, UserId = 3, Eng = "c", Rus = "ц" });
                db.UsersCards.Add(new UserCard { CardId = 0, DeckId = 1, UserId = 3, Eng = "d", Rus = "д" });
                db.SaveChanges();
            }
        }

        [HttpGet]
        public JsonResult GetAllBasicDecks()
        {
            return new JsonResult("Database initialized!");
        }

    }
}
