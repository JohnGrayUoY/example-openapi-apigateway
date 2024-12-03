import { Stack, type StackProps } from 'aws-cdk-lib';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import type { Construct } from 'constructs';
import { ApiDefinition, LambdaIntegration, SpecRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Effect, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { type Environment } from '../types/parseEnvironment';
import { createWorkordersAPIDocument } from '../../src/openAPI/createWorkordersAPIDocument';

export class InfrastructureStack extends Stack {
    constructor(scope: Construct, id: string, env: Environment, props?: StackProps) {
        super(scope, id, props);

        const getWorkordersLambda = new NodejsFunction(this, 'Get-Workorders-Lambda', {
            runtime: Runtime.NODEJS_22_X,
            architecture: Architecture.ARM_64,
            functionName: `Get-Workorders-Lambda`,
            entry: 'src/lambda/index.ts',
            handler: 'handler',
            environment: {
                status: env.STATUS,
            },
        });

        const apiRole = new Role(this, 'API-Role', {
            roleName: 'API-Role',
            assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
        });

        apiRole.addToPolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                resources: [getWorkordersLambda.functionArn],
                actions: ['lambda:InvokeFunction'],
            })
        );

        const openAPIDocument = createWorkordersAPIDocument({
            getWorkordersLambdaFunctionName: getWorkordersLambda.functionName,
            apiRoleArn: apiRole.roleArn,
        });

        const api = new SpecRestApi(this, 'FinanceAPI', {
            apiDefinition: ApiDefinition.fromInline(openAPIDocument),
        });

        const getWorkordersResource = api.root.addResource('getWorkorders');
        getWorkordersResource.addMethod('GET', new LambdaIntegration(getWorkordersLambda));
    }
}
