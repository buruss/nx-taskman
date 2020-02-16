/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IConfig {
  apiServer: IServerConfig;
  nextServer: IServerConfig;
  db: IDbConfig;
  jwt: IJwtConfig;
}

export interface IServerConfig {
  host: string;
  port: number;
}

export interface IDbConfig {
  type: string;
  port: number;
  database: string;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
}

export interface IJwtConfig {
  expiresIn: number;
  secret: string;
}
