import "dotenv/config";
import { Sequelize } from "sequelize";
import { interpolate } from "../utils/interpolate.js";

const pgUrl = interpolate(process.env.PG_URL, process.env);

// Create a new Sequelize instance
export const sequelize = new Sequelize(pgUrl, {
	define: {
		createdAt: "created_at",
		updatedAt: "updated_at",
	},
});

// Why to use a sequelize-client.js file ?
// Using a sequelize-client.js file allows you to create a single instance of the Sequelize object and reuse it throughout your application.
// This way, you can avoid creating a new instance of the Sequelize object every time you need to interact with the database.