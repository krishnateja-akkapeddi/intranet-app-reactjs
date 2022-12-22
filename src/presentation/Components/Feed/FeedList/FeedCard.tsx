import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FeedPosts } from "../../../../domain/models/feedResultType";
import ReactMarkdown from "react-markdown";
import rehype from "rehype-raw";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  feedPost: FeedPosts;
};
const FeedCard: React.FC<Props> = ({ feedPost }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card elevation={5} sx={{ maxWidth: 645 }}>
        <CardHeader
          avatar={
            <Avatar
              src={feedPost.userBasicDetails.profilePic}
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            ></Avatar>
          }
          title={feedPost.userBasicDetails.name}
          subheader={feedPost.userBasicDetails.role.role}
        />
        <CardMedia
          sx={{ objectFit: "contain" }}
          component="img"
          height="194"
          image={feedPost.url}
          alt="Paella dish"
        />

        <CardActions disableSpacing>
          <CardContent>
            <Typography fontWeight={600} variant="body2" color="text.secondary">
              {feedPost.postName}
            </Typography>
          </CardContent>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <ReactMarkdown rehypePlugins={[rehype]}>
            {feedPost.description}
          </ReactMarkdown>
        </Collapse>
      </Card>
      <br />
    </div>
  );
};
export default FeedCard;
