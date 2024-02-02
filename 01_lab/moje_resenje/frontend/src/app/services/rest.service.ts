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

  login(user: User) {
    return this.httpClient.post<User>(`${this.backendUrl}/login`, user)
  }

  getAllSellingProducts() {
    return this.httpClient.get<Product[]>(`${this.backendUrl}/getAllSellingProducts`)
  }

  getUserByUsername(username: string) {
    return this.httpClient.get<User>(`${this.backendUrl}/getUserByUsername?username=${username}`)
  }

  likeProduct(product: Product) {
    return this.httpClient.get<Response>(`${this.backendUrl}/likeProduct?productId=${product.id}`)
  }

  addNewProduct(product: Product) {
    return this.httpClient.post<Response>(`${this.backendUrl}/addNewProduct`, product)
  }

  getAllWaitingProducts() {
    return this.httpClient.get<Product[]>(`${this.backendUrl}/getAllWaitingProducts`)
  }

  updateProductStatus(productId: number, productStatus: string, productPrice: number) {
    const body = {
      productId: productId,
      productStatus: productStatus,
      productPrice: productPrice
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/updateProductStatus`, body)
  }
}
