import React, { Component } from "react";
import StorageCard from "./StorageCard";
import "./App.css";
import { plainToInstance } from "class-transformer";

interface State {
  storages: Set<StorageData>;
  newStorageNev?: string;
  newStorageMeret?: string;
  newStorageAr?: string;
}

class StorageData {
  id!: number;
  nev!: string;
  meret!: number;
  ar!: number;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      storages: new Set<StorageData>(),
      newStorageNev: "",
      newStorageMeret: "",
      newStorageAr: "",
    };
  }

  async loadStorage() {
    let response = await fetch("http://localhost:3000/api/tarhely");
    let data: Object[] = await response.json();

    this.setState({ storages: new Set(plainToInstance(StorageData, data)) });
  }

  componentDidMount() {
    this.loadStorage();
  }

  addStorage(nev: string, meret: number, ar: number) {
    fetch(`http://localhost:3000/api/tarhely`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nev: nev, meret: meret, ar: ar }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.state.storages.add(plainToInstance(StorageData, data));
        this.forceUpdate();
      });

    // this.state.storages.add();
  }

  deleteStorage(id: number) {
    const { storages } = this.state;
    const target = [...storages].find((target) => target.id === id);
    this.state.storages.delete(target!);
    fetch(`http://localhost:3000/api/tarhely/${id}`, { method: "DELETE" });
    this.forceUpdate();
  }

  render() {
    const { storages, newStorageNev, newStorageMeret, newStorageAr } =
      this.state;

    return (
      <div className="container my-4" style={{ maxWidth: "1024px" }}>
        <div className="row justify-content-start mx-auto mb-4">
          <div className="form-floating mb-3 col-sm-4">
            <input
              className="form-control"
              value={newStorageNev}
              onChange={(event) => {
                this.setState({ newStorageNev: event.target.value });
              }}
            ></input>
            <label className="mx-2 mb-1">Név:</label>
          </div>

          <div className="form-floating mb-3 col-sm-4">
            <input
              className="form-control"
              value={newStorageMeret}
              onChange={(event) => {
                this.setState({
                  newStorageMeret: event.target.value,
                });
              }}
            ></input>
            <label className="mx-2 mb-1">Méret:</label>
          </div>

          <div className="form-floating mb-3 col-sm-4">
            <input
              className="form-control"
              value={newStorageAr}
              onChange={(event) => {
                this.setState({
                  newStorageAr: event.target.value,
                });
              }}
            ></input>
            <label className="mx-2 mb-1">Ár:</label>
          </div>

          <button
            className="btn btn-outline-secondary btn-lg btn-block"
            onClick={() => {
              if (newStorageNev && newStorageMeret && newStorageAr) {
                this.addStorage(
                  newStorageNev!,
                  parseInt(newStorageMeret!),
                  parseInt(newStorageAr!)
                );
              }
            }}
          >
            Hozzáad
          </button>
        </div>

        <div className="row gap-3 justify-content-start mx-auto">
          {[...storages].map((storage) => (
            <StorageCard
              key={crypto.randomUUID()}
              id={storage.id}
              nev={storage.nev}
              meret={storage.meret}
              ar={storage.ar}
              deleteCallback={() => {
                this.deleteStorage(storage.id);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
