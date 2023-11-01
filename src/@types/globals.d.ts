import { UserSession } from 'src/middlewares/authMiddleware';

export declare global {
  namespace NodeJS {
    namespace env {
      interface ProcessEnv extends IProcessEnv {}
    }
  }

  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }

  export declare module '*.sql' {
    const value: string;
    export default value;
  }
}

export declare module '*.sql' {
  const value: string;
  export default value;
}

interface IProcessEnv {
  JWT_SECRET: string;
  NODE_ENV: 'development' | 'production';
  PORT: number;
}

export global {
  export declare module '*.sql' {
    const value: string;
    export default value;
  }
}
