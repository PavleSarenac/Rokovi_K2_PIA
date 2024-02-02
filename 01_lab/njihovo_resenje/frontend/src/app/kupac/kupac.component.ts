import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Proizvod } from '../models/proizvod';
import { ProductsService } from '../products.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css'],
})
export class KupacComponent implements OnInit {
  proizvodi: Proizvod[] = [];
  ulogovan: Korisnik = new Korisnik();
  naziv: string = '';
  opis: string = '';
  poruka: string = '';

  constructor(
    private proizvodServis: ProductsService,
    private korisnikServis: UsersService
  ) {}

  ngOnInit(): void {
    let korisnik = localStorage.getItem('ulogovan');
    if (korisnik != null) this.ulogovan = JSON.parse(korisnik);

    this.proizvodServis
      .dohvatiSveProizvodeUProdavnici()
      .subscribe((p: Proizvod[]) => {
        this.proizvodi = p;
        this.proizvodi.sort((p1, p2) => {
          return p2.lajkovi - p1.lajkovi;
        });
        this.proizvodi.forEach((p) => {
          this.korisnikServis
            .dohvatiKorisnika(p.kreator)
            .subscribe((k: Korisnik) => {
              p.imeKreatora = k.ime;
              p.prezimeKreatora = k.prezime;
            });
        });
      });
  }

  odjaviSe() {
    localStorage.clear();
  }

  lajkuj(p: Proizvod) {
    this.proizvodServis.lajkuj(p.id).subscribe((resp: any) => {
      if (resp['msg']) {
        p.lajkovi++;
        this.proizvodi.sort((p1, p2) => {
          return p2.lajkovi - p1.lajkovi;
        });
      }
    });
  }

  dodajProizvod() {
    this.proizvodServis
      .dodajProizvod(this.naziv, this.opis, this.ulogovan.kor_ime)
      .subscribe((resp) => {
        this.poruka = 'Proizvod ' + this.naziv + ' je dodat';
      });
  }
}
