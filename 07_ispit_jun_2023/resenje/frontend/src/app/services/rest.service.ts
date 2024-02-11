import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik.model';
import { Zadatak } from '../models/zadatak.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string, userType: string) {
    return this.httpClient.get<Korisnik>(`${this.backendUrl}/login?username=${username}&password=${password}&userType=${userType}`)
  }

  getTeamMembers(team: number) {
    return this.httpClient.get<Korisnik[]>(`${this.backendUrl}/getTeamMembers?team=${team}`)
  }

  assign(assignment: Zadatak) {
    return this.httpClient.post<Message>(`${this.backendUrl}/assign`, assignment)
  }

  getMyAssignments(username: string) {
    return this.httpClient.get<Zadatak[]>(`${this.backendUrl}/getMyAssignments?username=${username}`)
  }

  deleteAssignment(assignment: Zadatak) {
    return this.httpClient.post<Message>(`${this.backendUrl}/deleteAssignment`, assignment)
  }

  done(assignment: Zadatak) {
    return this.httpClient.post<Message>(`${this.backendUrl}/done`, assignment)
  }

  returnToUndone(assignment: Zadatak) {
    return this.httpClient.post<Message>(`${this.backendUrl}/returnToUndone`, assignment)
  }
}
