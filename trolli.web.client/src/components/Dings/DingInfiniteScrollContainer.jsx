import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

import * as dingSvc from "../../Services/dingService";

export default class DingInfiniteScrollContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dings: [],
      hasNextPage: false,
      pageIndex: 0,
      pageSize: 3
    };
  }

  loadItems(page) {
    var self = this;

    const qStr = {
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex,
      lat: this.location.lat,
      long: this.location.long
    };

    qwest
      .get(
        url,
        {
          client_id: api.client_id,
          linked_partitioning: 1,
          page_size: 10
        },
        {
          cache: true
        }
      )
      .then(function(xhr, resp) {
        if (resp) {
          var tracks = self.state.tracks;
          resp.collection.map(track => {
            if (track.artwork_url == null) {
              track.artwork_url = track.user.avatar_url;
            }

            tracks.push(track);
          });

          if (resp.next_href) {
            self.setState({
              tracks: tracks,
              nextHref: resp.next_href
            });
          } else {
            self.setState({
              hasMoreItems: false
            });
          }
        }
      });
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    var items = [];
    this.state.tracks.map((track, i) => {
      items.push(
        <div className="track" key={i}>
          <a href={track.permalink_url} target="_blank">
            <img src={track.artwork_url} width="150" height="150" />
            <p className="title">{track.title}</p>
          </a>
        </div>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}
      >
        <div className="tracks">{items}</div>
      </InfiniteScroll>
    );
  }
}
