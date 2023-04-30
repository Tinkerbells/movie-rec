import { redis } from "./redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a new ratelimiter, that allows 5 requests per 30 seconds
export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "30 s"),
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});
