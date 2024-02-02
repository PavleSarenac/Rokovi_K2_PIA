import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Proizvod } from '../models/proizvod';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  constructor(private proizvodServis: ProductsService) { }

  ngOnInit(): void {
    let korisnik = localStorage.getItem("ulogovan");
    if (korisnik != null)
      this.ulogovan = JSON.parse(korisnik);
    this.proizvodServis.dohvatiSveProizvodeNaCekanju().subscribe((p: Proizvod[]) => {
      this.proizvodi = p;
    })
  }

  odjaviSe() {
    localStorage.clear()
  }

  proizvodi: Proizvod[] = [];
  ulogovan: Korisnik = new Korisnik();
  poruka: string = "";

  odobri(p: Proizvod) {
    if (p.cena <= 0) {
      this.poruka = "Cena mora biti pozitivan broj."
    } else {
      this.proizvodServis.promeniStatusProizvoda(p.id, p.cena, "u prodavnici").subscribe((resp) => {
        this.proizvodServis.dohvatiSveProizvodeNaCekanju().subscribe((pr: Proizvod[]) => {
          this.proizvodi = pr;
          this.poruka = "Proizvod " + p.naziv + " je odobren.";
        })
      })
    }
  }

  odbij(p: Proizvod) {
    this.proizvodServis.promeniStatusProizvoda(p.id, 0, "odbijeno").subscribe((resp) => {
      this.proizvodServis.dohvatiSveProizvodeNaCekanju().subscribe((pr: Proizvod[]) => {
        this.proizvodi = pr;
        this.poruka = "Proizvod " + p.naziv + " je odbijen.";
      })
    })
  }

}
