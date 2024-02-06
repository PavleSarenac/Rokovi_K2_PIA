import { Trip } from "./trip"

export class Traveler {
  korisnickoIme: string = ""
  lozinka: string = ""
  ime: string = ""
  prezime: string = ""
  tip: string = ""
  imejl: string = ""
  lokacijatrenutna: string = ""
  novac: number = 0
  lista: Trip[] = []
}
