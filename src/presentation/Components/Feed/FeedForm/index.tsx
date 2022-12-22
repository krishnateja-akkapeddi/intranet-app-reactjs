import React from "react";
import { PublishPost } from "../../../../domain/usages/publishPost";
import FormPop from "./FormPop";

type Props = {
  publishPost: PublishPost;
};

const FeedForm = (props: Props) => {
  const [value, setValue] = React.useState("");
  const [length, setLength] = React.useState();

  console.log("VALUE", value);
  console.log("VALUE", value.length);

  return (
    <div>
      <FormPop publishPost={props.publishPost} />
    </div>
  );
};

export default FeedForm;
