import express from 'express'
import KorisnikModel from "../models/korisnik"
import ProizvodModel from "../models/proizvod"
import NarudzbinaModel from "../models/narudzbina"

export class Controller {
    login = (request: express.Request, response: express.Response) => {
        KorisnikModel.findOne(
            {
                kor_ime: request.query.username,
                lozinka: request.query.password,
                tip: request.query.userType
            }
        ).then(
            (user) => {
                response.json(user)
            }
        ).catch((error) => console.log(error))
    }

    getAllProducts = (request: express.Request, response: express.Response) => {
        ProizvodModel.find({}).then(
            (products) => response.json(products)
        ).catch((error) => console.log(error))
    }

    // Korisceni operatori:
    // $push: https://www.mongodb.com/docs/manual/reference/operator/update/push/#append-a-value-to-an-array
    order = (request: express.Request, response: express.Response) => {
        let order = request.body
        let maxOrderId = -1
        NarudzbinaModel.find({}).then(
            (orders: any[]) => {
                orders.forEach((order) => { if (order.idN > maxOrderId) maxOrderId = order.idN })
                order.idN = maxOrderId + 1
                new NarudzbinaModel(order).save().then(
                    () => {
                        KorisnikModel.updateOne(
                            {
                                kor_ime: order.kupac
                            },
                            {
                                $push: { narudzbine: { idN: maxOrderId + 1 } }
                            }
                        ).then(
                            () => {
                                ProizvodModel.find({}).then(
                                    (products: any) => {
                                        order.proizvodi.forEach(
                                            (product: any) => {
                                                let newProduct = products.find((prod: any) => prod.naziv == product.naziv)
                                                let index = products.findIndex((prod: any) => prod.naziv == product.naziv)
                                                newProduct.stanje -= Number(product.kolicina)
                                                products[index] = newProduct
                                            }
                                        )
                                        ProizvodModel.deleteMany({}).then(
                                            () => {
                                                ProizvodModel.insertMany(products).then(
                                                    () => {
                                                        response.json({ message: "ok" })
                                                    }
                                                ).catch((error) => console.log(error))
                                            }
                                        ).catch((error) => console.log(error))
                                    }
                                ).catch((error) => console.log(error))
                            }
                        ).catch((error) => console.log(error))
                    }
                ).catch((error) => console.log(error))
            }
        ).catch((error) => console.log(error))
    }

    getAllOrders = (request: express.Request, response: express.Response) => {
        KorisnikModel.find({}).then(
            (users) => {
                NarudzbinaModel.find({}).then(
                    (orders) => {
                        let updatedOrders: any[] = []
                        orders.forEach(
                            (order) => {
                                let user: any = users.find((user) => user.kor_ime == order.kupac)
                                let totalKilograms = 0
                                order.proizvodi.forEach(
                                    (product) => {
                                        totalKilograms += Number(product.kolicina)
                                    }
                                )
                                updatedOrders.push(
                                    {
                                        idN: order.idN,
                                        kupac: order.kupac,
                                        proizvodi: order.proizvodi,
                                        racun: order.racun,
                                        imeKupca: user.ime,
                                        ukupnaKilaza: totalKilograms
                                    }
                                )
                            }
                        )
                        response.json(updatedOrders)
                    }
                ).catch((error) => console.log(error))
            }
        ).catch((error) => console.log(error))
    }

    updateQuantity = (request: express.Request, response: express.Response) => {
        ProizvodModel.deleteMany({}).then(
            () => {
                ProizvodModel.insertMany(request.body).then(
                    () => {
                        response.json({ message: "ok" })
                    }
                ).catch((error) => console.log(error))
            }
        ).catch((error) => console.log(error))
    }
}