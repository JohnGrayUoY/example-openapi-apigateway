import { z } from 'zod';

export const EnvironmentZodObject = z.object({
    STATUS: z.enum(['test', 'dev', 'staging', 'prod']),
});

export type Environment = z.infer<typeof EnvironmentZodObject>;

export const parseEnvironment = (environment: unknown): Environment =>
    EnvironmentZodObject.parse(environment);
