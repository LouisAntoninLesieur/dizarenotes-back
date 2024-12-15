import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class Tag extends Model {}

Tag.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: "tags",
});