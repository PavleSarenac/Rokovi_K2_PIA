import express from 'express'
import KorisnikModel from '../models/korisnik.model'
import ZadatakModel from "../models/zadatak.model"

export class Controller {
    login = (request: express.Request, response: express.Response) => {
        KorisnikModel.findOne(
            {
                korisnicko_ime: request.query.username,
                lozinka: request.query.password,
                tip: request.query.userType
            }
        ).then(
            (user) => response.json(user)
        ).catch((error) => console.log(error))
    }

    // Korisceni operatori:
    // $ne: https://www.mongodb.com/docs/manual/reference/operator/query/ne/#match-document-fields
    getTeamMembers = (request: express.Request, response: express.Response) => {
        KorisnikModel.find(
            {
                tim: request.query.team,
                tip: { $ne: "vodja" }
            }
        ).then(
            (users) => {
                let responseUsers: any[] = []
                ZadatakModel.find({}).then(
                    (assignments) => {
                        users.forEach(
                            (user) => {
                                let foundAssignments = assignments.filter(
                                    (assignment) => assignment.obavljen == true && assignment.dodeljen == user.korisnicko_ime
                                )
                                responseUsers.push(
                                    {
                                        korisnicko_ime: user.korisnicko_ime,
                                        lozinka: user.lozinka,
                                        ime: user.ime,
                                        prezime: user.prezime,
                                        tip: user.tip,
                                        tim: user.tim,
                                        totalDone: foundAssignments.length
                                    }
                                )
                            }
                        )
                        response.json(responseUsers)
                    }
                ).catch((error) => console.log(error))
            }
        ).catch((error) => console.log(error))
    }

    assign = (request: express.Request, response: express.Response) => {
        new ZadatakModel(request.body).save().then(
            () => response.json({ content: "ok" })
        ).catch((error) => console.log(error))
    }

    getMyAssignments = (request: express.Request, response: express.Response) => {
        ZadatakModel.find(
            {
                dodeljen: request.query.username
            }
        ).then(
            (assignments) => response.json(assignments)
        ).catch((error) => console.log(error))
    }

    deleteAssignment = (request: express.Request, response: express.Response) => {
        ZadatakModel.deleteOne(
            {
                sadrzaj: request.body.sadrzaj,
                obavljen: request.body.obavljen,
                tip: request.body.tip,
                dodeljen: request.body.dodeljen
            }
        ).then(
            () => response.json({ content: "ok" })
        ).catch((error) => console.log(error))
    }

    done = (request: express.Request, response: express.Response) => {
        ZadatakModel.updateOne(
            {
                sadrzaj: request.body.sadrzaj,
                obavljen: request.body.obavljen,
                tip: request.body.tip,
                dodeljen: request.body.dodeljen
            },
            {
                obavljen: true
            }
        ).then(
            () => response.json({ content: "ok" })
        ).catch((error) => console.log(error))
    }

    returnToUndone = (request: express.Request, response: express.Response) => {
        ZadatakModel.updateOne(
            {
                sadrzaj: request.body.sadrzaj,
                obavljen: request.body.obavljen,
                tip: request.body.tip,
                dodeljen: request.body.dodeljen
            },
            {
                obavljen: false
            }
        ).then(
            () => response.json({ content: "ok" })
        ).catch((error) => console.log(error))
    }
}