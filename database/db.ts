import "https://deno.land/std@0.177.0/dotenv/load.ts";
import { Database, PostgresConnector } from "https://deno.land/x/denodb/mod.ts";

const databaseUrl = Deno.env.get("DATABASE_URL") || "";
const connector = new PostgresConnector({ uri: databaseUrl });
const db = new Database(connector);

export default db;
