const db = require("../config/db");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const getUsers = async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database query error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results, fields] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    if (results.length > 0) {
      const user = results[0];

      // Simple password match (consider using bcrypt for production)
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.status(200).json({
          message: "Login successful",
          user: {
            username: user.username,
            student_id: user.student_id,
            course: user.course,
            name: user.name,
            role: user.role, // Include role in the response
          },
        });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database query error" });
  }
};

const signupStudent = async (req, res) => {
  const { studentId, name, course, age, username, password } = req.body;

  // Check if all fields are provided
  if (!studentId || !name || !course || !age || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists by username
    const [existingUsers, fields] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Insert new user into the database
    const query =
      "INSERT INTO users (student_id, name, course, age, username, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const values = [
      studentId,
      name,
      course,
      age,
      username,
      hashedPassword,
      "student",
    ];

    const [result, fieldsInsert] = await db.query(query, values);

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "Account created successfully" });
    } else {
      throw new Error("Failed to create account");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database query error" });
  }
};

module.exports = {
  getUsers,
  loginUser,
  signupStudent,
};
