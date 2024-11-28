import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'istanbul',
            reporter: ['lcovonly'],
        },
        globals: true,
        setupFiles: ['dotenv/config'],
        snapshotSerializers: [
            '@university-of-york/esg-lib-snapshot-serializers/asset-param',
            '@university-of-york/esg-lib-snapshot-serializers/lambda-function',
        ],
    },
});
