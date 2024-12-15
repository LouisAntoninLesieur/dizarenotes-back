import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize-client.js";

export class NoteTag extends Model {}

NoteTag.init(
  {
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "note_tags",
  }
);