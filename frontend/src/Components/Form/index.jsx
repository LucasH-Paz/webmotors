import React from 'react';
import PropTypes from 'prop-types';
import { updateItem, newItem } from '../../Services/network';
import './styles.css';

const Form = ({ currentDoc, items, setters, isUpdate, options }) => {
  const {
    ID, marca, modelo, versao, ano, quilometragem, observacao,
  } = currentDoc;

  const { makers, models, versions } = options;
  
  const { setItems, resetStates } = setters;

  const handleStates = (payload, id) => {
    const newItems = items.reduce((acc, cur) => {
      acc.push(cur.ID === id ? payload : cur);
      return acc;
    }, []);

    setItems(newItems);
    resetStates();
  };

  const toggleUpdate = async (id, payload) => {
    if (isUpdate) {
      await updateItem(id, payload);
      handleStates(payload, id);
      return;
    }
    const { data: { ID, ...infos } } = await newItem(payload);
    setItems([...items, { ID, ...infos }]);
    resetStates();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {};

    payload.marca = document.querySelector('#make').value;
    payload.modelo = { name: document.querySelector('#model').value };
    payload.versao = document.querySelector('#version').value;
    payload.ano = { name: document.querySelector('#year').value };
    payload.quilometragem = `${document.querySelector('#average').checked}`;
    payload.obs = `${document.querySelector('#obs').checked}`;

    toggleUpdate(ID, payload);
  };

  return (
    <form>
      <label htmlFor="year" className="label">
        Ano
        <input
          type="number"
          name="ano"
          defaultValue={ano}
          id="year"
          className="input"
          required
        />
      </label>
      <label htmlFor="average" className="label">
          Quilometragem
        <input
          type="number"
          name="quilometragem"
          defaultValue={quilometragem}
          id="average"
          className="input"
          required
        />
      </label>
      <label htmlFor="obs" className="label">
        Observação
        <input
          type="textarea"
          name="client"
          defaultValue={observacao}
          id="clt"
          className="textarea"
          required
        />
      </label>
      <label htmlFor="make" className="select">
        <select id="make" defaultValue={marca}>
          { makers.map((brand, i) => (
            <option value={brand.Name} key={`brand${i}`}>{ brand }</option>
          ))}
        </select>
      </label>
      <label htmlFor="model" className="select">
        <select id="model" defaultValue={modelo}>
          { models.map((model, i) => (
            <option value={model.Name} key={`model${i}`}>{ model }</option>
          ))}
        </select>
      </label>
      <label htmlFor="version" className="select">
        <select id="version" defaultValue={versao}>
          { versions.map((version, i) => (
            <option value={version.Name} key={`version${i}`}>{ version }</option>
          ))}
        </select>
      </label>
      <button type="submit" onClick={handleSubmit} className="button is-success">
        Salvar
      </button>
      {'  '}
      <button type="button" onClick={() => resetStates()} className="button is-danger">
        Cancelar
      </button>
    </form>
  );
};

Form.propTypes = {
  currentDoc: PropTypes.object,
  isUpdate: PropTypes.bool,
}.isRequired;

export default Form;
