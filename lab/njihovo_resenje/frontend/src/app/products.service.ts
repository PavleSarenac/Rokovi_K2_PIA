import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proizvod } from './models/proizvod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  uri = 'http://localhost:4000/products';

  constructor(private http: HttpClient) {}

  dohvatiSveProizvodeUProdavnici() {
    return this.http.get<Proizvod[]>(`${this.uri}/getAllProductsSorted`);
  }

  dohvatiSveProizvodeNaCekanju() {
    return this.http.get<Proizvod[]>(`${this.uri}/getAllProductsWaiting`);
  }

  lajkuj(id: number) {
    const data = {
      id: id,
    };
    return this.http.post(`${this.uri}/like`, data);
  }

  dodajProizvod(naziv: string, opis: string, kreator: string) {
    const data = {
      naziv: naziv,
      opis: opis,
      kreator: kreator,
      lajkovi: 0,
      status: 'na cekanju',
      cena: 0,
    };
    return this.http.post(`${this.uri}/add`, data);
  }

  promeniStatusProizvoda(id: number, cena: number, status: string) {
    const data = {
      id: id,
      cena: cena,
      status: status,
    };
    return this.http.post(`${this.uri}/change`, data);
  }
}
