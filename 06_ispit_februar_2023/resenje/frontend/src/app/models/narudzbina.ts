import { PoruceniProizvod } from "./poruceni-proizvod"

export class Narudzbina {
  idN: number = 0
  kupac: string = ""
  proizvodi: PoruceniProizvod[] = []
  racun: number = 0

  imeKupca: string = ""
  ukupnaKilaza: number = 0
}
