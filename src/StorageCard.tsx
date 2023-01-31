import React, { Component } from "react";
import "./App.css";

interface Props {
  key: string;
  id: number;
  nev: string;
  meret: number;
  ar: number;
  deleteCallback: () => void;
}

class StorageCard extends Component<Props, {}> {
  render() {
    const { nev, meret, ar, deleteCallback } = this.props;
    return (
      <div
        className="card bg-light mb-3 col-sm-4"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header d-flex justify-content-end">
          <button
            type="button"
            className="btn-close btn-close-danger"
            aria-label="Close"
            onClick={deleteCallback}
          ></button>
        </div>
        <div className="card-body">
          <p className="card-text">{`${nev}`}</p>
          <p className="card-text">{`${meret} GB`}</p>
          <p className="card-text">{`${ar} Ft`}</p>
        </div>
      </div>
    );
  }
}

export default StorageCard;
