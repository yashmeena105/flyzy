import { Badge, Dropdown, Space } from "antd";

export const leadData = {
  _id: "739hijncdiun9",
  requirements: [
    {
      requirement: "FULL PACKAGE",
    },
    {
      requirement: "VISA",
    },
    {
      requirement: "FLIGHT",
    },
    {
      requirement: "STAY",
    },
    {
      requirement: "ACTIVITY",
    },
    {
      requirement: "TRANSPORT",
    },
  ],
};

export const tasksData = [
  {
    id: "7882yhiuhj",
    name: "Call the client",
    due_date: new Date(),
    assignees: [
      {
        user_id: "njkn78398209j",
        email: "hansraj@flyzygo.com",
        image_url: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
        name: "Hansraj Patel",
      },
      {
        user_id: "898090hijdkd",
        email: "rahul@flyzygo.com",
        image_url: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
        name: "Rahul Nagarwal",
      },
    ],
  },
  {
    id: "njnkjnkoi9iu09",
    name: "Get Payment",
    due_date: new Date(),
    assignees: [
      {
        user_id: "njkn78398209j",
        email: "hansraj@flyzygo.com",
        image_url: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
        name: "Hansraj Patel",
      },
      {
        user_id: "898090hijdkd",
        email: "rahul@flyzygo.com",
        image_url: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
        name: "Rahul Nagarwal",
      },
      {
        user_id: "njkn78398209j",
        email: "hansraj@flyzygo.com",
        image_url: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
        name: "Hansraj Patel",
      },
    ],
  },
];

export const notesData = [
  {
    id: "bjsh889u9",
    text: "Faltu lead hai.",
    posted_by: {
      user_id: "njkn78398209j",
      email: "hansraj@flyzygo.com",
      image_url: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
      name: "Hansraj Patel",
    },
    posted_at: new Date(),
  }
]

export const pricingColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Upgraded',
    dataIndex: 'upgradeNum',
    key: 'upgradeNum',
  },
  {
    title: 'Creator',
    dataIndex: 'creator',
    key: 'creator',
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Action',
    key: 'operation',
    render: () => <a>Publish</a>,
  },
];

export const pricingData = () => {
  let data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }
  return data;
}

