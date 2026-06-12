import { getLiveCollection } from "astro:content";

const actorDid = "did:plc:pbjvqaziagcyv2vqodldn5op";
const pdsEndpoint = "https://npmx.social";

export interface BookItem {
  id: string;
  hiveId: string;
  title: string;
  authors: string;
  coverUrl: string | null;
  rotation: string;
  thickness: number;
}

export interface ReadingSummaryItem {
  title: string;
  hiveId: string;
  startedAt?: string;
  stars?: number;
}

export interface ReadingSummary {
  latest: ReadingSummaryItem;
  favorites: ReadingSummaryItem[];
}

export async function getLibraryBooks(): Promise<BookItem[]> {
  const { entries: allBooks, error } = await getLiveCollection("books");

  if (error || !allBooks || allBooks.length === 0) {
    return [];
  }

  const filteredBooks = allBooks
    .filter((book: any) => {
      const status = book.data.status;
      return status === "Finished";
    })
    .sort((a: any, b: any) => {
      const dateA = a.data.finishedAt || a.data.startedAt || a.data.createdAt;
      const dateB = b.data.finishedAt || b.data.startedAt || b.data.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

  const booksWithPages = filteredBooks.map((book: any) => {
    let pages = book.data.bookProgress?.totalPages;

    if (!pages) {
      let hash = 0;
      const text = book.data.title || book.id;
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
      }
      pages = Math.abs(hash % 500) + 200;
    }

    let coverUrl = null;
    if (book.data.cover?.ref?.$link) {
      coverUrl = `${pdsEndpoint}/xrpc/com.atproto.sync.getBlob?did=${actorDid}&cid=${book.data.cover.ref.$link}`;
    }

    return {
      id: book.id,
      hiveId: book.data.hiveId,
      title: book.data.title,
      authors: book.data.authors,
      coverUrl,
      rotation: (Math.random() * 8 - 4).toFixed(2),
      pages,
    };
  });

  if (booksWithPages.length === 0) {
    return [];
  }

  return booksWithPages.map((book) => {
    const calculatedThickness = 8 + book.pages * 0.04;
    const thickness = Math.max(10, Math.min(60, calculatedThickness));

    return {
      id: book.id,
      hiveId: book.hiveId,
      title: book.title,
      authors: book.authors,
      coverUrl: book.coverUrl,
      rotation: book.rotation,
      thickness: Math.round(thickness),
    };
  });
}

export async function getReadingSummary(): Promise<ReadingSummary | null> {
  const { entries: books, error } = await getLiveCollection("books");

  if (error || !books || books.length === 0) {
    return null;
  }

  const sortedByDate = [...books].sort((a: any, b: any) => {
    const dateA = new Date(
      a.data.finishedAt || a.data.startedAt || 0
    ).getTime();
    const dateB = new Date(
      b.data.finishedAt || b.data.startedAt || 0
    ).getTime();
    return dateB - dateA;
  });

  const latest = sortedByDate[0];

  const favorites = [...books]
    .filter((b: any) => typeof b.data.stars === "number")
    .sort((a: any, b: any) => (b.data.stars ?? 0) - (a.data.stars ?? 0))
    .filter((b: any) => b.data.hiveId !== latest.data.hiveId)
    .slice(0, 3)
    .map((b: any) => ({
      title: b.data.title as string,
      hiveId: b.data.hiveId as string,
      stars: b.data.stars as number,
    }));

  return {
    latest: {
      title: latest.data.title as string,
      hiveId: latest.data.hiveId as string,
      startedAt: latest.data.startedAt as string | undefined,
    },
    favorites,
  };
}
