import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Proizvod } from '../models/proizvod';
import { Narudzbina } from '../models/narudzbina';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string, userType: string) {
    return this.httpClient.get<Korisnik>(`${this.backendUrl}/login?username=${username}&password=${password}&userType=${userType}`)
  }

  getAllProducts() {
    return this.httpClient.get<Proizvod[]>(`${this.backendUrl}/getAllProducts`)
  }

  order(order: Narudzbina) {
    return this.httpClient.post<Response>(`${this.backendUrl}/order`, order)
  }

  getAllOrders() {
    return this.httpClient.get<Narudzbina[]>(`${this.backendUrl}/getAllOrders`)
  }

  updateQuantity(products: any[]) {
    return this.httpClient.post<Response>(`${this.backendUrl}/updateQuantity`, products)
  }
}
