import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  FeedPosts,
  feedResult,
} from "../../../../domain/models/feedResultType";
import {
  FetchFeed,
  FetchFeedParams,
} from "../../../../domain/usages/fetch-posts";
import FeedCard from "./FeedCard";
import SkeletonCard from "../../../GaComponents/SkeletonCard";

type Props = {
  fetchPosts: FetchFeed;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
};

const FeedList = (props: Props) => {
  const [feed, setFeed] = React.useState<FeedPosts[]>();
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [lastPage, setLastPage] = useState<number>(0);
  const [fetchState, setFetchState] = useState("");

  const hasMoreData = () => {
    return fetchState === "success" ? currentPage < lastPage - 1 : false;
  };

  const fetchFeed = useCallback(
    async (page: number, scrolled?: boolean) => {
      const params: FetchFeedParams.params = {
        category: "",
        elementsLength: "",
        page: "",
      };
      params.category = props.category;
      params.elementsLength = "5";
      try {
        if (!scrolled) {
          setFetchState("loading");
        }
        let result: feedResult = await props.fetchPosts.fetchFeed({
          ...params,
          page: page.toString(),
        });
        if (result.success) {
          setCurrentPage(result.paginationDetails.currentPage);
          setLastPage(result.paginationDetails.totalPages);
          if (scrolled) {
            setFeed((oldData: any) => [...oldData, ...result.body]);
          } else {
            setFeed(result.body);
          }
          setFetchState("success");
        }
      } catch (err) {
        setFetchState("loading");
      }
    },
    [props.category]
  );

  // const fetchFeed = async () => {
  //   const params = {} as FetchFeedParams.params;
  //   params.page = "1";
  //   params.elementsLength = "5";
  //   setLoading(true);

  //   const data: feedResult = await props.fetchPosts.fetchFeed(params);
  //   if (data.success) {
  //     setFeed(data.body);

  //     setLoading(true);
  //     return;
  //   }
  //   Swal.fire({
  //     icon: "error",
  //     text: "Something went wrong",
  //   });
  //   setLoading(true);
  // };

  React.useEffect(() => {
    fetchFeed(0, false);
  }, [props.category]);

  return (
    <div
      id="scrollableDiv"
      className="stylishScroll"
      style={{
        width: "91%",
        padding: "0px 28px 16px 20px",
        marginTop: "1rem",
        height: "90vh",
        overflowY: `${feed && feed.length > 5 ? "scroll" : "auto"}`,
      }}
    >
      {/* <hr style={{ width: "90%", color: "#F8F8F8", marginBottom: "20px" }} /> */}

      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={feed ? feed?.length : 5}
        next={() => {
          fetchFeed(currentPage + 1, true);
        }}
        hasMore={hasMoreData()}
        loader={<SkeletonCard />}
      >
        {fetchState === "loading" ? (
          <SkeletonCard />
        ) : (
          feed?.map((post, index) => {
            return <FeedCard feedPost={post} />;
          })
        )}
      </InfiniteScroll>
    </div>
  );
};

export default FeedList;
