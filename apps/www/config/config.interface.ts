/* eslint-disable @typescript-eslint/interface-name-prefix */

export interface IConfig {
  apiServer: IServerConfig;
  nextServer: IServerConfig;
}

export interface IServerConfig {
  host: string;
  port: number;
}
