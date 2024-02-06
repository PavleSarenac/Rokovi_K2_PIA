import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { Response } from '../models/response';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  backendUrl = "http://localhost:4000"

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string, userType: string) {
    return this.httpClient.get<any>(`${this.backendUrl}/login?username=${username}&password=${password}&userType=${userType}`)
  }

  addNewOffer(offer: Offer, username: string) {
    const body = {
      offer: offer,
      username: username
    }
    return this.httpClient.post<Offer>(`${this.backendUrl}/addNewOffer`, body)
  }

  updateLocation(location: string, username: string) {
    return this.httpClient.get<Response>(`${this.backendUrl}/updateLocation?location=${location}&username=${username}`)
  }

  getTripsInfo(trips: Trip[]) {
    return this.httpClient.post<Trip[]>(`${this.backendUrl}/getTripsInfo`, trips)
  }

  search(locationTo: string, offerTypes: string[], priceFrom: number, priceTo: number) {
    const body = {
      locationTo: locationTo,
      offerTypes: offerTypes,
      priceFrom: priceFrom,
      priceTo: priceTo
    }
    return this.httpClient.post<Offer[]>(`${this.backendUrl}/search`, body)
  }

  addNewTrip(travelerUsername: string, trip: Trip, price: number) {
    const body = {
      travelerUsername: travelerUsername,
      trip: trip,
      price: price
    }
    return this.httpClient.post<Response>(`${this.backendUrl}/addNewTrip`, body)
  }
}
