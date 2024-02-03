import { Guest } from "./guest"

export class Event {
  naziv: string = ""
  mesto: string = ""
  organizator: string = ""
  datum: string = ""
  dolazi: Guest[] = []
}
