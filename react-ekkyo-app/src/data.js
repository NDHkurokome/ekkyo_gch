let tableData = [
  {
    id: 1,
    summary: "フロントエンド開発",
    skills: "React, JavaScript",
    availability: "締切",
    comments: "業務経験ありの方",
    guest: "2人",
  },
  {
    id: 2,
    summary: "バックエンド開発",
    skills: "Node.js, Express",
    availability: "教える",
    comments: "Node.jsの経験がある方",
    guest: "0人",
  },
  {
    id: 3,
    summary: "データベース管理",
    skills: "MySQL, MongoDB",
    availability: "締切",
    comments: "DBの設計経験がある方",
    guest: "15人",
  },
  {
    id: 4,
    summary: "モバイルアプリ開発",
    skills: "React Native, Swift",
    availability: "締切",
    comments: "IOSアプリ開発経験がある方",
    guest: "1人",
  },
  {
    id: 5,
    summary: "デザイン",
    skills: "Photoshop, Illustrator",
    availability: "締切",
    comments: "Photoshopの使用経験がある方",
    guest: "3人",
  },
  {
    id: 6,
    summary: "プロジェクト管理",
    skills: "Agile, Scrum",
    availability: "教える",
    comments: "PMPの資格を持っている方、またはそれと同等の経験がある方",
    guest: "0人",
  },
  {
    id: 7,
    summary: "クラウドインフラ",
    skills: "AWS, Azure",
    availability: "締切",
    comments: "Cloud資格を持っている方",
    guest: "12人",
  },
  {
    id: 8,
    summary: "セキュリティ",
    skills: "Penetration Testing, Network Security",
    availability: "締切",
    comments: "セキュリティスペシャリストの資格を保持している方",
    guest: "2人",
  },
];
export const addData = (newData) => {
  const newId = tableData.length + 1;
  tableData = [...tableData, { id: newId, ...newData }];
};

export default tableData;
