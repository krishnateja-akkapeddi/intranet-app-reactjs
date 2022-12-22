import GoogleOneTapLogin, {
  useGoogleOneTapLogin,
} from "react-google-one-tap-login";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import Typography from "@mui/material/Typography";
import IntraOrn from "../../resources/images/intra_orn.png";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_CLIENT } from "../../../base";
import { Private } from "../../../domain/Constants";
import { UserType } from "../../../domain/models/userType";
import { UserLogin, UserLoginParams } from "../../../domain/usages/login";
import { LocalJsonStorage } from "../../../infra/http/local-json-storage";
import { appSlice } from "../../../store/slices/AppSlice";

type Props = {
  remoteFetchUser: UserLogin;
};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLoginSuccess = async (res: any) => {
    const userInstance = LocalJsonStorage.getInstance();
    console.log(res);
    const GoogleResponse: GoogleLoginResponse = res;
    console.log("RES", GoogleResponse);
    const params = {} as UserLoginParams.params;
    params.authId = GoogleResponse.tokenId;
    try {
      const data = await props.remoteFetchUser.login(params);
      if (data.success) {
        Swal.fire({ toast: true, icon: "success", text: "Login Success" });
        const localStore = LocalJsonStorage.getInstance();
        localStore.add(Private.USERINFO, data.body);
        localStore.add(Private.AUTH, GoogleResponse.tokenId);
        const user: UserType = data.body;
        user.token = GoogleResponse.tokenId;
        user.profilePic = GoogleResponse.profileObj.imageUrl;
        dispatch(appSlice.actions.storeUser(user));
        navigate("/feed");
      } else {
        Swal.fire({ toast: true, icon: "error", text: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleLoginFail(e: any) {
    console.log(e);
    console.log("Something went worn");
  }
  // useGoogleOneTapLogin({
  //   onError: (error) => console.log("ERR_RAJ", error),
  //   onSuccess: (response) => handleLoginSuccess(response),
  //   googleAccountConfigs: {
  //     client_id: AUTH_CLIENT,
  //   },
  // });

  return (
    <div className="bg-text" id="signInButton">
      <div className="bg-image"></div>
      <div style={{ position: "absolute", top: "50%", right: "45%" }}>
        <GoogleLogin
          cookiePolicy={"single_host_origin"}
          buttonText="Sign in with Google"
          clientId={AUTH_CLIENT}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFail}
        />
      </div>
    </div>
  );
};
export default Login;
