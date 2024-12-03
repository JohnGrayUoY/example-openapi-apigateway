import * as fs from 'node:fs';
import { createWorkordersAPIDocument } from './createWorkordersAPIDocument';

describe('Workorders API Document tests', () => {
    it('should emit a valid openapi spec', () => {
        const openAPISpec = createWorkordersAPIDocument({
            getWorkordersLambdaFunctionName: 'mock-function-name',
            apiRoleArn: 'mock-credentials-arn',
        });

        fs.writeFileSync('./OpenAPI/spec/WorkordersSpec.json', JSON.stringify(openAPISpec));
    });
});
