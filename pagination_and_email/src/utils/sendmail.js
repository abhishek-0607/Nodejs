const transporter = require("../configs/mail.js")

module.exports = (from,to,subject,text,html)=>{
    const message = {
        from,
        to,
        subject,
        text,
        html
    };
    transporter.sendMail(message);   
}
