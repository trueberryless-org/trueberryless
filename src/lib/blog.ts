import { getLiveCollection } from "astro:content";

export function processPost(post: any) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}.${day}`;
  };

  const constructUrl = (post: any) => {
    if (post.data.publication?.url && post.data.path) {
      const baseUrl = post.data.publication.url.replace(/\/$/, "");
      const path = post.data.path.startsWith("/")
        ? post.data.path
        : `/${post.data.path}`;
      return `${baseUrl}${path}`;
    }
    return "#";
  };

  const title = post.data.title || "Untitled Blog Post";
  const formattedDate = formatDate(post.data.publishedAt);
  const firstTag = post.data.tags?.[0];
  const otherTags = post.data.tags?.slice(1).join("  ") || "";
  const postUrl = constructUrl(post);

  return { title, formattedDate, firstTag, otherTags, postUrl };
}

export async function getAugmentedPosts() {
  const [postsResult, publicationsResult] = await Promise.all([
    getLiveCollection("posts"),
    getLiveCollection("publications"),
  ]);

  const posts = postsResult?.entries || [];
  const publications = publicationsResult?.entries || [];

  const publicationMap: Record<string, any> = {};
  publications.forEach((pub: any) => {
    publicationMap[pub.id] = pub.data;
  });

  return posts.map((post: any) => ({
    ...post,
    data: {
      ...post.data,
      publication: publicationMap[post.data.site] || null,
    },
  }));
}

export async function getGroupedPosts() {
  const augmentedPosts = await getAugmentedPosts();

  const sortedPosts = augmentedPosts.sort((a: any, b: any) => {
    const dateA = new Date(a.data.publishedAt);
    const dateB = new Date(b.data.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const groupedPosts = sortedPosts.reduce(
    (acc: Record<string, any[]>, post: any) => {
      const date = new Date(post.data.publishedAt);
      const year = date.getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a));

  return { groupedPosts, years };
}
