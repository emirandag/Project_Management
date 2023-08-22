import "./Comments.css"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, deleteComment, getCommentsByTask, updateComment } from "../services/API/comment.service";
import { useAddCommentError, useFormattedDate } from "../hooks";
import { useAuth } from "../context/authContext";


export const Comments = () => {
    const { id } = useParams()
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth()
    const { formattedDate } = useFormattedDate()
    const [res, setRes] = useState({});
    const [resComments, setResComments] = useState({});
    const [send, setSend] = useState(false);
    const [deleteCommentOk, setDeleteCommentOk] = useState(false);
    const [updateCommentOk, setUpdateCommentOk] = useState(false);
    const [editCommentOk, setEditCommentOk] = useState(false);
    const [editCommentId, setEditCommentId] = useState({});
    const [commentText, setCommentText] = useState("");

    const formSubmit = async (formData) => {
        const customFormData = {
            ...formData,
            taskId: id
        }

        setSend(true)
        setRes(await createComment(customFormData))
        setSend(false)
        
    }

    const loadPage = async (id) => {

        const dataComments = await getCommentsByTask(id);
        setResComments(dataComments);
        console.log(res);
      };
    

    const handleDeleteComment = async (id) => {
        setDeleteCommentOk(true)
        await deleteComment(id)
        setDeleteCommentOk(false)
    }

    const handleUpdateComment = async (formData) => {
        setUpdateCommentOk(true)
        await updateComment(editCommentId, formData)
        setEditCommentOk(false)
        setUpdateCommentOk(false)

    }

    useEffect(() => {
        useAddCommentError(res, setRes)
        reset()
    }, [res])

    useEffect(() => {
        loadPage(id);
    }, [res, deleteCommentOk, updateCommentOk])

  return (
    <>
    {!editCommentOk ? (
        <form className="form-comment" onSubmit={handleSubmit(formSubmit)}>
        <textarea
          name="text"
          autoComplete="false"
          placeholder="Write a comment ..."
          defaultValue={commentText} 
          {...register("text", { required: true })}

        />
        {
            resComments?.data?.foundTask?.isCompleted == true ? (
                <button disabled={true}>Add comment</button>
            ) : (
                <button disabled={send}>Add comment</button>
            )
        }
            
            
        
        {/* <button disabled={send}>Add comment</button> */}
      </form>
    ) 
      :
        (
            <form className="form-comment" onSubmit={handleSubmit(formSubmit)}>
        <textarea
          name="text"
          autoComplete="false"
          placeholder="Write a comment ..."
          defaultValue={commentText} 
          {...register("text", { required: true })}

        />
            
            <button disabled={send}>Update comment</button>
        
        {/* <button disabled={send}>Add comment</button> */}
      </form>
        )
    }
      {/* {console.log(res)} */}
      {console.log(resComments)}
      <div className="container-comments">
        {resComments?.data?.foundTask?.comments?.map(comment => (
            <div key={comment._id} className="comment-card">
                <div className="comment-text">
                    {editCommentId == comment._id && editCommentOk ? (
                        <form className="form-comment" onSubmit={handleSubmit(handleUpdateComment)}>
                            <textarea
                                name="text"
                                autoComplete="true"
                                //placeholder={commentText}
                                
                                defaultValue={comment.text} // Use the commentText state
                                
                                {...register("text", { required: true })}
                            />
                        <button disabled={send}>
                            Update comment
                        </button>
                      </form>
                    ) : (
                        <p>{comment.text}</p>
                    )}
                    {/* <p>{comment.text}</p> */}
                </div>
                <div className="comment-info">
                    <p>{comment.user == user._id && user.email}</p>
                    <p>{formattedDate(comment.publishedDate)}</p>
                </div>
                <div className="comment-btn">
                    <div className="divider"></div>
                    <button 
                        disabled={resComments?.data?.foundTask?.isCompleted}
                        className="edit-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            // handleDeleledComment(comment._id)
                            setEditCommentOk(true)
                            setEditCommentId(comment._id)
                            setCommentText(comment.text)
                            console.log(comment.text)
                        }}
                    >
                        <i className="fa fa-pencil-square-o fa-2xs" aria-hidden="true"></i>
                    </button>
                    <button 
                        disabled={resComments?.data?.foundTask?.isCompleted}
                        className="delete-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteComment(comment._id)
                        }}>
                            <i className="fa fa-trash-o fa-1x" aria-hidden="true"></i>
                        </button>
                </div>
            </div>
            
        )) }
        
      </div>
    </>
  );
};
