using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarsWebApi.Models;
using CarsWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarsWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarsService _carsService;

        public CarsController(CarsService carsService)
        {
            _carsService = carsService;
        }


        [HttpGet]
        public ActionResult<List<Cars>> Get() => _carsService.Get();



        [HttpGet("{id:length(24)}", Name = "GetCar")]
        public ActionResult<Cars> Get(string id)
        {
            var car = _carsService.Get(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        [HttpPost]
        public ActionResult<Cars> Create(Cars cars) => _carsService.Create(cars);


        [HttpPut("{id:length(24)}")]
        public void Update(string id, Cars carsIn) => _carsService.Update(id, carsIn);

        [HttpDelete("{id:length(24)}")]
        public void Delete(string id) => _carsService.Remove(id);

        [HttpDelete]
        public void Delete(Cars carsIn) => _carsService.Remove(carsIn);
    }
}