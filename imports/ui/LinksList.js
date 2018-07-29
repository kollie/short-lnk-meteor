import React from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import FlipMove from "react-flip-move";

import { Links } from "../api/links";
import LinkListItem from "./LinkListItem";
import { Session } from "meteor/session";

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe("linksPub");
      const links = Links.find({
        visible: Session.get("showVisible")
      }).fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksItems = () => {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links found..!</p>
        </div>
      );
    }
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinkListItem key={link._id} shortUrl={shortUrl} {...link} />;
      // return <p key={link._id}>{link.url}</p>;
    });
  };
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight>{this.renderLinksItems()}</FlipMove>
      </div>
    );
  }
}
