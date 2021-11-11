const connection = require('./connection');

const TABLE_NAME = 'tb_AnuncioWebmotors';
const COLUMNS = 'marca, modelo, versao, ano, quilometragem, observacao';

const getAll = async () => {
  const [adverts] = await connection.execute(
    `SELECT * FROM teste_webmotors.${TABLE_NAME};`
  );
  return adverts;
};

const getById = async (ID) => {
  const query = `SELECT * FROM teste_webmotors.${TABLE_NAME} WHERE ID=?;`;
  const [[advert]] = await connection.execute(query, [ID]);
  return advert;
};

const updateById = async ({ marca, modelo, versao, ano, quilometragem, observacao, ID }) => {
  const query = `UPDATE teste_webmotors.${TABLE_NAME}` + 
  'SET marca=?, modelo=?, versao=?, ano=?, quilometragem=?, observacao=?' +
  ' WHERE ID=?;';

  await connection.execute(query, [marca, modelo, versao, ano, quilometragem, observacao, ID]);
};

const addNew = async ( { marca, modelo, versao, ano, quilometragem, observacao }) => {
  const query = `INSERT INTO teste_webmotors.${TABLE_NAME} (${COLUMNS}) ` +
  'VALUES (?, ?, ?, ?, ?, ?);';

  await connection.execute(query, [marca, modelo, versao, ano, quilometragem, observacao]);
};

const deleteOne = async (ID) => {
  await connection.execute(`DELETE FROM teste_webmotors.${TABLE_NAME} WHERE ID=?`, [ID]);
};

module.exports = {
  getAll,
  getById,
  updateById,
  addNew,
  deleteOne,
};
