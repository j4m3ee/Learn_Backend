const transporter = require('./emailModule')

module.exports = function sendEmailController(req,res){
    transporter.sendMail({
        from: `"TODONA 📝" <${process.env.EMAILUSER}>`, // sender address
        to: req.body.sendTo, // list of receivers
        subject: "Test from express ✔", // Subject line
        text: req.body.message, // plain text body
        html: `<h1>${req.body.message}</h1>`, // html body
      }).then((info)=>{
          return res.status(200).send(info)
      }).catch((err)=>{
          return res.status(401).send(err)
      })
}