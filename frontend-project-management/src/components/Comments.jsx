import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createComment } from "../services/API/comment.service";


export const Comments = () => {
    const { id } = useParams()
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({});
    const [send, setSend] = useState(false);
    
  
    const formSubmit = async (formData) => {
        const customFormData = {
            ...formData,
            taskId: id
        }
        //console.log(customFormData);
        setSend(true)
        setRes(await createComment(customFormData))
        setSend(false)
    }

  return (
    <>
      <form className="form-comment" onSubmit={handleSubmit(formSubmit)}>
        <textarea
          name="text"
          autoComplete="false"
          placeholder="Write a comment ..."
          {...register("text", { required: true })}
          // rows="4"
          // cols="66"
        ></textarea>
        <button>Add comment</button>
      </form>
      <div className="container-comments"></div>
    </>
  );
};
