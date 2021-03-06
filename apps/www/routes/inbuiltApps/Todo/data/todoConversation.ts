export interface TodoConversation {
  id: string;
  conversationData: TodoComment[];
}

export interface TodoComment {
  name: string;
  thumb: string;
  message: string;
  sentAt: Date;
}

const conversations: TodoConversation[] = [
  {
    id: "561551bd7fe2ff461101c192",
    conversationData: [
      {
        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
        sentAt: new Date("Nov 22, 2017, 3:11:25 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      }, {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      }, {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  },
  {
    id: "561551bd4ac1e7eb77a3a750",
    conversationData: [
      {

        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:03:28 PM"),
      },
      {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:05:47 PM"),
      },
      {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
        sentAt: new Date("Nov 22, 2017, 3:07:52 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      },
    ]
  },
  {
    id: "561551bdeeb2fd6877e18c29",
    conversationData: [
      {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      }, {

        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
        sentAt: new Date("Nov 22, 2017, 3:11:25 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      },
    ]
  },
  {
    id: "561551bdf38eae0134ae43d4",
    conversationData: [
      {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:03:28 PM"),
      },
      {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:05:47 PM"),
      },
      {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
        sentAt: new Date("Nov 22, 2017, 3:11:25 PM"),
      }, {

        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  }, {
    id: "561551bd32f1588c814a0ccd",
    conversationData: [
      {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
        sentAt: new Date("Nov 22, 2017, 3:07:52 PM"),
      }, {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      }, {

        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
        sentAt: new Date("Nov 22, 2017, 3:11:25 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  },
  {
    id: "561551bd0bb4b08ca77038ef",
    conversationData: [
      {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {
        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      }, {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
        sentAt: new Date("Nov 22, 2017, 3:11:25 PM"),
      }, {
        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  }, {
    id: "561551bdf84eec913835ebe5",
    conversationData: [

      {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:05:47 PM"),
      },
      {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
        sentAt: new Date("Nov 22, 2017, 3:07:52 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      },
    ]
  },
  {
    id: "561551bd2047cc709af0f670",
    conversationData: [
      {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:03:28 PM"),
      },
      {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
        sentAt: new Date("Nov 22, 2017, 3:07:52 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      }, {

        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  },
  {
    id: "561551bd8f7d793ded0a2353",
    conversationData: [

      {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:05:47 PM"),
      },
      {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
        sentAt: new Date("Nov 22, 2017, 3:07:52 PM"),
      },
      {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      },
      {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      },
      {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      },
      {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      },
      {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  },
  {
    id: "561551bdaa586f72d0be02cc",
    conversationData: [
      {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:03:28 PM"),
      }, {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "English versions from the 1914 translation by H. Rackham",
        sentAt: new Date("Nov 22, 2017, 3:05:47 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
        sentAt: new Date("Nov 22, 2017, 3:07:52 PM"),
      }, {

        name: "Kadir",
        thumb: "/images/avatar/stella-johnson.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:08:35 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "I must explain to you how all this mistaken idea of denouncing ",
        sentAt: new Date("Nov 22, 2017, 3:10:28 PM"),
      }, {

        name: "John Smith",
        thumb: "/images/avatar/john-smith.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested",
        sentAt: new Date("Nov 22, 2017, 3:11:25 PM"),
      }, {

        name: "Domnic Brown",
        thumb: "/images/avatar/domnic-brown.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Alex Dolgove",
        thumb: "/images/avatar/stella-johnson.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      }, {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "It is a long established fact",
        sentAt: new Date("Nov 22, 2017, 3:13:28 PM"),
      }, {

        name: "Jimmy Jo",
        thumb: "/images/avatar/jimmy-jo.png",
        message: "The standard chunk of Lorem Ipsum used since the 1500s",
        sentAt: new Date("Nov 22, 2017, 3:15:45 PM"),
      }
    ]
  },
  {
    id: "561551bd9f1c2de5b27f537b",
    conversationData: [
      {

        name: "Stella Johnson",
        thumb: "/images/avatar/stella-johnson.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:12:36 PM"),
      }, {

        name: "Jeson Born",
        thumb: "/images/avatar/jeson-born.png",
        message: "All the Lorem Ipsum generators on the",
        sentAt: new Date("Nov 22, 2017, 3:12:45 PM"),
      }, {

        name: "Steve Smith",
        thumb: "/images/avatar/steve-smith.png",
        message: "There are many variations of passages of ",
        sentAt: new Date("Nov 22, 2017, 3:13:04 PM"),
      },
    ]
  }

];

export default conversations;
