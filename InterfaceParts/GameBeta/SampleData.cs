using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameBeta.Models;

namespace GameBeta
{
    public class SampleData
    {
        public static void Initialize(ApplicationContext context)
        {
            if (!context.Packs.Any())
            {
                context.Packs.AddRange(
                    new Pack
                    {
                        Name = "Животные",
                        Cards = 30                  
                    },
                    new Pack
                    {
                        Name = "Люди",
                        Cards = 20
                    },
                    new Pack
                    {
                        Name = "Транспорт",
                        Cards = 43
                    },
                    new Pack
                    {
                        Name = "Цвета",
                        Cards = 27
                    },
                    new Pack
                    {
                        Name = "Дом",
                        Cards = 31
                    },
                    new Pack
                    {
                        Name = "Фигуры",
                        Cards = 14
                    },
                    new Pack
                    {
                        Name = "Еда",
                        Cards = 46
                    },
                    new Pack
                    {
                        Name = "Одежда",
                        Cards = 37
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
