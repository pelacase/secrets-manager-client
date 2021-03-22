export declare interface ShopifyAdminApiSecret {
    apiKey: string;
    password: string;
    shopName: string;
}

export declare class SecretsManagerClient {
    /**
     * Construct a new secrets manager client using the specified AWS credentials.
     */
    constructor(accessKeyId: string, secretAccessKey: string);

    /**
     * Get the Shopify Admin API secret for the specified Shopify shop name and optional private app name.
     */
    getShopifyAdminApiSecret(shopName: string, privateAppName?: string): Promise<ShopifyAdminApiSecret>;

    /**
     * Get the secret with the specified name.
     */
    getSecret(secretName: string): Promise<string>;
}