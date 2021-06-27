const Post = require('../models/post');
const Comment = require('../models/comment');
const PostMailer = require('../mailers/posts_mailer')
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            emails:req.body.emails,
            subject:req.body.subject,
            nmonths:req.body.nmonths,
            nyear:req.body.nyear,
            ndays:req.body.ndays,
            nhours:req.body.nhours,
            nminutes:req.body.nminutes,
            nseconds:req.body.nseconds,
            eqty:req.body.eqty,
            user: req.user._id
        });
        post = await post.populate('user', 'name email subject recur').execPopulate();
        // console.log("*****************");
        // console.log(post);
        // console.log("*****************");
        // setInterval(()=>{
        //     PostMailer.newPost(post);
        // },post.recur*1000);

        /*  Testing the interval stopping    */ 
        var x =post.eqty;
        var interval = setInterval(function () {

            PostMailer.newPost(post);
         
            if (--x === 0) {
                clearInterval(interval);
            }
         }, (post.nseconds + 60*post.nminutes + 60*60*post.nhours + 60*60*24*post.ndays +60*60*24*30*post.nmonths+60*60*24*365*post.nyear )*1000);
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
        

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Mail Sent!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
          
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}