const Model = require('../models/advertsModel');

const buildError = (code, message) => ({ code, message });

const getAll = async () => {
  try {
    return Model.getAll();
  } catch (e) {
    console.log(e.message);
    return buildError(500, 'não foi possível executar essa ação.');
  }
};

const getById = async (ID) => {
  try {
    return Model.getById(ID);
  } catch (e) {
    console.log(e.message);
    return buildError(404, 'Id não encontrado');
  }
};

const updateById = async (payload) => {
  try {
    await Model.updateById(payload);
  } catch (e) {
    console.log(e.message);
    return buildError(500, 'não foi possível executar essa ação.');
  }
};

const addNew = async (payload) => {
  try {
    await Model.addNew(payload);
  } catch (e) {
    console.log(e.message);
    return buildError(500, 'não foi possível executar essa ação.');
  }
};

const deleteOne = async (ID) => {
  try {
    await Model.deleteOne(ID);
  } catch (e) {
    console.log(e.message);
    return buildError(404, 'Id não encontrado');
  }
};

module.exports = {
  getAll,
  getById,
  updateById,
  addNew,
  deleteOne,
};
