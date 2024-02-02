import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chats'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    
    },
    text: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    readBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    },
    unreadCounts: {
        type: Number,
        default: {
            
        }
    }

}, { timestamps: true })

if(mongoose.models && mongoose.models['messages']){
    mongoose.deleteModel('messages')
}

const MessageModel = mongoose.model('messages', messageSchema)
export default MessageModel