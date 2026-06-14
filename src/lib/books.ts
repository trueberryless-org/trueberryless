import { getLiveCollection } from "astro:content";

import { actorDid, pdsEndpoint } from "./const";

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

  type BookEntry = (typeof allBooks)[number];
  const filteredBooks = allBooks
    .filter((book: BookEntry) => {
      const status = book.data.status;
      return status === "Finished";
    })
    .sort((a: BookEntry, b: BookEntry) => {
      const dateA = a.data.finishedAt || a.data.startedAt || a.data.createdAt;
      const dateB = b.data.finishedAt || b.data.startedAt || b.data.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

  const processedBooks = filteredBooks.map((book: BookEntry): BookItem => {
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
    const cover = book.data.cover as any;
    if (cover?.ref?.$link) {
      coverUrl = `${pdsEndpoint}/xrpc/com.atproto.sync.getBlob?did=${actorDid}&cid=${cover.ref.$link}`;
    }

    const calculatedThickness = 8 + pages * 0.04;
    const thickness = Math.max(10, Math.min(60, calculatedThickness));

    return {
      id: book.id,
      hiveId: book.data.hiveId,
      title: book.data.title,
      authors: book.data.authors,
      coverUrl,
      rotation: (Math.random() * 8 - 4).toFixed(2),
      thickness: Math.round(thickness),
    };
  });

  if (processedBooks.length === 0) {
    return [];
  }

  return processedBooks;
}

export async function getReadingSummary(): Promise<ReadingSummary | null> {
  const { entries: books, error } = await getLiveCollection("books");

  if (error || !books || books.length === 0) {
    return null;
  }

  type BookEntry = (typeof books)[number];

  const sortedByDate = [...books].sort((a: BookEntry, b: BookEntry) => {
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
    .filter((b: BookEntry) => typeof b.data.stars === "number")
    .sort(
      (a: BookEntry, b: BookEntry) => (b.data.stars ?? 0) - (a.data.stars ?? 0)
    )
    .filter((b: BookEntry) => b.data.hiveId !== latest.data.hiveId)
    .slice(0, 3)
    .map((b: BookEntry) => ({
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
