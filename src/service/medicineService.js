import { medicineModel } from '../model/medicineModel.js'

const createNew = async (reqBody) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newmedicine = await medicineModel.createNew(reqBody);
    console.log("Document written with ID: ", newmedicine);
    return newmedicine
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const getAllMedicines = async () => {
  try {
    const allMedicines = await medicineModel.getAllMedicines();
    return allMedicines
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id) => {
  try {
    // const docRef = await addDoc(collection(db, "users"), req.body);
    const newMedicine = await medicineModel.update(reqBody, id);
    return newMedicine
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (id) => {
  try {
    const targetMedicine = await medicineModel.findOneById(id)
    if (!targetMedicine) {
      console.error("NOT FOUND")
      return
    }
    const deleteMedicine = await medicineModel.deleteAnItem(id)
    return deleteMedicine
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (reqBody) => {
  try {
    reqBody.forEach(async (_id) => {
      const targetMedicine = await medicineModel.findOneById(_id)
      if (!targetMedicine) {
        console.error("NOT FOUND")
        return
      }
      await medicineModel.deleteAnItem(_id)
    })
    return { message: "Xóa thành công" }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const medicineService = {
  createNew,
  getAllMedicines,
  update,
  deleteAnItem,
  deleteManyItems
}