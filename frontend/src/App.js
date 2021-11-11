import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';

import Header from './Components/Header';
import List from './Components/List';
import Form from './Components/Form';
import Loading from './Components/Loading';

import { getItems, getMakers, getModels, getVersions } from './Services/network';

function App() {
  const DEFAULT_DOC = {
    ID: 0,
    marca: '',
    modelo: '',
    versao: '',
    ano: 2021,
    quilometragem: 0,
    observacao: '',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState([]);
  const [currentDoc, setCurrentDoc] = useState(DEFAULT_DOC);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [makers, setMakerts] = useState([]);
  const [models, setModels] = useState([]);
  const [versions, setVersions] = useState([]);
  const [currentMaker, setCurrentMaker] = useState(1);
  const [currentModel, setCurrentModel] = useState(1);

  useEffect(() => {
    const handleMount = async () => {
      setIsLoading(true);
      const { data } = await getMakers();
      setMakerts(data);
      setIsLoading(false);
    };

    handleMount();
  }, []);

  useEffect(() => {
    const handleMakersUpdate = async () => {
      setIsLoading(true);
      const { data } = await getModels(currentMaker);
      setModels(data);
      setIsLoading(false);
    };

    handleMakersUpdate();
  }, [currentMaker]);

  useEffect(() => {
    const handleModelUpdate = async () => {
      setIsLoading(true);
      const { data } = await getVersions(currentModel);
      setVersions(data);
      setIsLoading(false);
    };

    handleModelUpdate();
  }, [currentModel]);

  const resetStates = () => {
    setIsEditing(false);
    setCurrentDoc(DEFAULT_DOC);
    setIsUpdate(false);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      const fetchItems = async () => {
        setIsLoading(true);
        const { data } = await getItems();
        setItems(data);
        setIsLoading(false);
      };
      fetchItems();
    } catch (e) {
      resetStates();
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <Header setIsEditing={setIsEditing} isEditing={isEditing} />
      <div className="content-cntl">
        {isEditing && (
          <Form
            currentDoc={currentDoc}
            items={items}
            options={{ makers, models, versions }}
            setters={
              { setItems, resetStates, setIsLoading }
            }
            isUpdate={isUpdate}
          />
        )}
        {!isLoading && (
          <div>
            <List
              items={items}
              setters={
                {
                  setIsEditing,
                  setItems,
                  setCurrentDoc,
                  setIsUpdate,
                  setIsLoading,
                  setCurrentMaker,
                  setCurrentModel 
                }
              }
            />
          </div>
        )}
      </div>
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
