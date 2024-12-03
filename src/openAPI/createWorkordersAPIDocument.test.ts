import { createWorkordersAPIDocument } from './createWorkordersAPIDocument';

describe('Workorders API Document tests', () => {
    it('should emit a valid openapi spec', () => {
        const openAPISpec = createWorkordersAPIDocument({
            getWorkordersLambdaFunctionName: 'mock-function-name',
            apiRoleArn: 'mock-credentials-arn',
        });

        console.log(JSON.stringify(openAPISpec));
    });
});
