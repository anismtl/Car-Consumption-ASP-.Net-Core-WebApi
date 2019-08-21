
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CarsWebApi.Models
{
    public class Cars
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int Annee { get; set; }

        public string Marque { get; set; }

        public string Modele { get; set; }

        public decimal ConsomationVille { get; set; }





    }
}
