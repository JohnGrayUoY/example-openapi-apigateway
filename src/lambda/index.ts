export const handler = async () => {
    console.log('getWorkorder lambda ran successfully');

    return {
        isBase64Encoded: false,
        statusCode: 200,
        headers: {},
        body: 'Success',
    };
};
