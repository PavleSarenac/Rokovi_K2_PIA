import { Offer } from "./offer"

export class Agency {
  korisnickoIme: string = ""
  lozinka: string = ""
  tip: string = ""
  naziv: string = ""
  PIB: number = 0
  usluge: Offer[] = []
}
