using System.Collections.Generic;

using CoffeeShop.Models;

namespace CoffeeShop.Repositories
{
    public interface ICoffeeRepository
    {
        void Add(Coffee coffee);
        void DeleteById(int id);
        List<Coffee> GetAll();
        Coffee GetById(int id);
        void Update(Coffee coffee);
    }
}