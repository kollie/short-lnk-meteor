import React from "react";
import propTypes from "prop-types";
import { Accounts } from "meteor/accounts-base";

const PrivateHeader = props => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button
          className="button button--link-text"
          onClick={() => {
            Accounts.logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

PrivateHeader.prototype = {
  title: propTypes.string.isRequired
};

export default PrivateHeader;