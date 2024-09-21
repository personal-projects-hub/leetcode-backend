import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const apiEnv = createEnv({
    server: {
        TZ: z.string().default("Etc/UTC"), // Timezone default
        VERCEL_ENV: z
            .union([
                z.literal("production"),
                z.literal("preview"),
                z.literal("development"),
            ])
            .default("development"), // Vercel environment
        USER_APP_URL: z.string().url(), // User app URL
        DATABASE_URL: z.string().url(), // Database URL
    },
    client: {},
    runtimeEnv: {
        TZ: process.env.TZ, // Access timezone from environment
        VERCEL_ENV: process.env.VERCEL_ENV, // Vercel environment
        USER_APP_URL: process.env.USER_APP_URL, // User app URL
        DATABASE_URL: process.env.DATABASE_URL, // Database URL
    },
});
