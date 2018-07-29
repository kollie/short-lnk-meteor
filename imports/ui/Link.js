import React from "react";

import LinksList from "./LinksList";
import AddLink from "./AddLink";
import PrivateHeader from "./PrivateHeader";
import LinksListFilter from "./LinksListFilter";

export default () => {
  return (
    <div>
      <PrivateHeader title="Your Links" />
      <div className="page-content">
        <LinksListFilter />
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
};
