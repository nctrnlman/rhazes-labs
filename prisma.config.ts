import { config } from "dotenv";
config({ path: ".env" });

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  engine: "classic",
  datasource: {
    url: process.env.POSTGRES_PRISMA_URL!,
    directUrl: process.env.POSTGRES_URL_NON_POOLING!,
  },
});
