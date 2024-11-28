#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ZodError } from 'zod';
import { InfrastructureStack } from '../lib/infrastructure-stack';
import { parseEnvironment } from '../types/parseEnvironment';

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
new InfrastructureStack(app, 'app-name', env, {
    tags: {
        'york/name': 'Corporate Services Template Project',
        'york/group': 'ESG',
        'york/project': 'Software Development Standards',
        'york/status': env.STATUS,
        'york/pushed_by': 'github',
        'york/defined_in': 'cdk',
        'york/policy_version': '2',
        'york/repo_name': 'ds-corporate-services-template',
        'york/team': 'corporate-services',
    },
});
