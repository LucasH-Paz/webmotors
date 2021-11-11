const Service = require('../services/advertsService');

const getAll = async (_req, res, next) => {
  const result = await Service.getAll();

  if (result && result.message) return next(result);
  res.status(200).send(result);
};

const getById = async (req, res, next) => {
  const { ID } = req.params;
  const result = await Service.getById(ID);

  if (result.message) return next(result);
  res.status(200).send(result);
};

const updateById = async (req, res, next) => {
  const { marca, modelo, versao, ano, quilometragem, observacao } = req.body;
  const { ID } = req.params;

  const result = await Service.updateById({
    marca, modelo, versao, ano, quilometragem, observacao, ID
  });

  if (result && result.message) return next(result);
  res.status(201).end();
};

const addNew = async (req, res, next) => {
  const { marca, modelo, versao, ano, quilometragem, observacao } = req.body;

  const result = await Service.addNew({
    marca, modelo, versao, ano, quilometragem, observacao
  });

  if (result && result.message) return next(result);
  res.status(201).end();
};


const deleteOne = async (req, res, next) => {
  const { ID } = req.params;
  const result = await Service.deleteOne(ID);

  if (result && result.message) return next(result);
  res.status(200).end();
};

module.exports = {
  getAll,
  getById,
  updateById,
  addNew,
  deleteOne,
};
