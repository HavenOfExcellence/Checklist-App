import { Client } from "@notionhq/client";

const token = "secret_173p2ob5lmUyLC6niRXG8v19P0as09WlK4tGhdjHwFR";
// https://www.notion.so/985c500513fe43f4aee8c18788843d23?v=c1d162efe1e64feda425dc5f14c82c10
const id = "dbff06adb123450f83e1f0d65fb2a2a7";
//www.notion.so/dbff06adb123450f83e1f0d65fb2a2a7?v=33febfa20a9d47639b8810b2ff6a4bfc
export const useNotion = async (name: string) => {
  console.log("asdasd");
  const notion = new Client({
    auth: token,
  });

  const response = await notion.request({
    path: `databases/${id}/query`,
    method: "post",
  });

  console.log(response);
  console.log(response.results[1].properties.Name.title);

  const page = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: id,
    },
    properties: {
      Approved: { id: "GmiR", type: "checkbox", checkbox: true },
      Name: {
        id: "title",
        type: "title",
        title: [
          {
            type: "text",
            text: { content: "asda", link: null },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
            plain_text: name,
            href: null,
          },
        ],
      },
    },
  });

  console.log(page);
};
