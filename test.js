import SecretsManagerClient from './index.js';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
    const client = new SecretsManagerClient(
        process.env.SECRETS_MANAGER_CLIENT_AWS_ACCESS_KEY_ID,
        process.env.SECRETS_MANAGER_CLIENT_AWS_SECRET_ACCESS_KEY,
    );
    const secret = await client.getShopifyAdminApiSecret('pela-dev');
    console.log(secret);
}

test().catch(console.log);
