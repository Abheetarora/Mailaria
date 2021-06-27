const nodeMailer = require('../config/nodemailer');
const Post = require('../models/post');
const post = require('../controllers/posts_controller');
const User = require('../models/user');
const { localsName } = require('ejs');
// this is another way of exporting a method
//console.log("!@#$%^&*(*&^%$#@@#$%^&");

exports.newPost = (post) => {
    console.log(post);
    let htmlString = nodeMailer.renderTemplate({post: post}, '/posts/new_post.ejs');
    let from = `Mailaria <goblinrockss@gmail.com>`
    nodeMailer.transporter.sendMail({
       from: from,
       //to:'abheet200900@gmail.com',
      to:[post.emails],
     
       subject: post.subject,
       recur:post.recur,
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        // console.log('Message sent', info);
        return;
    });
}