import { equipmentModel } from '../model/equipmentModel.js'
const createNew = async (reqBody) => {
  try {

    const newEquipment = await equipmentModel.createNew(reqBody);
    return newEquipment
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const update = async (reqBody, id) => {
  try {

    const newEquipment = await equipmentModel.update(reqBody, id);
    return newEquipment
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getAllEquipments = async () => {
  try {
    const allEquipments = await equipmentModel.getAllEquipments();
    return allEquipments
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const deleteAnItem = async (id) => {
  try {
    const targetEquipment = await equipmentModel.findOneById(id)
    if (!targetEquipment) {
      console.error("NOT FOUND")
      return
    }
    const deleteEquipment = await equipmentModel.deleteAnItem(id)
    return deleteEquipment
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
const deleteManyItems = async (reqBody) => {
  try {
    // get all schedules 
    reqBody.forEach(async (_id) => {
      const targetEquipment = await equipmentModel.findOneById(_id)
      if (!targetEquipment) {
        console.error("NOT FOUND")
        return
      }
      await equipmentModel.deleteAnItem(_id)
    })
    return { message: "Xóa thành công !" }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
export const equipmentService = {
  createNew,
  update,
  getAllEquipments,
  deleteAnItem,
  deleteManyItems
}