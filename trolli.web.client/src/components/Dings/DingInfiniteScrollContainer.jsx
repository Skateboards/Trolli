import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import DingDisplaySmall from "./DingDisplaySmall";
// import PageLoader from "../PageLoader";

import * as dingSvc from "../../Services/dingService";

export default class DingInfiniteScrollContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dings: [],
      hasNextPage: true
    };

    this.pageIndex = 0;
    this.pageSize = 5;
  }

  loadItems(page) {
    const qStr = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    };

    dingSvc.getPageNearby(qStr).then(resp => {
      let dings = [...this.state.dings];
      resp.item.pagedItems.forEach(ding => dings.push(ding));

      this.setState({
        dings,
        hasNextPage: resp.item.hasNextPage
      });

      this.pageIndex++;
    });
  }

  mapDingToDisplay = ding => {
    return (
      <DingDisplaySmall key={Math.random().toString() + ding.id} ding={ding} />
    );
  };

  render() {
    // const loader = <PageLoader />;

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasNextPage}
        // loader={loader}
      >
        {this.state.dings.length > 0 &&
          this.state.dings.map(this.mapDingToDisplay)}
      </InfiniteScroll>
    );
  }
}
