import { createDocument } from 'zod-openapi';
import { z } from 'zod';
import { type OpenAPIObject } from 'openapi3-ts/oas31';
import { workorder } from '../types/workorder';
import { type CreateWorkordersAPIDocumentProps } from './createWorkordersAPIDocumentProps';

export const createWorkordersAPIDocument = (
    props: CreateWorkordersAPIDocumentProps
): OpenAPIObject => {
    return createDocument({
        openapi: '3.0.3',
        info: {
            title: 'Workorders API',
            version: '0.1.0',
        },
        'x-amazon-apigateway-api-key-source': 'HEADER',
        security: [
            {
                sigv4Reference: [],
            },
        ],
        paths: {
            '/exampleGetWorkorders': {
                get: {
                    description: 'Get workorders',
                    responses: {
                        '200': {
                            description: '200 OK',
                            content: {
                                'application/json': {
                                    schema: z.object({
                                        workorders: z.array(workorder),
                                    }),
                                },
                            },
                        },
                    },
                    'x-amazon-apigateway-auth': {
                        type: 'NONE',
                    },
                    'x-amazon-apigateway-integration': {
                        type: 'aws_proxy',
                        httpMethod: 'POST', // For Lambda integrations this MUST be POST.
                        uri: generateUriForLambdaIntegration(props.getWorkordersLambdaFunctionName),
                        credentials: props.apiRoleArn,
                    },
                },
            },
        },
        components: {
            securitySchemes: {
                sigv4Reference: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    'x-amazon-apigateway-authtype': 'awsSigv4',
                },
            },
            'x-amazon-apigateway-policy': {
                Version: '2012-10-17',
                Statement: [
                    {
                        Effect: 'Allow',
                        Principal: {
                            AWS: '*',
                        },
                        Action: 'execute-api:Invoke',
                        Resource: ['execute-api:/*'],
                    },
                ],
            },
        },
    });
};

const generateUriForLambdaIntegration = (functionName: string) => {
    return (
        // eslint-disable-next-line no-template-curly-in-string
        'arn:${AWS::Partition}:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/arn:${AWS::Partition}:lambda:${AWS::Region}:${AWS::AccountId}:function:' +
        functionName +
        '/invocations'
    );
};
