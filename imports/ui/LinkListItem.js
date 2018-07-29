import React from "react";
import propTypes from "prop-types";
import Clipboard from "clipboard";
import { Meteor } from "meteor/meteor";
import moment from "moment";

export default class LinkListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard
      .on("success", () => {
        this.setState({ justCopied: true });
        setTimeout(() => this.setState({ justCopied: false }), 1000);
      })
      .on("error", () => {
        alert("Unable to copy link address");
      });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  renderStats = () => {
    const { visitedCount, lastVisitedAt } = this.props;
    const visitMessage = visitedCount === 1 ? "visit" : "visits";
    let visitedMessage = null;
    if (typeof lastVisitedAt === "number") {
      visitedMessage = `(visited ${moment(lastVisitedAt).fromNow()})`;
    }
    return (
      <p className="item__message">
        {visitedCount} {visitMessage} {visitedMessage}
      </p>
    );
  };
  render() {
    let { url, shortUrl, visible, _id } = this.props;
    return (
      <div className="item">
        <h2>{url}</h2>
        <p className="item__message">{shortUrl}</p>
        {this.renderStats()}
        <a
          href={shortUrl}
          target="_blank"
          className="button button--pill button--link"
        >
          Visit
        </a>
        <button
          ref="copy"
          data-clipboard-text={shortUrl}
          className="button button--pill"
        >
          {this.state.justCopied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={() => Meteor.call("links.setVisibility", _id, !visible)}
          className="button button--pill"
        >
          {visible ? "Hide" : "Unhide"}
        </button>
      </div>
    );
  }
}

LinkListItem.propTypes = {
  _id: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
  userId: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  shortUrl: propTypes.string.isRequired,
  visitedCount: propTypes.number.isRequired,
  lastVisitedAt: propTypes.number
};
