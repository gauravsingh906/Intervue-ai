import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_DpHw4KoXSR0j@ep-square-fog-a882dajy-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  },
});
