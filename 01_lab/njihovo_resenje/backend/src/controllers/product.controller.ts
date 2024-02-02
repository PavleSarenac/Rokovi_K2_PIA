import express from "express";
import Proizvod from "../models/product";
import { Types } from "mongoose";

export class ProductController {
  add = (req: express.Request, res: express.Response) => {
    let proizvod = new Proizvod(req.body);
    let x = 1;

    Proizvod.find({}).sort({ id: -1 }).limit(1)
      .then((max) => {
        if (max.length > 0) {
          // provera za slucaj da je kolekcija inicijalno prazna
          // tada ce prvi objekat imati id = x = 1
          // ako kolekcija nije prazna, dodelicemo prvi sledeci id
          x = max[0].id + 1;
        }

        proizvod.id = x;

        proizvod.save().then((p) => {
            res.status(200).json({ message: "proizvod added" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: "error" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "error" });
      });
  };

  getAllProductsInShop = (req: express.Request, res: express.Response) => {
    Proizvod.find({ status: "u prodavnici" })
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAllProductsWaiting = (req: express.Request, res: express.Response) => {
    Proizvod.find({ status: "na cekanju" })
      .then(
        products => {
          res.json(products);
        },
        err => {
          console.log(err);
        }
        // moze i ovakav zapis, bez catch
      );
  };

  like = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    console.log(id);

    Proizvod.findOneAndUpdate({ id: id }, { $inc: { lajkovi: 1 } })
      .then((success) => {
        res.json({ msg: "Success" });
      })
      .catch((err) => console.log(err));
  };

  change = (req: express.Request, res: express.Response) => {
    let id = req.body.id;
    let status = req.body.status;
    let cena = req.body.cena;

    Proizvod.findOneAndUpdate({ id: id }, { status: status, cena: cena })
      .then((success) => {
        res.json({ msg: "Success" });
      })
      .catch((err) => console.log(err));
  };
}
