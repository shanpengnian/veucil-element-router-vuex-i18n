/**
 * api接口统一管理
 */
 import { get, post } from '../utils/http'

 export const apiAddress = p => post('/api/home', p)
 
 export const apiAddressTwo = p => get('/home', p)
 