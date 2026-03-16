// app/posts/[slug]/page.tsx 記事ページ
import { getAllPosts } from "@/lib/posts";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts = await getAllPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Image 
        src={post.thumbnail}
        alt={post.title}
        width={600}
          height={400}
      />
      <h1>{post.title}</h1>
      <span>{post.date.toLocaleString()}</span>
      <div
        dangerouslySetInnerHTML={{
          __html: post.content
        }}
      />
    </div>
  );
}
