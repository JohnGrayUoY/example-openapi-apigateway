import { Stack, type StackProps } from 'aws-cdk-lib';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import type { Construct } from 'constructs';
import { type Environment } from '../types/parseEnvironment';

export class InfrastructureStack extends Stack {
    constructor(scope: Construct, id: string, env: Environment, props?: StackProps) {
        super(scope, id, props);

        new NodejsFunction(this, 'Example lambda', {
            runtime: Runtime.NODEJS_22_X,
            architecture: Architecture.ARM_64,
            functionName: `LambdaExample`,
            entry: 'src/lambda/index.ts',
            handler: 'handler',
            environment: {
                status: env.STATUS,
            },
        });
    }
}
