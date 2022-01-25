export default () => {
  const { redis_host, redis_port, redis_password } = parseRedisConfig();

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    redis: {
      host: redis_host,
      port: redis_port,
      password: redis_password,
    },
  };
};

function parseRedisConfig() {
  const REDIS_REGEXP =
    /redis:\/\/[a-zA-Z0-9]?:([a-zA-Z0-9]*)@([a-zA-Z0-9.-]*):([0-9]*)/;
  const redis_url = process.env.REDIS_URL;
  const redis_url_match = REDIS_REGEXP.exec(redis_url);
  const redis_password = redis_url_match[1];
  const redis_host = redis_url_match[2];
  const redis_port = Number.parseInt(redis_url_match[3]);
  return { redis_host, redis_port, redis_password };
}
