import React from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

Modal.setAppElement("#app");

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      isOpen: false,
      error: ""
    };
  }
  onSubmit = e => {
    // const url = this.refs.url.value.trim();
    const { url } = this.state;
    e.preventDefault();

    // Links.insert({ url, userId: Meteor.userId() });
    Meteor.call("links.insert", url, err => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  };

  handleModalClose = () => {
    this.setState({ isOpen: false, url: "", error: "" });
  };

  onChange = e => {
    this.setState({
      url: e.target.value
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ isOpen: true })}
          className="button"
        >
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit} className="boxed-view__form">
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange}
            />
            <button className="button">Add Link</button>
            <button
              type="button"
              onClick={this.handleModalClose}
              className="button button--secondary"
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
