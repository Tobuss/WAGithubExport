import axios from "axios";
import fs from "fs";
import download from "download";

const instance = axios.create({
  baseURL: "https://www.worldanvil.com/api/aragorn",
  headers: {
    "x-auth-token": process.env.WA_AUTH_TOKEN,
    "x-application-key": process.env.WA_APP_KEY,
    "Content-Type": "application/json",
    "User-Agent":
      "WAGithubExport ( https://github.com/zuedev/WAGithubExport, 0.0.2 )",
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
    const images = await instance.get(`/world/${world.id}/images`);

    articles.data.articles.forEach(async (article) => {
      const articleData = await instance.get(`/article/${article.id}`);

      fs.mkdirSync(
        `./export/${article.world.title}/articles/${article.template_type}`,
        { recursive: true }
      );

      fs.writeFileSync(
        `./export/${article.world.title}/articles/${article.template_type}/${article.title}.json`,
        JSON.stringify(articleData.data, null, 2)
      );
    });

    images.data.images.forEach(async (image) => {
      const imageData = await instance.get(`/image/${image.id}`);

      fs.mkdirSync(`./export/${imageData.data.world.title}/images`, {
        recursive: true,
      });

      let imageName = `${imageData.data.title}.${imageData.data.extension}`;

      if (/(?:\.([^.]+))?$/.exec(imageData.data.title)[1]) {
        imageName = imageData.data.title;
      }

      fs.writeFileSync(
        `./export/${imageData.data.world.title}/images/${imageName}`,
        await download(imageData.data.url)
      );
    });
  });
})();
