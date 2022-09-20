const spreadsheetID = "1XeZxdwWQVwSsp20qUcP-JkpfhJrPPS6is7DH0yy3pHg";
import { google } from "googleapis";
const mapping = {
  "1": "Sheet1",
  "2": "Sheet2",
};

export default defineEventHandler(async (event) => {
  const { name, checklist } = useQuery(event);

  const date = new Date();
  const datestring = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  console.log({ name, checklist });

  const auth = new google.auth.GoogleAuth({
    keyFile: "secret.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = await google.sheets({ version: "v4", auth: client });

  const rows = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId: spreadsheetID,
    range: `${mapping[checklist.toString()]}!A2:Z10000`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, datestring, "Approved", "NIL"]],
    },
  });

  console.log("asdasd");

  return "asdasd";
});
