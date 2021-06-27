const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    emails:{
        type:String,
        required: true
    },
    subject:{
        type:String,
    },
    nyear:{
        type:Number,
    },
    nmonths:{
        type:Number,
    },
    ndays:{
        type:Number,
    },
    nhours:{
        type:Number,
    },
    nminutes:{
        type:Number,
    },
    nseconds:{
        type:Number,
    },
    eqty:{
        type:Number,
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;