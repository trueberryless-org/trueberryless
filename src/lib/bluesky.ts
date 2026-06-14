import { getLiveCollection } from "astro:content";

import { actorDid, bskyPublicApi } from "./const";
import { measuredFetch } from "./fetch";

export interface BlueskyPost {
  id: string;
  rkey: string;
  postUrl: string;
  text: string;
  likes: number;
  createdAt: string;
}

export async function getBlueskyPosts(
  fetchLimit = 50,
  displayLimit = 3
): Promise<BlueskyPost[]> {
  const result = await getLiveCollection("blueskyPosts");
  const allPosts = result?.entries || [];

  const sortedByDate = [...allPosts].sort((a: any, b: any) => {
    const timeA = new Date(a.data.createdAt).getTime() || 0;
    const timeB = new Date(b.data.createdAt).getTime() || 0;
    return timeB - timeA;
  });

  const postsToFetch = sortedByDate.slice(0, fetchLimit);
  const uris = postsToFetch.map((post: any) => post.id);

  const likeCounts: Record<string, number> = {};

  const chunkArray = (array: string[], size: number) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );
  };

  const chunks = chunkArray(uris, 25);

  await Promise.all(
    chunks.map(async (chunk) => {
      try {
        const queryParams = new URLSearchParams();
        chunk.forEach((uri: string) => queryParams.append("uris", uri));
        const response = await measuredFetch(
          `${bskyPublicApi}/xrpc/app.bsky.feed.getPosts?${queryParams.toString()}`
        );
        if (response.ok) {
          const data = await response.json();
          data.posts?.forEach((p: any) => {
            likeCounts[p.uri] = p.likeCount || 0;
          });
        }
      } catch {}
    })
  );

  const postsWithLikes = postsToFetch.map((post: any) => {
    const parts = post.id.split("/");
    const rkey = parts.length > 0 ? parts[parts.length - 1] : post.id;
    return {
      id: post.id,
      rkey,
      postUrl: `https://bsky.app/profile/${actorDid}/post/${rkey}`,
      text: post.data.text as string,
      likes: likeCounts[post.id] || 0,
      createdAt: post.data.createdAt as string,
    };
  });

  const topPosts = postsWithLikes
    .sort((a, b) => b.likes - a.likes)
    .slice(0, displayLimit);

  const finalSorted = topPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return finalSorted;
}
