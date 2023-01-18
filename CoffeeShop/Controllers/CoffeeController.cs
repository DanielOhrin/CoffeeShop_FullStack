using CoffeeShop.Models;
using CoffeeShop.Repositories;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoffeeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {
        private readonly ICoffeeRepository _coffeeRepository;
        public CoffeeController(ICoffeeRepository coffeeRepo)
        {
            _coffeeRepository = coffeeRepo;
        }

        // GET: api/coffee
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_coffeeRepository.GetAll());
        }

        // GET api/coffee/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Coffee coffee = _coffeeRepository.GetById(id);

            if (coffee == null)
            {
                return NotFound();
            }

            return Ok(coffee);
        }

        // POST api/coffee
        [HttpPost]
        public IActionResult Post([FromBody] Coffee coffee)
        {
            _coffeeRepository.Add(coffee);
            return CreatedAtAction("Get", new { id = coffee.Id }, coffee);           
        }

        // PUT api/coffee/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Coffee coffee)
        {
            if (id != coffee.Id)
            {
                return BadRequest();
            }

            _coffeeRepository.Update(coffee);
            return NoContent();
        }

        // DELETE api/coffee/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _coffeeRepository.DeleteById(id);
            return NoContent();
        }
    }
}
