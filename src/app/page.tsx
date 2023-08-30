import { Client } from "@notionhq/client"

export default async function Page() {
  const list = await getData()
  console.log(list)
  return (
    <div className="pl-[20px] mt-[60px] w-full max-w-[800px] mx-auto">
      <h2 className="text-[28px] font-bold text-center mb-[32px]">Notion Database 日記</h2>
      <ul className="mt-4 border p-[24px] rounded-md">
        {list.map((item, index) => (
          <li key={index} className="mb-[20px] border rounded-md p-[24px] bg-gray-900">
            <div className="text-[16px] mb-[8px]"><span>Title:</span><p className="text-[20px] pt-1">{item.title}</p></div>
            <div className="text-[16px]"><span>Content:</span><p className="text-[20px] pt-1">{item.description}</p></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getData() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN})
  const data = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID || '' })
  const notionList = data.results.map((_: any) => _.properties).map((_) => {
    return {
      title: _.title.title[0]?.plain_text,
      description: _.description.rich_text[0]?.plain_text,
    }
  })
  return notionList
}
