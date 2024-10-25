const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const insertUsers = async () => {
  try {
    // Hash the password "1234" (use a salt of 10 rounds)
    const hashedPassword = await bcrypt.hash("1234", 10);

    // Generate and insert 100 users
    for (let i = 1; i <= 100; i++) {
      const username = `user${i}`;
      const email = `user${i}@example.com`;
      const firstName = `FirstName${i}`;
      const lastName = `LastName${i}`;

      // Insert each user into the database
      await pool.query(
        `INSERT INTO users (username, email, password, first_name, last_name) 
                 VALUES ($1, $2, $3, $4, $5)`,
        [username, email, hashedPassword, firstName, lastName]
      );

      console.log(`Inserted user ${i}: ${username}`);
    }

    console.log("All users inserted successfully!");
  } catch (error) {
    console.error("Error inserting users:", error);
  } finally {
    pool.end(); // Close the pool connection
  }
};

insertUsers();
