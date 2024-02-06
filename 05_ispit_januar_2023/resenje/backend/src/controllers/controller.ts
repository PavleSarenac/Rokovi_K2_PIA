import express from 'express'
import AgencyModel from "../models/agency"
import TravelerModel from "../models/traveler"

export class Controller {
    login = (request: express.Request, response: express.Response) => {
        if (request.query.userType == "agencija") {
            AgencyModel.findOne(
                {
                    korisnickoIme: request.query.username,
                    lozinka: request.query.password
                }
            ).then(
                (agency) => {
                    response.json(agency)
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        } else {
            TravelerModel.findOne(
                {
                    korisnickoIme: request.query.username,
                    lozinka: request.query.password,
                }
            ).then(
                (traveler) => {
                    response.json(traveler)
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    // Korisceni operatori:
    // $push: https://www.mongodb.com/docs/manual/reference/operator/update/push/#append-a-value-to-an-array
    addNewOffer = (request: express.Request, response: express.Response) => {
        let maxOfferId = -1
        AgencyModel.find({}).then(
            (agencies) => {
                agencies.forEach(
                    (agency) => {
                        agency.usluge.forEach(
                            (offer) => {
                                if (offer.idponude > maxOfferId) maxOfferId = offer.idponude
                            }
                        )
                    }
                )
                request.body.offer.idponude = maxOfferId + 1
                AgencyModel.updateOne(
                    {
                        korisnickoIme: request.body.username
                    },
                    {
                        $push: {
                            usluge: request.body.offer
                        }
                    }
                ).then(
                    () => {
                        response.json(request.body.offer)
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )
            }
        ).catch((error) => console.log(error))
    }

    updateLocation = (request: express.Request, response: express.Response) => {
        TravelerModel.updateOne(
            {
                korisnickoIme: request.query.username
            },
            {
                lokacijatrenutna: request.query.location
            }
        ).then(
            () => response.json({ message: "ok" })
        ).catch(
            (error) => console.log(error)
        )

    }

    // Korisceni operatori:
    // $elemMatch: https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#array-of-embedded-documents
    // $in: https://www.mongodb.com/docs/manual/reference/operator/query/in/#use-the--in-operator-to-match-values
    getTripsInfo = (request: express.Request, response: express.Response) => {
        let trips = request.body
        let tripIds: number[] = []
        trips.forEach((trip: any) => tripIds.push(trip.idusluge))

        AgencyModel.find(
            {
                usluge: { $elemMatch: { idponude: { $in: tripIds } } }
            }
        ).then(
            (agencies) => {
                trips.forEach(
                    (trip: any) => {
                        outerLoop:
                        for (let agency of agencies) {
                            for (let offer of agency.usluge) {
                                if (trip.idusluge == offer.idponude) {
                                    trip.naziv = agency.naziv
                                    trip.tip = offer.tip
                                    break outerLoop
                                }
                            }
                        }
                    }
                )
                response.json(trips)
            }
        ).catch((error) => console.log(error))
    }

    search = (request: express.Request, response: express.Response) => {
        let locationTo: string = request.body.locationTo
        let offerTypes: string[] = request.body.offerTypes
        let priceFrom: number = request.body.priceFrom
        let priceTo: number = request.body.priceTo

        let offers: any[] = []

        AgencyModel.find({}).then(
            (agencies: any) => {
                agencies.forEach(
                    (agency: any) => agency.usluge.forEach(
                        (offer: any) => {
                            let shouldBeIncluded = true
                            if (locationTo != "" && !offer.lokacija_do.toLowerCase().includes(locationTo.toLowerCase()))
                                shouldBeIncluded = false
                            if (!offerTypes.includes(offer.tip))
                                shouldBeIncluded = false
                            if (offer.cena < priceFrom)
                                shouldBeIncluded = false
                            if (priceTo > -1 && offer.cena > priceTo)
                                shouldBeIncluded = false
                            if (shouldBeIncluded) offers.push(offer)
                        }
                    )
                )
                response.json(offers)
            }
        ).catch((error) => console.log(error))
    }

    // Korisceni operatori:
    // $push: https://www.mongodb.com/docs/manual/reference/operator/update/push/#append-a-value-to-an-array
    // $inc: https://www.mongodb.com/docs/manual/reference/operator/update/inc/#example
    // $elemMatch: https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/#array-of-embedded-documents
    // $[<identifier>]: https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#update-all-documents-that-match-arrayfilters-in-an-array
    addNewTrip = (request: express.Request, response: express.Response) => {
        let travelerUsername: string = request.body.travelerUsername
        let trip: any = request.body.trip
        let price: number = request.body.price

        TravelerModel.updateOne(
            {
                korisnickoIme: travelerUsername
            },
            {
                $push: {
                    lista: {
                        idusluge: trip.idusluge,
                        brojsaputnika: trip.brojsaputnika,
                        lokacija_od: trip.lokacija_od,
                        lokacija_do: trip.lokacija_do
                    }
                },
                $inc: { novac: -price }
            }
        ).then(
            () => {
                AgencyModel.updateOne(
                    {
                        usluge: { $elemMatch: { idponude: trip.idusluge } }
                    },
                    {
                        $inc: { "usluge.$[offer].broj_mesta": -(trip.brojsaputnika + 1) }
                    },
                    {
                        arrayFilters: [{ "offer.idponude": trip.idusluge }]
                    }
                ).then(
                    () => response.json({ message: "ok" })
                ).catch((error) => console.log(error))
            }
        ).catch((error) => console.log(error))
    }
}