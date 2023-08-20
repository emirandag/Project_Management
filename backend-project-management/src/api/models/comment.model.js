const mongoose = require("mongoose")
const { Schema } = mongoose

const localDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTimestamp = now.getTime() - (offset * 60000) + 60; 
    return new Date(localTimestamp);
}

const CommentSchema = new Schema(
    {
        text: { type: String, required: true }, 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
        publishedDate: { type: Date, default: Date.now},
    },
    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment