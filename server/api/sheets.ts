const spreadsheetID = "1XeZxdwWQVwSsp20qUcP-JkpfhJrPPS6is7DH0yy3pHg";
import { google } from "googleapis";
const mapping = {
  "1": "Sheet1",
  "2": "Sheet2",
};

const credentials = {
  type: "service_account",
  project_id: "checklist-363106",
  private_key_id: "9fec085fdd8963cbb22c5238354f7600632402c5",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCkI18+7u4NlUY/\ncOI+MD9eY1SjTIto62FzJbxA6p+oScogn4EsXXeYaHb16REg/x0ZSY+wSe+AwdI0\nYBrTutVpYBvBnLKSbmb99gpsbFbALBZYBtulzEFBDGBo6i31z4z5OXb8yDELDuax\n4ZHwz8Ki0X0/qvBXSsyQ9PUvpa/4md+DL5A23PX34+CxD+xqoTjBSIgFOqe28Ded\nlIGnN5LIVVvMQ9DSrZddmTm1dpMESRfEa3cC9+a6n3k9iFoyKUWgy0DOSLnrBYR8\nEdYjELhD4cxeqPnUqGXUqYZqWROVRwpNj/NwDpuJR2RIsJsHr8H4VdmvF3Ltmd9V\nNu6GwOdhAgMBAAECggEAB9GUMr7AlzliSxkDpfENa7Ub7drHv0aLHKg9A0ifNK3Y\nfjJVkw6cE6X87geH+dmSghxcxwnWlKcRmM4afmB61FYFgcpcP+5uDds/sYd9oGeD\n5Es7VkwDBb1jBaG2G8H4a1IfRrj7NmrOIXC8eiCjcGG973T4lZKUvl5KJFa7qayz\nMNckgoTGed0t05vRGctUjygfc1pDc1UY74nThdYoq1FgovwmoASE9S5APXJAUoB/\nEkP3KZuKws+n1NbJyQUr0v3WjNL4nU4wJZCURz+3lelYwsltiP9odKl/tGWPFtPB\nnr00mOJV10Axqt7q1jN9J/pzPgIOfDec8nprO+s+mQKBgQDZw1v07Wk95/gbKVjO\nUlaJ/yNyECEM5FiliO26IrQAv2sCnfkP4UCSHTYob1bE0mHr0a7q+ehnis+wqFAI\nmfEOL1+YikuToSWrK3okXn7CBdXyV/+FnvNGQIYRn5AgfmOd1ZCkn+Hzg12R8kz8\nebZSA14IUep+v70HT5kWwGvzLQKBgQDA9YZiuAmDAii5q7dxKyh416ffNW10lnBZ\n5bzmydipb1jdbA7JZySkITjspLOtDv+MREWbgCq7jZbLGRy26VaAjJPc23Xj92U+\nmGGj0GgEZ5me8gzNN3Kp5gI3Auh7HVMaQtGlQ7HrlirpVYHqiM8NrctXJEutntBa\nKsLkD6h1hQKBgQCGK1ruBpTwQotYWNpRjOOq9JsnPQ7P/aUsoLgwFg+n4kiRfTmm\nchexrvPeZ/MjI6iXfkLynfV2Tk12v81H72lZXxDcUGEOXZxy4T/JRrt82dGfFl7m\nOjATmc/A7foEOzsvVRVgiO3Tdp3hPVP3vxn5X//Ayo/bdlGGPqHJJdedJQKBgCNV\nkptHOi6sWYrOgBQQJCQk0Y/VN8rutXow0KuucKduRWaeoAKPia0ojEUBUAmzwmYM\nJnb4PFsF7YQZgCGajwWROI5r/aWWKwsQWmjmA/YyhnYNuvxlV/D2tpceSDYrQ4l+\njOdngxAx+n+p8dVh4hCOL7swYU9U0rCAPhoHKAEFAoGBAMl1ecyNalxYrEOfuyWK\n0VkNn49UKxwzCDdhwGHiYPHR2uNzZuvf8Alb/6cP4yLQMlLVxUEEidRhOVE8QVVj\nzPhFOfs04Qg7lp4kcoMGoNXxrtisRUMMNL+OTNPTlSjv5qv05VTy9y2wTjExyu82\nOyMwBaKgXAf8CQB6UjLqcQBx\n-----END PRIVATE KEY-----\n",
  client_email: "checklistapp@checklist-363106.iam.gserviceaccount.com",
  client_id: "107269288488963345971",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/checklistapp%40checklist-363106.iam.gserviceaccount.com",
};

export default defineEventHandler(async (event) => {
  const { name, checklist, remarks, node } = useQuery(event);

  const date = new Date();
  const datestring = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  console.log({ name, checklist });

  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
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
      values: [[name, datestring, "Approved", remarks, node]],
    },
  });

  console.log("asdasd");

  return "asdasd";
});
