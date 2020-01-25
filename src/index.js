const responseTime = () =>
  async function responseTimeMiddleware(ctx, next) {
    const start = new Date();
    try {
      await next();
    } catch (err) {
      const ms = new Date() - start;
      ctx.set('X-Response-Time', `${ms}ms`);
      throw err;
    }
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  };

module.exports = responseTime;
