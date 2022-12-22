import { Grid, Paper } from "@mui/material";
import React from "react";
import { FetchCategories } from "../../domain/usages/fetch-categories";
import { FetchFeed } from "../../domain/usages/fetch-posts";
import { PublishPost } from "../../domain/usages/publishPost";
import Feed from "../Components/Feed";
import Categories from "../Components/Feed/Categories";
import FeedForm from "../Components/Feed/FeedForm";
import UsefulLinks from "../Components/Resources/UserfulLinks";

type Props = {
  publishPost: PublishPost;
  fetchPosts: FetchFeed;
  fetchCategories: FetchCategories;
};

const FeedPage = (props: Props) => {
  const [category, setCategory] = React.useState("");
  return (
    <Paper
      style={{
        paddingLeft: "7rem",
        paddingRight: "7rem",
        height: "100vh",
      }}
    >
      <br />
      <Grid container spacing={2}>
        <Grid xs={1} item></Grid>
        <Grid item xs={2}>
          <br />
          <FeedForm publishPost={props.publishPost} />
          <br />
          <Categories
            setCategory={setCategory}
            category={category}
            fetchCategories={props.fetchCategories}
          />
        </Grid>
        <Grid item xs={6}>
          <Feed
            setCategory={setCategory}
            category={category}
            fetchPosts={props.fetchPosts}
            publishPost={props.publishPost}
          />
        </Grid>
        <Grid item xs={2.5}>
          <UsefulLinks />
        </Grid>
        <Grid xs={0.5} item></Grid>
      </Grid>
    </Paper>
  );
};

export default FeedPage;
