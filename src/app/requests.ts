const lastRead = [0, 0, 0, 0];
const lastChecked = [3, 6, 7, 0];
let parrotTyping = false;

const notify = [
  ['Chào mừng bạn gia nhập'],
  ['Những thông báo sẽ hiện ở đây']
];

const testConversations = [
  [
    {
      id: 0,
      type: 'text',
      author: 'You',
      content: 'Hello',
      subcontent: 'Seen',
      time: (new Date(Date.now() - 60000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 1,
      type: 'text',
      author: '',
      content: 'Hi',
      subcontent: 'Seen',
      time: (new Date(Date.now() - 30000)).toLocaleString(),
      align: 'right'
    },
    {
      id: 2,
      type: 'text',
      author: 'You',
      content: 'This is a conversation',
      subcontent: 'Seen',
      time: (new Date(Date.now() - 10000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 3,
      type: 'text',
      author: '',
      content: 'You are no1',
      subcontent: 'Delivered',
      time: (new Date(Date.now() - 5000)).toLocaleString(),
      align: 'right'
    }
  ],
  [
    {
      id: 0,
      type: 'text',
      author: 'Obama',
      content: 'Hello? Is anyone there?',
      subcontent: 'Seen by everyone',
      time: (new Date(Date.now() - 3600000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 1,
      type: 'text',
      author: 'Putin',
      content: 'Hello?!?',
      subcontent: 'Seen by everyone',
      time: (new Date(Date.now() - 600000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 2,
      type: 'text',
      author: '',
      content: 'Hey I\'m here',
      subcontent: 'Seen by everyone',
      time: (new Date(Date.now() - 60000)).toLocaleString(),
      align: 'right'
    },
    {
      id: 3,
      type: 'text',
      author: 'Nguyễn Phú Trọng',
      content: 'Các khanh bình thân',
      subcontent: 'Seen by everyone except Friend 1',
      time: (new Date(Date.now() - 30000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 4,
      type: 'text',
      author: 'Friend 3',
      content: 'Yes I am here!!!',
      subcontent: 'Seen by everyone except Friend 1',
      time: (new Date(Date.now() - 10000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 5,
      type: 'text',
      author: 'Friend 3',
      content: 'Hi hi hi',
      subcontent: 'Seen by everyone except Friend 1',
      time: (new Date(Date.now() - 9000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 6,
      type: 'text',
      author: '',
      content: 'Fine in this UI! 👍',
      subcontent: 'Seen by Friend 3',
      time: (new Date(Date.now() - 5000)).toLocaleString(),
      align: 'right'
    }
  ],
  [
    {
      id: 0,
      type: 'text',
      author: 'Obama',
      content: 'Hello? Is anyone there?',
      subcontent: 'Seen by everyone',
      time: (new Date(Date.now() - 3600000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 1,
      type: 'text',
      author: 'Putin',
      content: 'Hello?!?',
      subcontent: 'Seen by everyone',
      time: (new Date(Date.now() - 600000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 2,
      type: 'text',
      author: '',
      content: 'Hey I\'m here',
      subcontent: 'Seen by everyone',
      time: (new Date(Date.now() - 60000)).toLocaleString(),
      align: 'right'
    },
    {
      id: 3,
      type: 'text',
      author: 'Nguyễn Phú Trọng',
      content: 'Các khanh bình thân',
      subcontent: 'Seen by everyone except Friend 1',
      time: (new Date(Date.now() - 30000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 4,
      type: 'text',
      author: 'Friend 3',
      content: 'Yes I am here!!!',
      subcontent: 'Seen by everyone except Friend 1',
      time: (new Date(Date.now() - 10000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 5,
      type: 'text',
      author: 'Friend 3',
      content: '😃😃😃',
      subcontent: 'Seen by everyone except Friend 1',
      time: (new Date(Date.now() - 9000)).toLocaleString(),
      align: 'left'
    },
    {
      id: 6,
      type: 'text',
      author: '',
      content: 'Fine in this UI! 👍',
      subcontent: 'Seen by Friend 3',
      time: (new Date(Date.now() - 5000)).toLocaleString(),
      align: 'right'
    }
  ],

  [
    {
      id: 0,
      type: 'text',
      author: 'Bot',
      content: 'Say anything, i will reply quick.',
      subcontent: 'Seen',
      time: (new Date()).toLocaleString(),
      align: 'left'
    }
  ]
];

const convos = [
  {
    id: 0,
    title: 'Friend',
    member: [{name: 'Friend', nick: 'Friend'}],
    subtitle: (testConversations[0][testConversations[0].length - 1].author ? '' : 'You: ') + testConversations[0][testConversations[0].length - 1].content,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
    emphasis: (lastRead[0] < testConversations[0].length - 1 ? 'Unread' : null)
  },
  {
    id: 1,
    title: 'Group Chat',
    member: [{name: 'Obama', nick: 'Obama'}, {name: 'Putin', nick: 'Putin'}],
    subtitle: (testConversations[1][testConversations[1].length - 1].author ? testConversations[1][testConversations[1].length - 1].author : 'You') + ': ' + testConversations[1][testConversations[1].length - 1].content,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
    emphasis: (lastRead[1] < testConversations[1].length - 1 ? 'New!' : null)
  },
  {
    id: 2,
    title: 'Group Chat',
    member: [{name: 'Obama', nick: 'Obama'}, {name: 'Bush', nick: 'Bush'}],
    subtitle: (testConversations[2][testConversations[2].length - 1].author ? '' : 'You: ') + testConversations[2][testConversations[2].length - 1].content,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
    emphasis: (lastRead[2] < testConversations[2].length - 1 ? 'Your text here' : null)
  },
  {
    id: 3,
    title: ' Bot',
    member: [{name: 'Bot', nick: 'Bot'}],
    subtitle: (parrotTyping ? 'Bot is typing...' : (testConversations[3][testConversations[3].length - 1].author ? '' : 'You: ') + testConversations[3][testConversations[3].length - 1].content),
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
    emphasis: (lastRead[3] < testConversations[3].length - 1 ? 'New Message' : null)
  },
  {
    id: 4,
    title: 'Test Conversation',
    member: [{name: 'Test', nick: 'Test'}],
    subtitle: (new Date()).toLocaleString(),
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
    emphasis: 'This convo is special'
  },
  {
    id: 5,
    title: 'Billgate',
    member: [{name: 'Friend', nick: 'Friend'}],
    subtitle: (testConversations[0][testConversations[0].length - 1].author ? '' : 'You: ') + testConversations[0][testConversations[0].length - 1].content,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/250px-Angular_full_color_logo.svg.png',
    emphasis: (lastRead[0] < testConversations[0].length - 1 ? 'Unread' : null)
  }
];

function getTestConvos() {
  if (convos) {
    return convos;
  }
  // convos.push.apply(convos, convos);
  return convos;
}

export namespace Requests {

  export function onConvoSelect(convo: any): void {

    if (convo.id !== 4) {
      convo.emphasis = null;
    }
  }

  export function getHeader(conversationId: any): any {
    if (conversationId === null) {
      return {
        icon: 'message',
        title: 'AngularChat',
        subtitle: '',
        options: []
      };
    } else if (conversationId === 4) {
      return {
        icon: 'tag_faces',
        title: 'Infinite scrolling',
        subtitle: '',
        options: [
          ['Details', () => alert('Details')]
        ]
      };
    } else {
      return {
        icon: '',
        title: getTestConvos()[conversationId].title,
        subtitle: '',
        options: [
          ['Details', () => alert('Details')]
        ]
      };
    }
  }

  export function getPlaceholderText(conversationId: any): string {

    if (conversationId === 3 && parrotTyping) {
      return 'Bot is typing...';
    } else {
      return 'Say something...';
    }
  }

  export function getUserId(): any {

    return 'me';
  }

  export function getConvos(callback, userId, pageNum): void {

    callback(getTestConvos());
  }

  export function searchConvos(callback, userId, searchTerm, pageNum): void {

    const res = [];

    for (const convo of getTestConvos()) {
      if (convo.title.toLowerCase().includes(searchTerm.toLowerCase()) || convo.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) {
        res.push(convo);
        continue;
      }

      let added = false;
      for (const i in testConversations[convo.id]) {
        const message = testConversations[convo.id][i];
        if (message.content.toLowerCase().includes(searchTerm.toLowerCase()) || message.author.toLowerCase().includes(searchTerm.toLowerCase())) {
          res.push(convo);
          added = true;
          break;
        }
      }
      if (added) {
        continue;
      }
    }

    callback(res);
  }

  export function getConversation(callback, userId, conversationId, pageNum): void {

    let arr = [];
    if (conversationId === 4) {
      for (let i = 50; i >= 1; i--) {
        arr.push({
          id: (50 * pageNum) + i,
          type: 'text',
          author: '',
          content: 'This is Message ' + ((50 * pageNum) + i),
          subcontent: 'Message ' + ((50 * pageNum) + i),
          time: ((50 * pageNum) + i) + ' days ago',
          align: 'right'
        });
      }
    } else if (pageNum === 0) {
      lastRead[conversationId] = testConversations[conversationId].length - 1;
      arr = $.extend(true, [], testConversations[conversationId]);
    }

    callback(arr);
  }

  export function sendMessage(message: string, conversationId: any): boolean {
    if (conversationId !== 4) {
      testConversations[conversationId].push({
        id: testConversations[conversationId].length,
        type: 'text',
        author: '',
        content: message,
        subcontent: 'Delivered',
        time: (new Date()).toLocaleString(),
        align: 'right'
      });
      if (conversationId === 3) {
        setTimeout(() => {
          testConversations[3][testConversations[3].length - 1].subcontent = 'Seen';
          lastChecked[3] = 0;
        }, 2000);
        setTimeout(() => {
          parrotTyping = true;
          lastChecked[3] = 0;
        }, 4000);
        setTimeout(() => {
          testConversations[3].push({
            id: testConversations[3].length,
            type: 'text',
            author: '💬 Bot',
            content: 'You just said: \'' + message + '\'',
            subcontent: 'Seen',
            time: (new Date()).toLocaleString(),
            align: 'left'
          });
          parrotTyping = false;
        }, 6000);
      }
    } else {
      return false;
    }

    return true;
  }

  export function getNotify() {
    return notify;
  }

  export function pushNotify(message){
    notify.push(message);
  }

  export function sendMessageFake(message: string, conversationId: any, name: string): boolean {
    testConversations[conversationId].push({
      id: testConversations[conversationId].length,
      type: 'text',
      author: name,
      content: message,
      subcontent: 'Delivered',
      time: (new Date()).toLocaleString(),
      align: 'left'
    });

    return true;
  }

  export function shouldUpdate(userId: any): boolean {
    // Return true if the UI needs to be updated with new information (ie. messages)

    for (const i in testConversations) {
      if (lastChecked[i] < testConversations[i].length - 1) {
        lastChecked[i] = testConversations[i].length - 1;
        return true;
      }
    }

    return false;
  }

}
