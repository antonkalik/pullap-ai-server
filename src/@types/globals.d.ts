export declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }

  export declare module "*.sql" {
    const value: string;
    export default value;
  }
}

export declare module "*.sql" {
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
