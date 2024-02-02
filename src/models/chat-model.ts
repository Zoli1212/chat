import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({

    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages'
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        required: false,
        default: ' '
    },
    groupProfilePicture: {
        type: String,
        default: ''

    },
    groupBio: {
        type: String,
        default: ''
    }, admins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'users'
    }


}, { timestamps: true })

if(mongoose.models && mongoose.models['chat']){
    mongoose.deleteModel('chats')
}

const ChatModel = mongoose.model('chats', chatSchema)

export default ChatModel