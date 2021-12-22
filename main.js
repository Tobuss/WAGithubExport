import axios from "axios";
import fs from "fs";

const instance = axios.create({
  baseURL: "https://www.worldanvil.com/api/aragorn",
  headers: {
    "x-auth-token": process.env.WA_AUTH_TOKEN,
    "x-application-key": process.env.WA_APP_KEY,
    "Content-Type": "application/json",
    "User-Agent": "WAGithubExport ( https://github.com/zuedev/WAGithubExport, 0.0.1 )",
  },
});

if (!process.env.WA_AUTH_TOKEN || !process.env.WA_APP_KEY) {
  throw new Error("Error: Credentials not found");
} else {
  fs.rm("./export", { recursive: true, force: true }, () => {
    instance.get("/user").then((res) => {
      instance.get(`/user/${res.data.id}/worlds`).then((res) => {
        res.data.worlds.forEach((world) => {
          instance.get(`/world/${world.id}/articles`).then((res) => {
            res.data.articles.forEach((article) => {
              instance.get(`/article/${article.id}`).then((res) => {
                fs.mkdir(
                  `./export/${world.name}/${article.template_type}`,
                  { recursive: true },
                  () => {
                    fs.writeFileSync(
                      `./export/${world.name}/${article.template_type}/${article.title}.json`,
                      JSON.stringify(res.data, null, 2)
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
}
