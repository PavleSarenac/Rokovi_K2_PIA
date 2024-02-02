import * as express from "express";
import Korisnik from "../models/user";
import Proizvod from "../models/product";

export class UserController {
  login = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;
    let lozinka = req.body.lozinka;

    Korisnik.findOne({ kor_ime: kor_ime, lozinka: lozinka })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };

  getUser = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    Korisnik.findOne({ kor_ime: kor_ime })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));
  };
}
