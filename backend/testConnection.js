const { Client } = require("pg");

// Connection string you want to validate
const connectionString = "postgres://ashok:ashok@localhost:5432/login-app";

const client = new Client({
  connectionString: connectionString,
});

client
  .connect()
  .then(() => {
    console.log("Connected successfully to the database.");
    return client.end(); // Close the connection
  })
  .catch((err) => {
    console.error("Connection error:", err.message);
  });
