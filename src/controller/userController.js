
import { userService } from '../service/userService.js'


const signUp = async (req, res, next) => {
  try {

    const newUser = await userService.signUp(req.body);
    res.status(201).send(newUser)
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
const signIn = async (req, res, next) => {
  try {

    const loginUser = await userService.signIn(req.body);
    res.cookie("token", loginUser.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true
    })
    const { token, ...result } = loginUser
    res.status(201).json(result)
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
// const update = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const newMedicine = await medicineService.update(req.body, id);
//     // console.log("Document written with ID: ", newSpecialist);
//     res.status(201).json(newMedicine)
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }
const getUser = async (req, res, next) => {
  try {
    const cookie = req.cookies["token"]
    if (!cookie) {
      res.status(200).send(null)
    }
    else {
      const targetUser = await userService.getUser(cookie)
      res.status(200).json(targetUser)
    }

  } catch (e) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1)
    })
    console.error("Error adding document: ", e);
  }
}
const logOut = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(1)
    });
    res.status(200).json({ message: "logout success" })
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const userController = {
  signUp,
  signIn,
  getUser,
  logOut
}