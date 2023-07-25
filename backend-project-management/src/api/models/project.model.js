const mongoose = require("mongoose")
const { Schema } = mongoose

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }, 
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
        createdDate: { type: Date, default: Date.now},
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isClosed: { type: Boolean, default: false, required: true }
    },
    {
        timestamps: true
    }
)

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project