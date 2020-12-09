import mock from "../mock"

// Contact
let data = {
  contacts: [
    {
      uid: 1,
      displayName: "Admin",
      about:
        "Chat Only",
      photoURL: require("../../assets/img/portrait/small/account.png"),
      status: "online"
    },
    {
      uid: 2,
      displayName: "Aleena",
      about:
        "Available",
      photoURL: require("../../assets/img/portrait/small/avatar-s-2.jpg"),
      status: "do not disturb"
    },
    {
      uid: 3,
      displayName: "Joaquina Weisenborn",
      about:
        "Battery about to die",
      photoURL: require("../../assets/img/portrait/small/avatar-s-3.jpg"),
      status: "do not disturb"
    },
    {
      uid: 4,
      displayName: "Verla Morgano",
      about:
        "Cant talk, chat only",
      photoURL: require("../../assets/img/portrait/small/avatar-s-4.jpg"),
      status: "online"
    },
    {
      uid: 5,
      displayName: "Margot Henschke",
      about:
        "In a meeting",
      photoURL: require("../../assets/img/portrait/small/avatar-s-5.jpg"),
      status: "do not disturb"
    },
    {
      uid: 6,
      displayName: "Sal Piggee",
      about:
        "Urgent calls only",
      photoURL: require("../../assets/img/portrait/small/avatar-s-6.jpg"),
      status: "online"
    },
    {
      uid: 7,
      displayName: "Miguel Guelff",
      about:
        "Cant talk, chat only",
      photoURL: require("../../assets/img/portrait/small/avatar-s-7.jpg"),
      status: "online"
    },
    {
      uid: 8,
      displayName: "Mauro Elenbaas",
      about:
        "Urgent calls only",
      photoURL: require("../../assets/img/portrait/small/avatar-s-8.jpg"),
      status: "away"
    },
    {
      uid: 9,
      displayName: "Bridgett Omohundro",
      about:
        "Work from Home",
      photoURL: require("../../assets/img/portrait/small/avatar-s-9.jpg"),
      status: "offline"
    },
    {
      uid: 10,
      displayName: "Zenia Jacobs",
      about:
        "At Gym",
      photoURL: require("../../assets/img/portrait/small/avatar-s-10.jpg"),
      status: "away"
    }
  ],
  chats: {
    1: {
      isPinned: true,
      msg: [
        {
          textContent: "Hi, Welcome to EX-Alumno",
          time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true
        },
        {
          textContent:
            "Thank You Sir",
          time: "Mon Aug 21 2020 07:45:23 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true
        },
        {
          textContent: "How are you?",
          time: "Mon Aug 21 2020 07:45:55 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true
        },
        {
          textContent: "I am fine, Thank you",
          time: "Mon Aug 21 2020 07:46:00 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true
        },
        {
          textContent:
            "You can explore with your friends here",
          time: "Mon Aug 21 2020 07:46:05 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true
        },
        {
          textContent: "Yeah Sure, Its a gret opportunity for us.",
          time: "Mon Aug 21 2020 07:46:23 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true
        },
        {
          textContent: "What about the next alumni?",
          time: "Mon Aug 21 2020 07:46:33 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true
        },
        {
          textContent: "You can see the details about the event on Event menu",
          time: "Mon Aug 21 2020 07:46:43 GMT+0000 (GMT)",
          isSent: false,
          isSeen: true
        },
        {
          textContent: "Ok, Fine. Thank You Sir 👍",
          time: "Mon Aug 21 2020 07:46:53 GMT+0000 (GMT)",
          isSent: true,
          isSeen: true
        },
        {
          textContent: "You are Welcome 👍.",
          time: "Mon Aug 21 2020 07:47:00 GMT+0000 (GMT)",
          isSent: false,
          isSeen: false
        }
      ]
    },
    // 2: {
    //   isPinned: false,
    //   msg: [
    //     {
    //       textContent: "Hi",
    //       time: "Mon Aug 21 2020 07:45:00 GMT+0000 (GMT)",
    //       isSent: true,
    //       isSeen: true
    //     },
    //     {
    //       textContent: "Hello. How can I help You?",
    //       time: "Mon Aug 22 2020 07:45:15 GMT+0000 (GMT)",
    //       isSent: false,
    //       isSeen: true
    //     },
    //     {
    //       textContent:
    //         "Can I get details of my last transaction I made last month?",
    //       time: "Mon Aug 22 2020 07:46:10 GMT+0000 (GMT)",
    //       isSent: true,
    //       isSeen: true
    //     },
    //     {
    //       textContent:
    //         "We need to check if we can provide you such information.",
    //       time: "Mon Aug 22 2020 07:45:15 GMT+0000 (GMT)",
    //       isSent: false,
    //       isSeen: true
    //     },
    //     {
    //       textContent: "I will inform you as I get update on this.",
    //       time: "Mon Aug 22 2020 07:46:15 GMT+0000 (GMT)",
    //       isSent: false,
    //       isSeen: true
    //     },
    //     {
    //       textContent: "If it takes long you can mail me at my mail address",
    //       time: "Mon Aug 22 2020 07:46:20 GMT+0000 (GMT)",
    //       isSent: true,
    //       isSeen: false
    //     }
    //   ]
    // }
  }
}

// GET : CHATS AND CONTACTS
mock.onGet("/api/app/chat/chats").reply(() => {
  return [200, data]
})

// GET : CHAT LIST
mock.onGet("/api/app/chat/chat-contacts").reply(request => {
  const chatContactsArray = data.contacts.filter(contact => {
    if (data.chats[contact.uid]) return data.chats[contact.uid]
    else return null
  })

  return [200, chatContactsArray]
})

// POST : SEND MESSAGE
mock.onPost("api/app/chat/send-message").reply(request => {
  let reqdata = JSON.parse(request.data)
  const { contactId, message, isPinned } = reqdata
  if (data.chats[contactId]) {
    data.chats[contactId].msg.push(message)
  } else {
    let newMsg = {
      [contactId]: {
        isPinned: isPinned,
        msg: [message]
      }
    }
    Object.assign(data.chats, newMsg)
  }
  return [200]
})
mock.onPost("/api/apps/chat/mark-all-seen/").reply(request => {
  let contactId = JSON.parse(request.data).contactId

  // Get chat data
  let marked = data.chats[contactId]

  marked !== undefined &&
    marked.msg.forEach(msg => {
      msg.isSeen = true
    })

  return [200]
})
// POST : TOGGLE PINNED
mock.onPost("/api/apps/chat/set-pinned/").reply(request => {
  let { contactId, value } = JSON.parse(request.data)
  data.chats[contactId].isPinned = data.chats[contactId].isPinned = value
  return [200]
})
