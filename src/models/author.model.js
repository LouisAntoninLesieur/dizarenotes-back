import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Author extends Model {}

Author.init(
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    sequelize,
    tableName: "author",
  }
)

// This is a model file that defines the Author model.
// The Author model represents an author in the database.
// The Author model has three fields: userName, email, and password.
