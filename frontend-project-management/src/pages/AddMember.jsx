import "./AddMember.css"
export const AddMember = () => {


  return (
    <>
      <div className="container-addmember">
        <h1>Project title</h1>
        <h3>Add Member</h3>
        {/* <button onClick={() => setRender(false)}>X</button> */}
        <div className="input-addmember">
            <input type="text" placeholder="Enter email member" />
            <button>Add</button>
        </div>
        <div className="info-members">
            <div className="members owner" >
                <input type="text" value="" />
                <label>Project Owner</label>
            </div>
            <div className="members member" >
                <input type="text" value="" />
                <label>Member</label>
                <button>Delete</button>
            </div> </div>
      </div>
    </>
  );
}
