import express from 'express'
import UserModel from "../models/user"

export class Controller {
    login = (request: express.Request, response: express.Response) => {
        UserModel.findOne(
            {
                korisnickoIme: request.query.username,
                lozinka: request.query.password,
                tip: request.query.userType
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

    getWishList = (request: express.Request, response: express.Response) => {
        UserModel.findOne(
            {
                korisnickoIme: request.query.username
            }
        ).then(
            (user) => {
                response.json(user?.lista)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    addProduct = (request: express.Request, response: express.Response) => {
        UserModel.updateOne(
            {
                korisnickoIme: request.body.username
            },
            {
                $push: { lista: request.body.product }
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

    getAllOtherUsers = (request: express.Request, response: express.Response) => {
        UserModel.find(
            {
                korisnickoIme: { $ne: request.query.username },
                tip: "registrovani"
            }
        ).then(
            (users) => {
                response.json(users)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    subtractMoney = (request: express.Request, response: express.Response) => {
        UserModel.updateOne(
            {
                korisnickoIme: request.query.username
            },
            {
                $inc: {
                    potroseno: request.query.price,
                    naStanju: -request.query.price!
                }
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

    buyPresent = (request: express.Request, response: express.Response) => {
        UserModel.updateOne(
            {
                korisnickoIme: request.body.username,
                "lista.proizvod": request.body.product.proizvod
            },
            {
                $set: {
                    "lista.$.kupio": request.body.product.kupio,
                    "lista.$.anonimno": request.body.product.anonimno
                }
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

    getAllUsers = (request: express.Request, response: express.Response) => {
        UserModel.find(
            {
                tip: "registrovani"
            }
        ).then(
            (users) => {
                response.json(users)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    adminPay = (request: express.Request, response: express.Response) => {
        UserModel.updateOne(
            {
                korisnickoIme: request.query.username
            },
            {
                $inc: {
                    naStanju: 5000
                }
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
}