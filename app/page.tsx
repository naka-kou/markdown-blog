// app/page.tsx 記事一覧（トップページ）
import { getHelloPost } from "@/lib/posts";
import { getAllPosts } from "@/lib/posts"; 
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <ul className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2 p-4">
      {allPosts.map((post) => (
        <li key={post.slug} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
          <Link href={`/posts/${post.slug}`} className="block">
            <Image 
              src={post.thumbnail}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {post.title}
              </h2>
              <span className="text-sm text-gray-500">
                {post.date.toLocaleString()}
              </span>
              <p className="mt-2 text-gray-700">
                {post.excerpt}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}