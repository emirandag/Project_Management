import { useNavigate, useParams } from "react-router-dom";
import "./AddMember.css";
import { useEffect, useState } from "react";
import {
  addMemberProject,
  showProjectById,
} from "../services/API/project.service";
import { useForm, Controller } from "react-hook-form";
import {
  useAddMemberProjectError,
  useDeleteMemberProjectError,
} from "../hooks";
import { getAllUsers } from "../services/API/user.service";
import Select from "react-select";
import { colorPalette } from "../utils/colorPalette";

export const AddMember = () => {
  const { id } = useParams();
  const { register, handleSubmit, control, reset } = useForm();
  const [res, setRes] = useState({});
  const [resUsers, setResUsers] = useState({});

  const [send, setSend] = useState(false);
  const [resPage, setResPage] = useState({});
  const [projectId, setProjectId] = useState({});
  const [addMemberOk, setAddMemberOk] = useState(false);
  const [deleteMemberOk, setDeleteMemberOk] = useState(false);
  const navigate = useNavigate();
  const color = colorPalette();

  const loadPage = async (id) => {
    const dataProject = await showProjectById(id);
    setResPage(dataProject);
    setProjectId(id);
  };

  const formSubmit = async (formData) => {
    console.log();
    const customFormData = formData.email.value;
    setSend(true);
    setRes(await addMemberProject(projectId, formData));
    setSend(false);
  };

  const handleUsers = async () => {
    const dataUsers = await getAllUsers();
    setResUsers(dataUsers);
  };

  useEffect(() => {
    useAddMemberProjectError(res, setRes, setAddMemberOk);
  }, [res]);

  useEffect(() => {
    loadPage(id);
    handleUsers();
    reset(); //Cada vez que se renderice al agregar un miembro se borre el valor del input(Select)
  }, [addMemberOk, deleteMemberOk]);

  return (
    <>
      <div
        className="container-addmember"
        style={{
          backgroundColor: `${
            res?.data?.isClosed
              ? color.colorProject.colorClosed
              : color.colorProject.colorOpen
          }`,
          boxShadow: `1px 2px 5px ${
            res?.data?.isClosed
              ? color.colorTask.colorClosed
              : color.colorTask.colorOpen
          }`,
        }}
      >
        <h1>{resPage?.data?.title}</h1>
        <h3>Add Member</h3>

        <div className="input-addmember">
          <form className="filter-section" onSubmit={handleSubmit(formSubmit)}>
            {/* <input
              className="input_user"
              type="text"
              id="email"
              name="email"
              
              autoComplete="false"
              
              list="email-user"
              placeholder="Enter email member"
              disabled={send}
              {...register("email", {
                required: true
              
              })}
            /> */}
            <Controller
              name="email"
              render={({ field }) => (
                <Select
                  placeholder="Write a email ..."
                  className="select-user"
                  {...field}
                  options={resUsers?.data?.map((user) => ({
                    value: user.email,
                    label: user.email,
                  }))}
                  filterOption={(option, inputValue) => {
                    if (!inputValue) {
                      return false; // No mostrar los correos cuando hay valor
                    }
                    return option.label
                      .toLowerCase()
                      .includes(inputValue.toLowerCase());
                  }}
                  onInputChange={(inputValue) => {
                    return inputValue; // Mantener el valor de entrada para que REACT SELECT se encargue de manejarlo
                  }}
                />
              )}
              control={control}
              defaultValue=""
            />
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
