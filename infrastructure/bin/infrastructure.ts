#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ZodError } from 'zod';
import dotenv from 'dotenv-safe';
import { InfrastructureStack } from '../lib/infrastructure-stack';
import { parseEnvironment } from '../types/parseEnvironment';

dotenv.config({ path: '.env.test' });

let env;

try {
    env = parseEnvironment(process.env);
} catch (error: unknown) {
    if (error instanceof ZodError) {
        console.log(`Error: Zod failed to parse the environment.\n${error.message}`);
    }

    throw error;
}

const app = new cdk.App();
new InfrastructureStack(app, 'Example-OpenAPI-APIGateway', env, {
    tags: {
        'york/name': 'Example-OpenAPI-APIGateway',
        'york/group': 'ESG',
        'york/project': 'Software Development Standards',
        'york/status': env.STATUS,
        'york/pushed_by': 'github',
        'york/defined_in': 'cdk',
        'york/policy_version': '2',
        'york/repo_name': 'example-openapi-apigateway',
        'york/team': 'corporate-services',
    },
});
