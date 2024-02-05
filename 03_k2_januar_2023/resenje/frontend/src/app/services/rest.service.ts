import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string, userType: string) {
    return this.httpClient.get<User>(`${this.backendUrl}/login?username=${username}&password=${password}&userType=${userType}`)
  }

  getWishList(username: string) {
    return this.httpClient.get<Product[]>(`${this.backendUrl}/getWishList?username=${username}`)
  }

  addProduct(product: Product, username: string) {
    const data = {
      product: product,
      username: username
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/addProduct`, data)
  }

  getAllOtherUsers(username: string) {
    return this.httpClient.get<User[]>(`${this.backendUrl}/getAllOtherUsers?username=${username}`)
  }

  getAllUsers() {
    return this.httpClient.get<User[]>(`${this.backendUrl}/getAllUsers`)
  }

  subtractMoney(username: string, price: number) {
    return this.httpClient.get<Response>(`${this.backendUrl}/subtractMoney?username=${username}&price=${price}`)
  }

  buyPresent(username: string, product: Product) {
    const data = {
      username: username,
      product: product
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/buyPresent`, data)
  }

  adminPay(username: string) {
    return this.httpClient.get<Response>(`${this.backendUrl}/adminPay?username=${username}`)
  }
}
