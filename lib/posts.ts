// posts.ts 記事の取得に関する関数を定義
import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export async function getHelloPost(){
    const filePath = path.join(
        process.cwd(),
        "content",
        "posts",
        "hello-world.md"
    )

    const fileContent = fs.readFileSync(filePath, "utf-8");

    const processedContent = await remark().use(html).process(fileContent);

    const contentHtml = processedContent.toString();

    return Promise.resolve(contentHtml);
}

export async function getAllPosts(){
    const allPostsPath = path.join(
        process.cwd(),
        "content",
        "posts"
    )

    const fileNames = fs.readdirSync(allPostsPath);

    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(".md",  "");
        const fullPath = path.join(allPostsPath, fileName);

        const fileContents = fs.readFileSync(fullPath, "utf-8");
      
        const matterResult = matter(fileContents);

        const title = matterResult.data.title;
        const date = matterResult.data.date;
        const thumbnail = matterResult.data.thumbnail;

        const content = matterResult.content;
        const excerpt = content.slice(0,100);

        const processedContent = await remark()
          .use(html)
          .process(content);

        const contentHtml = processedContent.toString();

        return {
          slug,
          content: contentHtml,
          excerpt,
          title,
          date,
          thumbnail
        }
      })
    );
    
    posts.sort(
      (a, b) =>
         new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return posts;
}