import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Response } from '../models/response';
import { Event } from '../models/event';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.get<User>(`${this.backendUrl}/login?username=${username}&password=${password}`)
  }

  updateUserInfo(user: User) {
    return this.httpClient.post<Response>(`${this.backendUrl}/updateUserInfo`, user)
  }

  getAllFutureEvents() {
    return this.httpClient.get<Event[]>(`${this.backendUrl}/getAllFutureEvents`)
  }

  registerForEvent(guest: Guest, event: Event) {
    const data = {
      guest: guest,
      event: event
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/registerForEvent`, data)
  }

  getAllUsersEvents(username: string) {
    return this.httpClient.get<Event[]>(`${this.backendUrl}/getAllUsersEvents?username=${username}`)
  }

  cancelEvent(eventName: string) {
    return this.httpClient.get<Response>(`${this.backendUrl}/cancelEvent?eventName=${eventName}`)
  }

  createNewEvent(event: Event, username: string) {
    const data = {
      event: event,
      username: username
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/createNewEvent`, data)
  }
}
