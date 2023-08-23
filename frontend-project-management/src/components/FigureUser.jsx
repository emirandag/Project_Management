import "./FigureUser.css"

export const FigureUser = (user) => {
  console.log(user);
    return (
      <figure className="dataProfile">
        <img src={user.user.photo} alt="user image" className="imageUser" />
        <h3 className="nameUser">{user.user.user}</h3>
        <h4 className="emailUser">{user.user.email}</h4>
      </figure>
    );
  };