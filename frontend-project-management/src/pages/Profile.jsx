import "./Profile.css";
import { useState } from "react";
import { ChangeEmail, ChangePassword, FigureUser, FormProfile } from "../components";
import { useAuth } from "../context/authContext";
import { useDeleteUserError } from "../hooks";

export const Profile = () => {
  const { user, userLogout } = useAuth()
  const [changeRender, setChangeRender] = useState("profile");


  const renderizarComponente = (componente) => {
    setChangeRender(componente);
  };


  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="containerNavProfile">
          <div
            className={`profile-nav ${changeRender == "profile" && "active"}`}
            onClick={() => renderizarComponente("profile")}
          >
            <i className="fa fa-user" aria-hidden="true"></i>
            <p>Profile</p>
          </div>
          <div
            className={`profile-nav ${changeRender == "password" && "active"}`}
            onClick={() => renderizarComponente("password")}
          >
            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
            <p>Password</p>
          </div>
          <div
            className={`profile-nav ${changeRender == "email" && "active"}`}
            onClick={() => renderizarComponente("email")}
          >
            <i className="fa fa-envelope" aria-hidden="true"></i>
            <p>Email</p>
          </div>
        </div>
        <div className="fluidContainerProfile">
          <div className="profile-delete">
            <button onClick={() => useDeleteUserError(userLogout)}>
              <i className="fa fa-user-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="containerProfile">
            <div className="containerDataNoChange">
              <FigureUser user={user} />
            </div>
            
          </div>
          <>
            {changeRender == "profile" && <FormProfile />}
            {changeRender == "password" && <ChangePassword />}
            {changeRender == "email" && <ChangeEmail />}
          </>
        </div>
      </div>
    </div>
  );
};
