import React from "react";

function mapMessages(message, handleOnclick, closed) {
  return (
    <div className="lecture-message">
      <div className="lecture-message-container">
        <h3 className="lecture-message-titre">{`${message.nom}`}</h3>
        <p className="lecture-message-text">{message.message}</p>
        <p className="lecture-message-repondre">
          Répondre à :{" "}
          <a className="lecture-message-email" href={`mailto:${message.email}`}>
            {message.email}
          </a>
        </p>
        <p className="lecture-message-repondre">
          Téléphone :{" "}
          <a href={`tel:+33${message.telephone}`}>{message.telephone}</a>
        </p>
        {!closed ? (
          <button
            type="button"
            className="button-blue lecture-button"
            onClick={() => handleOnclick(message.id)}
          >
            Classer ce message comme "traité"
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default mapMessages;
