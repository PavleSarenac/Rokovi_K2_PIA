import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post<User>(`${this.backendUrl}/login`, user)
  }

  getAllProducts() {
    return this.httpClient.get<Product[]>(`${this.backendUrl}/getAllProducts`)
  }
}
