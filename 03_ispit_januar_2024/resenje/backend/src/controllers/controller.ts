import express from 'express'
import KorisnikModel from "../models/korisnik"
import AukcijaModel from "../models/aukcija"

const NUMBER_OF_MILLISECONDS_IN_ONE_SECOND = 1000
const NUMBER_OF_SECONDS_IN_ONE_MINUTE = 60
const NUMBER_OF_MINUTES_IN_ONE_HOUR = 60

export class Controller {
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

    login = (request: express.Request, response: express.Response) => {
        KorisnikModel.findOne(
            {
                korisnicko_ime: request.query.username,
                lozinka: request.query.password,
                tip: request.query.userType
            }
        ).then(
            (user) => {
                response.json(user)
            }
        ).catch((error) => console.log(error))
    }

    // Korisceni operatori:
    // $lte: https://www.mongodb.com/docs/manual/reference/operator/query/lte/#match-document-fields
    // $gte: https://www.mongodb.com/docs/manual/reference/operator/query/gte/#match-document-fields
    getAllCurrentAuctions = (request: express.Request, response: express.Response) => {
        let currentDateTime = this.getCurrentDateTimeString()
        AukcijaModel.find(
            {
                pocetak: { $lte: currentDateTime },
                kraj: { $gte: currentDateTime }
            }
        ).then(
            (auctions) => {
                response.json(auctions)
            }
        ).catch((error) => console.log(error))
    }

    getArtworks = (request: express.Request, response: express.Response) => {
        AukcijaModel.findOne(
            {
                naziv: request.query.auctionName
            }
        ).then(
            (auction: any) => {
                response.json(auction.umetnine)
            }
        ).catch((error) => console.log(error))
    }

    // Korisceni operatori:
    // $[<identifier>]: https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/
    bid = (request: express.Request, response: express.Response) => {
        let artwork = request.body.artwork
        let auctionName = request.body.auctionName
        let username = request.body.username
        AukcijaModel.updateOne(
            {
                naziv: auctionName
            },
            {
                $set: {
                    "umetnine.$[artwork].ponuda": String(artwork.novaPonuda),
                    "umetnine.$[artwork].vlasnik": username
                }
            },
            {
                arrayFilters: [{ "artwork.naziv": artwork.naziv }]
            }
        ).then(
            () => {
                response.json({ message: "ok" })
            }
        ).catch((error) => console.log(error))
    }

    // Korisceni operatori:
    // $lt: https://www.mongodb.com/docs/manual/reference/operator/query/lt/#match-document-fields
    getAllBoughtArtworks = (request: express.Request, response: express.Response) => {
        let artworks: any[] = []
        let currentDateTime = this.getCurrentDateTimeString()
        AukcijaModel.find(
            {
                kraj: { $lt: currentDateTime }
            }
        ).then(
            (auctions: any) => {
                auctions.forEach(
                    (auction: any) => {
                        auction.umetnine.forEach(
                            (artwork: any) => {
                                if (artwork.vlasnik == request.query.username) {
                                    artworks.push(artwork)
                                }
                            }
                        )
                    }
                )
                response.json(artworks)
            }
        ).catch((error) => console.log(error))
    }

    getAllAuctions = (request: express.Request, response: express.Response) => {
        KorisnikModel.find({}).then(
            (users: any[]) => {
                AukcijaModel.find({}).then(
                    (auctions: any[]) => {
                        auctions.forEach(
                            (auction: any) => {
                                let newArtworks: any[] = []
                                auction.umetnine.forEach(
                                    (artwork: any) => {
                                        let user = users.find((user) => user.korisnicko_ime == artwork.vlasnik)
                                        newArtworks.push(
                                            {
                                                naziv: artwork.naziv,
                                                ponuda: artwork.ponuda,
                                                vlasnik: artwork.vlasnik,
                                                imeVlasnika: user?.ime,
                                                prezimeVlasnika: user?.prezime
                                            }
                                        )
                                    }
                                )
                                auction.umetnine = newArtworks
                            }
                        )
                        response.json(auctions)
                    }
                ).catch((error) => console.log(error))
            }
        ).catch((error) => console.log(error))
    }
}