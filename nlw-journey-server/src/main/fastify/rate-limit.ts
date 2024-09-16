import { RateLimitOptions } from '@fastify/rate-limit';

export const rateLimitOptions: RateLimitOptions = {
    timeWindow: 1 * 60 * 1000,
    max: 100,
};
