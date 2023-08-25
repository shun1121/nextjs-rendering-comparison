import { Client } from "@notionhq/client"

export default async function Page() {
  const list = await getData()
  console.log(list)
  return (
    <div className="pl-[20px] mt-[20px]">
      <h2 className="text-[20px]">SSG</h2>
      <ul className="mt-4">
        {list.map((item, index) => (
          <li key={index} className="mt-3">
            <p className="text-[14px]">Title: <span className="text-[16px] pl-1">{item.title}</span></p>
            <p className="text-[14px]">Content: <span className="text-[16px] pl-1">{item.description}</span></p>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getData() {
  // const notion = new Client({ auth: process.env.NOTION_TOKEN})
  const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  console.log(res)
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  // console.log(res)
  return res.json();

  // const data = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID || '' })
  // const notionList = data.results.map((_: any) => _.properties).map((_) => {
  //   return {
  //     title: _.title.title[0]?.plain_text,
  //     description: _.description.rich_text[0]?.plain_text,
  //   }
  // })
  // return notionList
}


// async function getData() {
//   const NOTION_API_URL = `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`; // YOUR_DATABASE_IDを実際のデータベースIDに置き換える
//   const NOTION_API_TOKEN = process.env.NOTION_TOKEN; // YOUR_NOTION_API_TOKENを実際のトークンに置き換える

//   const response = await fetch(NOTION_API_URL, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${NOTION_API_TOKEN}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       filter: {},
//       // リクエストのボディにクエリを含める
//       // クエリの詳細はNotion APIのドキュメントに従って設定する
//     }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTPエラー! ステータスコード: ${response.status}`);
//   }

//   const data = await response.json();
//   const notionList = data.results.map((entry) => {
//     const properties = entry.properties;
//     return {
//       title: properties.title.title[0]?.plain_text || 'No Title',
//       description: properties.description.rich_text[0]?.plain_text || 'No Description',
//     };
//   });

//   return notionList;
// }
