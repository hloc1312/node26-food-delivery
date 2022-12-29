const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());

// Tạo kết nối db bằng Sequelize
const sequelize = new Sequelize("node26-food", "root", "1234", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

// Kiểm tra xem có kết nối thành công hay không
sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize Connected");
  })
  .catch((error) => {
    console.log("Sequelize Failed");
    throw error;
  });

// Tạo model để Sequelize liên kết tới table và lấy/thêm/sửa/xoá data
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(50),
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    // bỏ qua createdAt, updatedAt
    timestamps: false,
  }
);

// localhost:4000/api/v1/users
app.get("/api/v1/users", async (req, res) => {
  try {
    // SELECT * FROM users
    const users = await User.findAll();
    // Query DB thành công
    res.status(200).json({ data: users });
  } catch (error) {
    // Query DB thất bại
    res.status(500).json({ error: error });
  }
});

app.listen(4000);
