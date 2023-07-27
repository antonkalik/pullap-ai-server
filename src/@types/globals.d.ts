export declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
  declare module '*.sql' {
    const value: string;
    export default value;
  }
}

interface IProcessEnv {
  JWT_SECRET: string;
  NODE_ENV: 'development' | 'production';
  PORT: number;
}

export {};
