export interface RefreshToken {
  refresh: (params: RefreshToken.Params) => Promise<RefreshToken.Response>
}

export namespace RefreshToken {
  export type Params = {
    refresh_token: string
  }
  export type Response = {
    access_token: string
    refresh_token: string
  }
}
