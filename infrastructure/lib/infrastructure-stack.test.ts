import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InfrastructureStack } from './infrastructure-stack';

describe('InfrastructureStack', () => {
    it('should compile', () => {
        const app = new App();
        const stack = new InfrastructureStack(app, 'infrastructure-stack', { STATUS: 'test' });
        expect(Template.fromStack(stack)).toMatchSnapshot();
    });
});
