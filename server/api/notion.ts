import { Client } from "@notionhq/client";

const token = "secret_173p2ob5lmUyLC6niRXG8v19P0as09WlK4tGhdjHwFR";
// https://www.notion.so/985c500513fe43f4aee8c18788843d23?v=c1d162efe1e64feda425dc5f14c82c10
const id = "dbff06adb123450f83e1f0d65fb2a2a7";

export default defineEventHandler(async (event) => {
  const { name } = useQuery(event);

  console.log(name);

  const notion = new Client({
    auth: token,
  });

  const response = await notion.request({
    path: `databases/${id}/query`,
    method: "post",
  });

  console.log(response);

  const page = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: id,
    },
    properties: {
      Approved: { id: "GmiR", type: "checkbox", checkbox: true },
      "Approving Officer": {
        id: "title",
        type: "title",
        title: [
          {
            type: "text",
            text: { content: name, link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            href: null,
          },
        ],
      },
    },
  });

  console.log(page);
});
