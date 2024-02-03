import express from "express"
import UserModel from "../models/user"
import EventModel from "../models/event"

export class Controller {
    login = (request: express.Request, response: express.Response) => {
        UserModel.findOne(
            {
                kor_ime: request.query.username,
                lozinka: request.query.password
            }
        ).then(
            (user) => {
                response.json(user)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    updateUserInfo = (request: express.Request, response: express.Response) => {
        UserModel.updateOne(
            {
                kor_ime: request.body.kor_ime
            },
            {
                ime: request.body.ime,
                prezime: request.body.prezime,
                mejl: request.body.mejl,
                prijatelji: request.body.prijatelji
            }
        ).then(
            () => {
                response.json({ message: "ok" })
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    getAllFutureEvents = (request: express.Request, response: express.Response) => {
        let currentDate = new Date()
        let currentDateString = currentDate.toISOString().substring(0, 10)
        EventModel.find(
            {
                datum: { $gte: currentDateString }
            }
        ).then(
            (events) => {
                response.json(events)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    registerForEvent = (request: express.Request, response: express.Response) => {
        EventModel.find(
            {
                $and: [
                    {
                        datum: request.body.event.datum
                    },
                    {
                        dolazi: { $elemMatch: { korisnik: request.body.guest.korisnik } }
                    }
                ]
            }
        ).then(
            (events) => {
                if (events.length == 0) {
                    EventModel.updateOne(
                        {
                            naziv: request.body.event.naziv
                        },
                        {
                            $push: { dolazi: request.body.guest }
                        }
                    ).then(
                        () => {
                            response.json({ message: "ok" })
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                        }
                    )
                } else {
                    response.json({ message: "nok" })
                }
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    getAllUsersEvents = (request: express.Request, response: express.Response) => {
        EventModel.find(
            {
                organizator: request.query.username
            }
        ).then(
            (events) => {
                response.json(events)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    cancelEvent = (request: express.Request, response: express.Response) => {
        EventModel.deleteOne(
            {
                naziv: request.query.eventName
            }
        ).then(
            () => {
                response.json({ message: "ok" })
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    createNewEvent = (request: express.Request, response: express.Response) => {
        EventModel.findOne(
            {
                organizator: request.body.username,
                datum: request.body.event.datum
            }
        ).then(
            (event) => {
                if (event != null) {
                    response.json(
                        { message: `${request.body.username}, vec ste napravili proslavu za datum ${request.body.event.datum}!` }
                    )
                    return
                }
                EventModel.findOne(
                    {
                        datum: request.body.event.datum,
                        mesto: request.body.event.mesto
                    }
                ).then(
                    (event) => {
                        if (event != null) {
                            response.json(
                                {
                                    message: `${request.body.username}, vec postoji proslava koja se odrzava na mestu 
                                                ${event.mesto} datuma ${event.datum}!`
                                }
                            )
                            return
                        }
                        EventModel.findOne(
                            {
                                naziv: request.body.event.naziv
                            }
                        ).then(
                            (event) => {
                                if (event != null) {
                                    response.json(
                                        {
                                            message: `${request.body.username}, vec postoji proslava sa nazivom ${event.naziv}!`
                                        }
                                    )
                                    return
                                }
                                new EventModel(request.body.event).save().then(
                                    () => {
                                        response.json({ message: `${request.body.username}, uspesno ste kreirali proslavu!` })
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error)
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                            }
                        )
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }
}