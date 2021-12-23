import axios from "axios";
import fs from "fs";

const instance = axios.create({
  baseURL: "https://www.worldanvil.com/api/aragorn",
  headers: {
    "x-auth-token": process.env.WA_AUTH_TOKEN,
    "x-application-key": process.env.WA_APP_KEY,
    "Content-Type": "application/json",
    "User-Agent":
      "WAGithubExport ( https://github.com/zuedev/WAGithubExport, 0.0.1 )",
  },
});

(async () => {
  if (!process.env.WA_AUTH_TOKEN || !process.env.WA_APP_KEY)
    throw new Error("Error: Credentials not found");

  fs.rmSync("./export", { recursive: true, force: true });

  const user = await instance.get("/user");
  const worlds = await instance.get(`/user/${user.data.id}/worlds`);

  worlds.data.worlds.forEach(async (world) => {
    const articles = await instance.get(`/world/${world.id}/articles`);

    articles.data.articles.forEach(async (article) => {
      const articleData = await instance.get(`/article/${article.id}`);

      fs.mkdirSync(
        `./export/${article.world.name}/articles/${article.template_type}`,
        { recursive: true }
      );

      fs.writeFileSync(
        `./export/${article.world.name}/articles/${article.template_type}/${article.title}.json`,
        JSON.stringify(articleData.data, null, 2)
      );
    });
  });
})();
