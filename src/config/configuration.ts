export default () => {
  const { redis_host, redis_port, redis_password } = parseRedisConfig();

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    redis: {
      host: redis_host,
      port: redis_port,
      password: redis_password,
    },
    token: process.env.TOKEN,
  };
};

function parseRedisConfig() {
  const REDIS_REGEXP =
    /rediss?:\/\/(([a-zA-Z0-9-]*):([a-zA-Z0-9]*)@)?([a-zA-Z0-9.-]*):([0-9]*)/;
  const redis_url = process.env.REDIS_URL;
  const redis_url_match = REDIS_REGEXP.exec(redis_url);
  const redis_user = redis_url_match[2] || '';
  const redis_password = redis_url_match[3] || '';
  const redis_host = redis_url_match[4];
  const redis_port = Number.parseInt(redis_url_match[5]);
  return { redis_host, redis_port, redis_password, redis_user };
}
