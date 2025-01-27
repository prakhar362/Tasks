import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient>;

export async function runRedisOperations() {
  if (!redisClient) {
    redisClient = createClient({
      username: 'default',
      password: 'O0I8G6lDsqwm0idy1ULm6GNUV7xfTe9T',
      socket: {
        host: 'redis-15129.c14.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 15129,
      },
    });

    redisClient.on('error', (err) => console.error('Redis Client Error:', err));
    await redisClient.connect();
  }

  return redisClient;
}
