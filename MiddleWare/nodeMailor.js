const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')


var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'mayurisoniwork@gmail.com',
            pass: 'jmavovpgbcawdzgq'
        }
    }
);

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// using  a template file 
transporter.use('compile', hbs(handlebarOptions))


var mailOptions = {
    from: '"mayuri" <mayurisoniwork@gmail.com>', 
    to: 'sonidio11@gmail.com',
    subject: 'Welcome!',
     template: 'email', 
    context:{
        name: "mayuri", 
        company: 'My Company' ,
        projectName:"dxc",
        ProjectRequiremnet:"changes"
    },
    attachments: [{ filename: "pic-1.png", path: "./Attachments/marek-piwnicki-IsuVD39rKgM-unsplash.jpeg" }],
    cc: 'sonidio11@gmail.com',
    bcc: 'sonimayuri403@gmail.com'
    //html:'<h1>hello</h1>'
  
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    } 
    console.log('Message sent: ' + info.response);
});
