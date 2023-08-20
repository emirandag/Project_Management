const Comment = require("../models/comment.model")
const Task = require("../models/task.model")
const User = require("../models/user.model")
const setError = require("../../helpers/handle-error");

/**
 * ----------------------- CREATE COMMENT -----------------------
 */
const createComment = async (req, res, next) => {
    try {
      //console.log(req.user);
      //console.log(req.params);
      console.log(req.body);
      const { _id } = req.user
    //   const { id } = req.params
      const { text, taskId } = req.body
      const foundTask = await Task.findById(taskId)
      const foundUser = await User.findById(_id)


      if (foundTask) {
        try {
          //await 
          //await Task.findByIdAndUpdate(foundTask._id, { $push: { comments: foundTask._id } })
          const newComment = new Comment({
            text,
            task: foundTask._id,
            user: foundUser._id
          })

    
        //Guardamos el comentario en la base de datos
        await newComment.save()

        if (newComment) {
          try {
            await Task.findByIdAndUpdate(foundTask._id, {$push: { comments: newComment._id }})
          } catch (error) {
            return res.status(404).json("Error to update task" || error.message)
          }

          try {
            await User.findByIdAndUpdate(foundUser._id, {$push: { comments: newComment._id }})
          } catch (error) {
            return res.status(404).json("Error to update user" || error.message)
          }
          
          const testComment = await Comment.findById(newComment._id)

          if (testComment) {
            res.status(201).json({
              testComment,
              result: "The comment is created"
            })
          }
        } else {
          return res.status(404).json("Error to create comment")
        }
        
        } catch (error) {
          return res.status(404).json(error.message)
        }
      } else {
        
      }
     
    } catch (error) {
      return next(error)
    }
  }

/**
 * ----------------------- UPDATE COMMENT -----------------------
 */
const updateComment = async (req, res, next) => {
    try {
        await Comment.syncIndexes();

        const { id } = req.params
        const { text } = req.body
        const { _id } = req.user

        const dateNow = Date.now()
        const publishedDate = new Date(dateNow)

        const foundComment = await Comment.findById(id)

        if (!foundComment) {
            return res.status(404).json("The comment not exist")
        } else {
            if (foundComment.user.toString() != _id.toString()) {
                return res.status(404).json("You can't updated this comment")
            } else {
                try {
                    await Comment.findByIdAndUpdate(foundComment._id, { text, publishedDate })

                    const testComment = await Comment.findById(foundComment._id)

                    if (testComment.text == text) {
                        return res.status(200).json({
                            testComment,
                            result: "The comment has been updated"
                        })
                    } else {
                        return res.status(404).json("The comment is not updated")
                    }
                } catch (error) {
                    return res.status(404).json(error.message)
                }
            }
            
        }
        
    } catch (error) {
        return next(setError(error.code || 500, error.message || 'Error general to update comment'));
    }
}

const deleteComment = async (req, res, next) => {
    try {
        await Comment.syncIndexes();

        const { id } = req.params
        //const {_id} = req.user
        

        try {
            const commentToDelete = await Comment.findByIdAndDelete(id)
            const taskId = commentToDelete.task
            const userId = commentToDelete.user

            const foundComment = await Comment.findById(id)

            if (foundComment) {
                res.status(404).json("The comment is not deleted")
            } else {
                try {
                    await Task.findByIdAndUpdate(taskId, { $pull: { comments: id } })
                } catch (error) {
                    return res.status(404).json("Error to delete comment in tasks" || error.message)
                }

                try {
                    await User.findByIdAndUpdate(userId, { $pull: { comments: id } })
                } catch (error) {
                    return res.status(404).json("Error to delete comment in users" || error.message)
                }

                const testTask = await Task.findById(taskId).populate("comments")
                const testUser = await User.findById(userId).populate("comments")

                if (testTask.comments.toString().includes(id.toString()) &&  testUser.comments.toString().includes(id.toString()) ) {
                    res.status(404).json("The comment is not deleted in tasks or users")
                } else {
                    return res.status(200).json({
                        commentToDelete,
                        result: "The comment is deleted"
                    })
                }
                
            }
        } catch (error) {
            return res.status(404).json(error.message)
        }
        
    } catch (error) {
        return next(setError(error.code || 500, error.message || 'Error general to delete comment'));
    }
}


const getCommentsByTask = async (req, res, next) => {
    try {
        await Comment.syncIndexes();

        console.log(req.params);
        const { id } = req.params
        const foundTask = await Task.findById(id).populate("comments")

        if (!foundTask) {
            return res.status(404).json("Task not found")
        } else {
            return res.status(200).json({
                foundTask,
                result: "Task has been found"
            })
        }
    } catch (error) {
        return next(setError(error.code || 500, error.message || 'Error general to list comments in task'));
    }
}

module.exports = { createComment, updateComment, deleteComment, getCommentsByTask }