import { useParams } from "react-router-dom";
import "./AddMember.css"
import { useEffect, useState } from "react";
import { addMemberProject, showProjectById } from "../services/API/project.service";
import { useForm } from "react-hook-form";
import { useAddMemberProjectError, useDeleteMemberProjectError } from "../hooks";
export const AddMember = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({})
  const [send, setSend] = useState(false)
  const [resPage, setResPage] = useState({})
  const [projectId, setProjectId] = useState({})
  const [addMemberOk, setAddMemberOk] = useState(false)
  const [deleteMemberOk, setDeleteMemberOk] = useState(false)
  
  const loadPage = async (id) => {
    const dataProject = await showProjectById(id)
    setResPage(dataProject)
    setProjectId(id)
  }

  const formSubmit = async (formData) => {
    //console.log(projectId);
    setSend(true);
    setRes(await addMemberProject(projectId, formData));
    setSend(false);
  }

  useEffect(() => {
    console.log(res);
    useAddMemberProjectError(res, setRes, setAddMemberOk)
  }, [res])

  useEffect(() => {
    loadPage(id)
  }, [])

  if (addMemberOk || deleteMemberOk) {
    loadPage(id)
  }
  //console.log(res);
  return (
    <>
      <div className="container-addmember">
        <h1>{resPage?.data?.title}</h1>
        <h3>Add Member</h3>
        {/* <button onClick={() => setRender(false)}>X</button> */}
        
        <div className="input-addmember">
        <form onSubmit={handleSubmit(formSubmit)}>
        <input
                className="input_user"
                type="text"
                id="email"
                name="email"
                autoComplete="false"
                placeholder="Enter email member"
                disabled={send}
                {...register("email", { required: true })}
              />
          <button>Add</button>
        
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
                    <button onClick={() => useDeleteMemberProjectError(id, user?.email, setDeleteMemberOk)}>
                      <i className="fa fa-trash fa-2xs"></i>
                    </button> 
                  </div>
                )
            )}
          
        </div>
      </div>
    </>
  );
}
