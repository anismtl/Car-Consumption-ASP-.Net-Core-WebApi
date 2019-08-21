using CarsWebApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarsWebApi.Services
{
    public class CarsService
    {
        private readonly IMongoCollection<Cars> _cars;

        public CarsService(ICarsDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _cars = database.GetCollection<Cars>(settings.CarsCollectionName);

        }
        public List<Cars> Get() => _cars.Find(cars => true).ToList();
        public Cars Get(string id) => _cars.Find<Cars>(cars => cars.Id == id).FirstOrDefault();

        public Cars Create(Cars cars)
        {
            _cars.InsertOne(cars);
            return cars;
        }

        public void Update(string id, Cars carsIn) =>
            _cars.ReplaceOne(cars => cars.Id == id, carsIn);

        public void Remove(Cars carsIn) =>
            _cars.DeleteOne(cars => cars.Id == carsIn.Id);

        public void Remove(string id) =>
            _cars.DeleteOne(cars => cars.Id == id);


    }
}
