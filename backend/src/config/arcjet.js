import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ENV } from "./env.js";

//* Initialize Arcjet with Securty Rules
export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //? What is SHIELD? : Shield protects your app from common attacks (ej. SQL Injections, XSS, CSRF Attacks)
    shield({ mode: "LIVE" }),

    //? What is Bot Detection? : It blocks all bots expcept search engines
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // "CATEGORY:ACADEMIC" - Full list: https://arcjet.com/bot-list (this is if we want to add more)
      ],
    }),

    //? What is TokenBucket? : It's a rate limiting with token buckets algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // Tokens added per interval
      interval: 10, // Interval in Seconds (10 s)
      capacity: 15, // Maximum Tokens in Bucker
    }),
  ],
});
