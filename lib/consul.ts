const Consul = require('consul');

const consul = new Consul({
    host: process.env.CONSUL_HOST || 'localhost',
    port: process.env.CONSUL_PORT || '8500',
});

export async function getConfig(key) {
    try {
        const result = await consul.kv.get(`config/next-app/${key}`);
        return result ? result.Value : null;
    } catch (err) {
        console.error('Error fetching config from Consul:', err);
        return null;
    }
}

export async function setConfig(key, value) {
    try {
        await consul.kv.set(`config/next-app/${key}`, value);
        return true;
    } catch (err) {
        console.error('Error saving config to Consul:', err);
        return false;
    }
}
