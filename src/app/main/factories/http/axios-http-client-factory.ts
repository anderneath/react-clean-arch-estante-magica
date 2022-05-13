import { AxiosHttpClient } from '@/app/infra/http'

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
