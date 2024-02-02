import express from 'express'
import UserModel from "../models/user"
import ProductModel from "../models/product"

export class Controller {
    login = (request: express.Request, response: express.Response) => {
        UserModel.findOne(
            {
                kor_ime: request.body.kor_ime,
                lozinka: request.body.lozinka,
                tip: request.body.tip
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

    getUserByUsername = (request: express.Request, response: express.Response) => {
        UserModel.findOne(
            {
                kor_ime: request.query.username
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

    getAllSellingProducts = (request: express.Request, response: express.Response) => {
        ProductModel.find(
            {
                status: "u prodavnici"
            }
        ).sort(
            {
                lajkovi: "ascending"
            }
        ).then(
            (products) => {
                response.json(products)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    likeProduct = (request: express.Request, response: express.Response) => {
        ProductModel.updateOne(
            {
                id: request.query.productId
            },
            {
                $inc: {
                    lajkovi: 1
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

    addNewProduct = (request: express.Request, response: express.Response) => {
        let newProduct = new ProductModel(request.body)
        let newProductId = 1
        ProductModel.find({}).sort({ id: "descending" }).limit(1).then(
            (products) => {
                if (products.length > 0) {
                    newProductId = products[0].id + 1
                }
                newProduct.id = newProductId
                newProduct.save().then(
                    () => {
                        response.json({ message: "ok" })
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

    getAllWaitingProducts = (request: express.Request, response: express.Response) => {
        ProductModel.find(
            {
                status: "na cekanju"
            }
        ).then(
            (products) => {
                response.json(products)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    updateProductStatus = (request: express.Request, response: express.Response) => {
        ProductModel.updateOne(
            {
                id: request.body.productId
            },
            {
                cena: request.body.productPrice,
                status: request.body.productStatus
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