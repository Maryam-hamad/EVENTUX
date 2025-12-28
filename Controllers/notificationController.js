const Mail = require("../Models/mailModel")
const transporter = require("../Utils/transporter")
const dotenv = require('dotenv')
const Notification = require("../Models/notificationModel")

const createMail = async (req ,res) => {
    const {to ,subject ,text , html} = req.body
    await transporter.sendMail(Mail)

   return res.status(201).json({
        from: `"Eventux" <${process.env.USER_MAIL}>`,
        to,
        subject,
        text,
        html,
   })

}




// Create a notification
const createNotification = async ({ userId, type, title, message, link }) => {
  const notification = await Notification.create({
    userId,
    type,
    title,
    message,
    link,
  });

  return  res.status(201).json({
    title:notification.title,
    message:notification.message,
    link:notification.link,
  })
};

//GET request <--user display all notification -->

const getNotifications = async (req,res) => {
    const user = req.user.id
    const notifications = await Notification.find(user)
   return res.status(200).json(notifications)
}

module.exports ={ createMail , createNotification , getNotifications}

