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

    getAllProducts = (request: express.Request, response: express.Response) => {
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
}