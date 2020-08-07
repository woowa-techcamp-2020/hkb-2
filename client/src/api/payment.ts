import { fetchWrapper } from '../utils/fetchWrapper'
import { PAYMENT } from './apiRoutes'

export interface IPaymentCreateBody {
  userId: number
  paymentId: number
}

export interface IPaymentResponse {
  id: number
  name: string
}

export const fetchAllPayment = async () => {
  return await fetchWrapper<IPaymentResponse[], undefined>('GET', PAYMENT)
}

export const fetchUsersPayment = async (userId: number) => {
  return await fetchWrapper<IPaymentResponse[], undefined>(
    'GET',
    PAYMENT + `/${userId}`
  )
}

export const createNewPayment = async (args: IPaymentCreateBody) => {
  return await fetchWrapper<IPaymentResponse, IPaymentCreateBody>(
    'PUT',
    PAYMENT,
    args
  )
}

export const deletePayment = async (args: IPaymentCreateBody) => {
  return await fetchWrapper<number, IPaymentCreateBody>('DELETE', PAYMENT, args)
}