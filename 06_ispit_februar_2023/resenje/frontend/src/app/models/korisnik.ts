import { Narudzbina } from "./narudzbina"

export class Korisnik {
  ime: string = ""
  prezime: string = ""
  kor_ime: string = ""
  lozinka: string = ""
  mejl: string = ""
  tip: string = ""
  narudzbine: Narudzbina[] = []
}
