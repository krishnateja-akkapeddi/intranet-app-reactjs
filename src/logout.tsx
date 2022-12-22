import { GoogleLogout } from "react-google-login";
const clientid =
  "133690514125-rsd4q5iaaoju3dpavpbh309b398toup6.apps.googleusercontent.com";
const Logout = () => {
  const onSuccess = () => {
    console.log("Logout Successful!!!");
    return;
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        onLogoutSuccess={onSuccess}
        clientId={clientid}
        buttonText="Logout"
      />
    </div>
  );
};
export default Logout;
