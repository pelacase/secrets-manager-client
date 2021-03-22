import AWS from 'aws-sdk';

const DEFAULT_PRIVATE_APP_NAME = 'Pela Headless Website';

const formatPrivateAppName = (privateAppName) => privateAppName.replace(/ /g, '_');

class SecretsManagerClient {
    constructor(accessKeyId, secretAccessKey) {
        this.client = new AWS.SecretsManager({
            region: "us-east-1",
            accessKeyId,
            secretAccessKey,
        });
    }

    async getShopifyAdminApiSecret(shopName, privateAppName=DEFAULT_PRIVATE_APP_NAME) {
        const secretName = `shopify/${shopName}/adminApi/${formatPrivateAppName(privateAppName)}`;
        return await this.getSecret(secretName);
    }

    async getShopifyStorefrontApiSecret(shopName, privateAppName=DEFAULT_PRIVATE_APP_NAME) {
        const secretName = `shopify/${shopName}/storefrontApi/${formatPrivateAppName(privateAppName)}`;
        return await this.getSecret(secretName);
    }

    async getSecret(secretName) {
        const result = await this.client.getSecretValue({SecretId: secretName}).promise();
        if (!result || !result.SecretString) {
            throw new Error(`Secret not found: "${secretName}"`);
        }
        return JSON.parse(result.SecretString);
    }
}

export default SecretsManagerClient;
