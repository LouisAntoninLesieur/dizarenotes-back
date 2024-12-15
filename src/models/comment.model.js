import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Comment extends Model {}

Comment.init({
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: "comments",
})