import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { FileUploader } from "react-drag-drop-files";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  CircularProgress,
  ClickAwayListener,
  IconButton,
  Paper,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Swal from "sweetalert2";

import { borderRadius } from "@mui/system";
import { userInfo } from "os";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Private } from "../../../../domain/Constants";
import { PostType } from "../../../../domain/models/postType";
import { UserType } from "../../../../domain/models/userType";
import { PublishPost } from "../../../../domain/usages/publishPost";
import { LocalJsonStorage } from "../../../../infra/http/local-json-storage";
import pageRoutes from "../../../../routes/pageRoutes";
import { appSlice } from "../../../../store/slices/AppSlice";
import { RootState } from "../../../../store/Store";
import { fileToUrlConverter } from "../../../../utilities/blobToUrl";
import GaRichTextEditor from "../../../GaComponents/GaRichTextEditor";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
  publishPost: PublishPost;
};
export default function FormPop(props: Props) {
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const user = useSelector<RootState, UserType | null>(
    (state) => state.app.userInfo
  );
  const [postDescription, setDescription] = React.useState("");
  const [postTitle, setTitle] = React.useState("");
  const [postImage, setFile] = React.useState<any>();
  const [previewSrc, setPreviewSrc] = React.useState<any>();
  const storage = LocalJsonStorage.getInstance();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleFileChange = (file: File) => {
    console.log("FILE", file);
    if (file) {
      setPreviewSrc(fileToUrlConverter(file));
    }
    setFile(file);
  };
  const handleClickOpen = async () => {
    setOpen(true);
  };
  const handleBoxClode = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if ((reason = "backdropClick" || "escapeKeyDown")) {
      setOpen(false);
    }
  };

  const handleClose = async () => {
    setOpen(false);

    await Swal.fire({
      customClass: {
        container: "my-swal",
      },
      title: "Do you want to save it as draft and continue later?",
      text: "Note! You might need to upload your image again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it as draft!",
      cancelButtonText: "No, discard the post",
    }).then((result) => {
      if (result.isConfirmed) {
        const draftPost: PostType = {
          postTitle: postTitle,
          postDescription: postDescription,
        };
        storage.add("draft", draftPost);
        Swal.fire("Draft Saved! 😃", "Your post is saved as draft ", "success");
        return;
      }
      setTitle("");
      setDescription("");
      setFile(null);
      storage.remove("draft");
      Swal.fire("Post Discarded!", "Your post is discarded!.", "success");
    });
  };
  async function handleSubmitPost() {
    // setOpen(false);
    var formdata = new FormData();

    if (!postDescription || !postTitle || !postImage) {
      alert("Make sure to create all the details");
      return;
    }
    if (user) {
      formdata.append("postTitle", postTitle);
      formdata.append("postDescription", postDescription);
      formdata.append("postImage", postImage);
      formdata.append("user", user.userId.toString());
      formdata.append("category", user.userId.toString());
    } else {
      alert("Please login");
      return;
    }

    setLoading(true);
    await props.publishPost.publish(formdata).then((data) => {
      if (data.success) {
        setOpen(false);
        Swal.fire({
          title: "Post successfully submitted",
          icon: "success",
        });
        setLoading(false);
        return;
      } else {
        setOpen(false);

        Swal.fire({
          title: data.message,
          icon: "error",
        }).then((daa) => {
          if (data.message === Private.UNAUTHORIZED) {
            const draftPost: PostType = {
              postTitle: postTitle,
              postDescription: postDescription,
            };
            storage.add("draft", draftPost);
            dispatch(appSlice.actions.logout(data));
            navigate(pageRoutes[0].path);
          }
        });

        setLoading(false);
        return;
      }
    });
  }
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTitle(e.target.value);
  }
  React.useEffect(() => {
    const getDraft = async () => {
      const draft: PostType = await storage.get("draft");
      if (draft) {
        setTitle(draft.postTitle);
        setDescription(draft.postDescription);
      }
    };

    getDraft().then(() => console.log("FILE"));
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      {/* <div style={{ margin: "0" }}>
        <Box
          onClick={() => setOpen(true)}
          display="flex"
          sx={{
            backgroundColor: "common.white",
            borderRadius: "1rem",
            boxShadow: 1,
            width: "92%",
            marginLeft: "3%",
            paddingTop: "10px",
            paddingBottom: "10px",

            cursor: "pointer",
          }}
          gap={2}
          justifyItems="center"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar src={user?.profilePic} />
          <Paper
            elevation={0}
            color="gray"
            component="div"
            sx={{
              border: "1px solid #d3d3d3",
              width: "80%",
              padding: "10px 1rem 10px 1rem",
              borderRadius: "5rem",
            }}
          >
            Create your awesome post
            <div style={{ float: "right" }}>
              <AddPhotoAlternateIcon color="primary" />
            </div>
          </Paper>
        </Box>
      </div> */}
      <Paper sx={{ width: "100%" }}>
        <Button onClick={() => setOpen(true)} fullWidth>
          <AddIcon /> Create New Post
        </Button>
      </Paper>
      <Dialog
        onBackdropClick={() => setOpen(false)}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        open={open}
        scroll="body"
        onClose={handleBoxClode}
        PaperProps={{ sx: { verticalAlign: "top" } }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Create Your Awesome Post</DialogTitle>
        <DialogContent sx={{ height: "20rem" }}>
          <TextField
            sx={{ marginTop: "15px", marginBottom: "1rem" }}
            value={postTitle}
            onChange={handleChange}
            label="Title"
            fullWidth
          />
          <GaRichTextEditor value={postDescription} onChange={setDescription} />
          {postDescription.length > 4000 && (
            <Typography color="red">Description data is too large</Typography>
          )}
          <br />
          {postImage && (
            <div style={{ textAlign: "center" }}>
              <img
                id="preview"
                src={previewSrc}
                style={{
                  width: "80%",
                  alignSelf: "center",
                  borderRadius: "1rem",
                }}
              ></img>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <div style={{ flex: "1 0 0" }}>
            <FileUploader
              multiple={false}
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
            >
              <IconButton sx={{ float: "left" }}>
                <AddPhotoAlternateIcon />
              </IconButton>
            </FileUploader>
          </div>
          <Button color="primary" onClick={handleClose}>
            Discard
          </Button>
          <Button onClick={handleSubmitPost}>
            {loading ? <CircularProgress /> : " Post"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
