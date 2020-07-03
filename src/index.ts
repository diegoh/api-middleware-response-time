import { DefaultContext, Next } from 'koa';

export default () =>
  async function responseTimeMiddleware(
    ctx: DefaultContext,
    next: Next
  ): Promise<void> {
    const start = new Date().getTime();

    const setHeader = (): void => {
      const now = new Date().getTime();
      const differenceInMilliseconds = now - start;
      ctx.response.set('X-Response-Time', differenceInMilliseconds);
    };

    try {
      await next();
    } catch (err) {
      setHeader();
      throw err;
    }
    setHeader();
  };
