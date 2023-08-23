import { useNavigate, useParams } from "react-router-dom";
import "./AddMember.css";
import { useEffect, useState } from "react";
import {
  addMemberProject,
  showProjectById,
} from "../services/API/project.service";
import { useForm } from "react-hook-form";
import {
  useAddMemberProjectError,
  useDeleteMemberProjectError,
} from "../hooks";
import { getAllUsers } from "../services/API/user.service";
export const AddMember = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [resUsers, setResUsers] = useState({});

  const [send, setSend] = useState(false);
  const [resPage, setResPage] = useState({});
  const [projectId, setProjectId] = useState({});
  const [addMemberOk, setAddMemberOk] = useState(false);
  const [deleteMemberOk, setDeleteMemberOk] = useState(false);
  const navigate = useNavigate();
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [filterOption, setFilterOption] = useState('all');

  const loadPage = async (id) => {
    const dataProject = await showProjectById(id);
    setResPage(dataProject);
    setProjectId(id);
  };

  const formSubmit = async (formData) => {
    //console.log(projectId);
    setSend(true);
    setRes(await addMemberProject(projectId, formData));
    setSend(false);
  };

  const handleUsers = async () => {
    const dataUsers = await getAllUsers();
    setResUsers(dataUsers);
  };

  const handleSearchUsers = (value) => {
    console.log(value);

    console.log(resUsers?.data?.map((user) => user.email));
    const filtered = resUsers?.data?.filter((user) =>
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    // const valor = filtered.map(user => user.email);
    // console.log(valor);
    setFilteredEmails(filtered);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email)
    console.log(email);
    console.log(selectedEmail);
    setFilteredEmails([])
  }
  

  useEffect(() => {
    // console.log(res);
    useAddMemberProjectError(res, setRes, setAddMemberOk);
  }, [res]);

  useEffect(() => {
    // console.log(id);
    loadPage(id);
    handleUsers();
  }, []);

  useEffect(() => {
    console.log(resUsers);
  }, [ resUsers]);

  if (addMemberOk || deleteMemberOk) {
    loadPage(id);
  }
  //console.log(res);
  return (
    <>
      <div className="container-addmember">
        <h1>{resPage?.data?.title}</h1>
        <h3>Add Member</h3>
        {/* <button onClick={() => setRender(false)}>X</button> */}

        <div className="input-addmember">
          {/* <input type="text"  onChange={e => handleSearchUsers(e.target.value)} />
          <ul>
        {filteredEmails?.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul> */}

      
          <form 
          className="filter-section"
          onSubmit={handleSubmit(formSubmit)}>
            {console.log(selectedEmail)}
            <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              
              autoComplete="off"
              
              list="email-user"
              placeholder="Enter email member"
              disabled={send}
              {...register("email", {
                required: true,
                onChange: (e) => handleSearchUsers(e.target.value),
                value: selectedEmail
              
              })}
            />
            <datalist id="email-user" className="filtered-list">
            {filteredEmails?.map((user, index) => (
                <option key={index} value={user.email} />
              ))}
            </datalist>
            {/* <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            >
              {filteredEmails?.map((user, index) => (
                <option key={index} value={user.email}>{user.email}</option>
              ))}
            </select> */}
            {/* <ul className="filtered-list">
              {filteredEmails?.map((user, index) => (
                <li key={index} onClick={(e) => { 
              
                  handleEmailClick(user.email)}}>{user.email}</li>
              ))}
            </ul> */}
            <button>
              <i className="fa fa-user-plus" aria-hidden="true"></i> Add
            </button>
          </form>
        </div>
        <div className="info-members">
          {resPage?.data?.users?.map(
            (user) =>
              user._id.includes(resPage?.data?.owner) && (
                <div className="members owner" key={user._id}>
                  <input type="text" value={`${user?.email}`} disabled />
                  <label>Project Owner</label>
                </div>
              )
          )}

          {resPage?.data?.users?.map(
            (user) =>
              !user._id.includes(resPage?.data?.owner) && (
                <div className="members member" key={user._id}>
                  <input type="text" value={`${user?.email}`} disabled />
                  <label>Member</label>
                  <button
                    onClick={() =>
                      useDeleteMemberProjectError(
                        id,
                        user?.email,
                        setDeleteMemberOk
                      )
                    }
                  >
                    <i className="fa fa-trash fa-2xs"></i>
                  </button>
                </div>
              )
          )}
        </div>
        <button onClick={() => navigate(`/projects/${id}`)}>
          Go to project
        </button>
      </div>
    </>
  );
};
