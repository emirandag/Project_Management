const mongoose = require("mongoose")

const { Schema } = mongoose

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isCompleted: { type: Boolean, default: false },
        createdDate: { type: Date, default: Date.now },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    {
        timestamps: true
    }
)

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task