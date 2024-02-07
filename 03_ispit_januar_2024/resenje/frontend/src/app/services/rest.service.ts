import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aukcija } from '../models/aukcija';
import { Umetnina } from '../models/umetnina';
import { Response } from '../models/response';

const NUMBER_OF_MILLISECONDS_IN_ONE_SECOND = 1000
const NUMBER_OF_SECONDS_IN_ONE_MINUTE = 60
const NUMBER_OF_MINUTES_IN_ONE_HOUR = 60

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string, userType: string) {
    return this.httpClient.get<any>(`${this.backendUrl}/login?username=${username}&password=${password}&userType=${userType}`)
  }

  getAllCurrentAuctions() {
    return this.httpClient.get<Aukcija[]>(`${this.backendUrl}/getAllCurrentAuctions`)
  }

  getArtworks(auctionName: string) {
    return this.httpClient.get<Umetnina[]>(`${this.backendUrl}/getArtworks?auctionName=${auctionName}`)
  }

  bid(artwork: Umetnina, auctionName: string, username: string) {
    const body = {
      artwork: artwork,
      auctionName: auctionName,
      username: username
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/bid`, body)
  }

  getAllBoughtArtworks(username: string) {
    return this.httpClient.get<Umetnina[]>(`${this.backendUrl}/getAllBoughtArtworks?username=${username}`)
  }

  getAllAuctions() {
    return this.httpClient.get<Aukcija[]>(`${this.backendUrl}/getAllAuctions`)
  }

  getCurrentDateTimeString(): string {
    let currentDateTimeInMillis = Date.now()  // this is UTC time - time zone in Serbia is UTC+01:00, so we need to add 1 hour
    currentDateTimeInMillis +=
      NUMBER_OF_MINUTES_IN_ONE_HOUR * NUMBER_OF_SECONDS_IN_ONE_MINUTE * NUMBER_OF_MILLISECONDS_IN_ONE_SECOND
    let currentDateTime = new Date(currentDateTimeInMillis).toISOString()
    let currentDate = currentDateTime.substring(0, currentDateTime.indexOf("T"))
    let currentTime = currentDateTime.substring(currentDateTime.indexOf("T") + 1, currentDateTime.indexOf("."))
    currentDateTime = currentDate + " " + currentTime
    return currentDateTime
  }
}
