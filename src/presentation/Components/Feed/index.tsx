import React from "react";
import { FetchFeed } from "../../../domain/usages/fetch-posts";
import { PublishPost } from "../../../domain/usages/publishPost";
import FeedForm from "./FeedForm";
import FeedList from "./FeedList";

type Props = {
  publishPost: PublishPost;
  fetchPosts: FetchFeed;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
};
const Feed = (props: Props) => {
  return (
    <div>
      <FeedList
        setCategory={props.setCategory}
        category={props.category}
        fetchPosts={props.fetchPosts}
      />
    </div>
  );
};

export default Feed;
