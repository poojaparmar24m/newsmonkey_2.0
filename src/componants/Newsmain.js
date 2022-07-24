import React, { Component } from "react";
import Gifspinner from "./Gifspinner";
import Newsitems from "./Newsitems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class Newsmain extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 3,
    category: "general",
  };
  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  state = {
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0,
  };

  async updateNews() {
    // console.log("update");
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseDate = await data.json();
    this.props.setProgress(70);
    // console.log(parseDate.articles);
    this.setState({
      articles: parseDate.articles,
      totalResults: parseDate.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    document.title = `NewsMonkey -  ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  async componentDidMount() {
    console.log("cmd");
    this.updateNews();
    // if (this.props.category === "general") {
    //   window.location.reload(false);
    // } else {
    //   window.location.reload(true);
    // }
  }

  // handleprevClick = async () => {
  //   console.log("prev");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e99301644d4c43e58d552fb1e2b9f478&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading: true,
  //   });
  //   let data = await fetch(url);
  //   let parseDate = await data.json();
  //   // console.log(parseDate.articles);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parseDate.articles,
  //     loading: false,
  //   });

  // };
  // handleNextClick = async () => {
  //   console.log("next");
  //   if (!(this.state.page + 1 >Math.ceil(this.state.totalResults / this.props.pageSize)) ) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e99301644d4c43e58d552fb1e2b9f478&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({
  //       loading: true,
  //     });
  //     let data = await fetch(url);
  //     let parseDate = await data.json();
  //     // console.log(parseDate.articles);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parseDate.articles,
  //       loading: false,
  //     });
  //     // console.log(this.state.page + 1);
  //   }

  // };
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1,
    });
    let data = await fetch(url);
    let parseDate = await data.json();
    // console.log(parseDate.articles);
    this.setState({
      articles: this.state.articles.concat(parseDate.articles),

      totalResults: parseDate.totalResults,
      loading: false,
    });
  };

  render() {
    return (
      <>
        <div>
          <h3 className="text-center" style={{ marginTop: "70px" }}>
            NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}
            News Headline
          </h3>
          <hr></hr>
          {this.state.loading && <Gifspinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Gifspinner />}
          >
            <div className="container my-4 ">
              <div className="row my-3">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <Newsitems
                        title={
                          element.title ? element.title : "Title Not Available"
                        }
                        descr={
                          element.description
                            ? element.description
                            : "Descriptions Are Not  Available"
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
        {/* {!this.state.loading && (
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              className="btn btn-secondary"
              onClick={this.handleprevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-secondary"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div> */}
        {/* )} */}
      </>
    );
  }
}
