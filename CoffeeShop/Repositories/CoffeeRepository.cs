using System.Collections.Generic;

using CoffeeShop.Models;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace CoffeeShop.Repositories
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private readonly string _connectionString;
        public CoffeeRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }
        private SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }

        public List<Coffee> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Select c.Id, c.Title, c.BeanVarietyId,
                               bV.[Name] BVName, bV.Region BVRegion, bV.Notes BVNotes
                        FROM dbo.Coffee c
                        LEFT JOIN dbo.BeanVariety bV ON c.BeanVarietyId = bV.id
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Coffee> coffees = new();

                        while (reader.Read())
                        {
                            Coffee newCoffee = new()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                BeanVarietyId = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                                BeanVariety = new()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                                    Name = reader.GetString(reader.GetOrdinal("BVName")),
                                    Region = reader.GetString(reader.GetOrdinal("BVRegion")),
                                    Notes = reader.IsDBNull(reader.GetOrdinal("BVNotes")) ? null : reader.GetString(reader.GetOrdinal("BVNotes"))
                                }
                            };

                            coffees.Add(newCoffee);
                        }

                        return coffees;
                    }
                }
            }
        }

        public Coffee GetById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Select c.Id, c.Title, c.BeanVarietyId,
                               bV.[Name] BVName, bV.Region BVRegion, bV.Notes BVNotes
                        FROM dbo.Coffee c
                        LEFT JOIN dbo.BeanVariety bV ON c.BeanVarietyId = bV.id
                        WHERE c.Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Coffee coffee = null;

                        if (reader.Read())
                        {
                            coffee = new()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Title = reader.GetString(reader.GetOrdinal("Title")),
                                BeanVarietyId = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                                BeanVariety = new()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("BeanVarietyId")),
                                    Name = reader.GetString(reader.GetOrdinal("BVName")),
                                    Region = reader.GetString(reader.GetOrdinal("BVRegion")),
                                    Notes = reader.IsDBNull(reader.GetOrdinal("BVNotes")) ? null : reader.GetString(reader.GetOrdinal("BVNotes"))
                                }
                            };
                        }

                        return coffee;
                    }
                }
            }
        }

        public void Add(Coffee coffee)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO dbo.Coffee (Title, BeanVarietyId)
                        VALUES (@title, @beanVarietyId)
                    ";

                    cmd.Parameters.AddWithValue("@title", coffee.Title);
                    cmd.Parameters.AddWithValue("@beanVarietyId", coffee.BeanVarietyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM dbo.Coffee
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Coffee coffee)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE dbo.Coffee
                        SET Title = @title, BeanVarietyId = @beanVarietyId
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", coffee.Id);
                    cmd.Parameters.AddWithValue("@title", coffee.Title);
                    cmd.Parameters.AddWithValue("@beanVarietyId", coffee.BeanVarietyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
