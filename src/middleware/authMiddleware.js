import { userModel } from "../model/userModel.js"
import { env } from "../config/environment.js"
import { collectionGroup } from "firebase/firestore"
import { userService } from "../service/userService.js"
import express from 'express'
import cookieParser from 'cookie-parser'


const app = express();

app.use(cookieParser())
// kiểm tra user đã đăng nhập chưa
export const authMiddlewareLogin = async (req, res, next) => {
  try {
    const cookie = req.cookies["acess_token"]
    const resfreh_cookie = req.cookies["refresh_token"]
    if (!cookie && !resfreh_cookie) {
      res.status(404).send(null)
    }
    else if (!cookie) {
      const access_cookie = await userService.getUser(resfreh_cookie)
        .then((results) => {
          const access_token = userModel.generateAcessToken({ id: results.id })
          res.cookie("acess_token", access_token, {
            httpOnly: true,
            maxAge: 60 * 1000,
            sameSite: "None",
            secure: true
          })
          return access_token
        })
      req.access_cookie = access_cookie
      next()
    }
    else {
      req.access_cookie = cookie
      next()
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
//kiểm tra user có quyênd truy cập không 
export const authMiddlewareRole = async (req, res, next) => {
  const userLogged = await userModel.getUser(req.access_cookie)
  if (!userLogged) {
    res.status(422).json({ message: "You must login !" })
  }
  else if (userLogged.role !== env.ROLE_ADMIN) {
    res.status(422).json({ message: "You are not permisson !" })
  }
  else {
    req.user = userLogged
    next()
  }
}