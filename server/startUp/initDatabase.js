// 1. У любого пользователя будет в базе данных как минимум qualities и profession
// 2. Они равны mock данным

const Part = require("../models/Part");
const partMock = require("../mock/parts.json");
module.exports = async () => {
  const parts = await Part.find();
  if (parts.length !== partMock.length) {
    await createInitialEntity(Part, partMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
