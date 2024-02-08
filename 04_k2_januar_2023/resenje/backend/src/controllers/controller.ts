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

    // Korisceni operatori:
    // $push: https://www.mongodb.com/docs/manual/reference/operator/update/push/#append-a-value-to-an-array
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

    // Korisceni operatori:
    // $ne: https://www.mongodb.com/docs/manual/reference/operator/query/ne/#match-document-fields
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

    // Korisceni operatori:
    // $inc: https://www.mongodb.com/docs/manual/reference/operator/update/inc/#example
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

    // Prvi nacin za buyPresent (kod ovog nacina se azurira SAMO PRVI NADJENI element koji zadovoljava uslov filtriranja -
    // u ovom slucaju nam to odgovara jer i zelimo samo jedan proizvod da azuriramo; ne treba koristiti kada je potrebno da
    // se azuriraju svi elementi niza koji zadovoljavaju uslov filtriranja zato sto se na ovaj nacin samo prvi nadjeni element
    // azurira - za tu primenu koristiti drugi nacin za buyPresent sa updateMany).

    // Korisceni operatori:
    // $ (update): https://www.mongodb.com/docs/manual/reference/operator/update/positional/#update-documents-in-an-array
    /*
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
    */

    // Drugi nacin za buyPresent (kod ovog nacina bi se azurirao SVAKI NADJENI element koji zadovoljava uslov filtriranja
    // kada bismo koristili updateMany umesto updateOne).

    // Korisceni operatori:
    // $[<identifier>]: https://www.mongodb.com/docs/manual/reference/operator/update/positional-filtered/#update-all-documents-that-match-arrayfilters-in-an-array
    buyPresent = (request: express.Request, response: express.Response) => {
        UserModel.updateOne(
            {
                korisnickoIme: request.body.username
            },
            {
                $set: {
                    "lista.$[product].kupio": request.body.product.kupio,
                    "lista.$[product].anonimno": request.body.product.anonimno
                }
            },
            {
                arrayFilters: [
                    { "product.proizvod": request.body.product.proizvod }
                ]
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

    // Korisceni operatori:
    // $inc: https://www.mongodb.com/docs/manual/reference/operator/update/inc/#example
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