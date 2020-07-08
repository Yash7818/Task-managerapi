       const sgMail = require('@sendgrid/mail')
       sgMail.setApiKey(process.env.SENDGRID_API_KEY)

       const sendWelcomeEmail = (email,name) =>{
           sgMail.send({
               to:email,
               from: 'yashwandhare1234@gmail.com',
               subject:'Welcome!!',
               text: `welcome to the app, ${name}. let me know how you get along with the app`,

           })
       }

       const sendGoodbyeEmail = (email,name) =>{
           sgMail.send({
               to:email,
               from:'yashwandhare1234@gmail.com',
               subject:'GoodByee!!',
               text:`GoodBye! ${name}, Is that anything we can do for you.?`
           })
       }

       module.exports = {
           sendWelcomeEmail,
           sendGoodbyeEmail
       }
