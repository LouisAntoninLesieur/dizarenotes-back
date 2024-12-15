import { Author } from "./author.model.js";
import { Note } from "./note.model.js";
import { Comment } from "./comment.model.js";
import { Tag } from "./tag.model.js";
import { sequelize } from "./sequelize-client.js";

Author.hasMany(Note, { foreignKey: "author_id" });
Note.belongsTo(Author, { foreignKey: "author_id" });

Author.hasMany(Comment, { foreignKey: "author_id" });
Comment.belongsTo(Author, { foreignKey: "author_id" });

Note.hasMany(Comment, { foreignKey: "note_id" });
Comment.belongsTo(Note, { foreignKey: "note_id" });

Note.belongsToMany(Tag, { through: "note_tags", foreignKey: "note_id" });
Tag.belongsToMany(Note, { through: "note_tags", foreignKey: "tag_id" });

export { Author, Note, Comment, Tag, sequelize };

// This is an association file that defines the associations between the Author, Note, Comment, and Tag models.
// The associations between the models are defined using the Sequelize association methods.
// Once the associations are defined, you can use them to query related data from the database.
// This way, you can easily retrieve data from multiple tables and perform complex queries.
// Exporting the models and the sequelize instance from this file allows you to import them in other files and use them from the same instance.