export interface IConfig {
  apiServer: IServerConfig;
  nextServer: IServerConfig;
}

export interface IServerConfig {
  host: string;
  port: number;
  pwd: string;
}
