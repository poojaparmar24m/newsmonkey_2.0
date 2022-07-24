import React, { Component } from "react";

export default class Newsitems extends Component {
  render() {
    const { descr, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div>
        <div className="card my-3">
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://images.moneycontrol.com/static-mcnews/2022/07/Hyundai-Venue-1-770x433.jpg"
            }
            className="card-img-top img-fluid"
            alt="..."
            style={{ width: "500px", height: "250px" }}
          />

          <span
            className=" badge rounded-pill bg-secondary"
            style={{
              position: "absolute",
              left: "0",
              padding: "10px",
              zIndex: "1",
            }}
          >
            {this.props.source}
          </span>
          <div className="card-body">
            <h5 className="card-title">{this.props.title.slice(0, 50)}...</h5>
            <p className="card-text">{descr.slice(0, 90)}...</p>
            <p className="card-text">
              <small className="text-muted">
                by {author ? author : "Unknown"} On{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
