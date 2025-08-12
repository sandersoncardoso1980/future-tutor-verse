export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export function getYouTubeApiKey(): string {
  return (typeof localStorage !== 'undefined' ? localStorage.getItem('youtubeApiKey') : '') || '';
}

export function setYouTubeApiKey(key: string) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('youtubeApiKey', key.trim());
  }
}

// Busca vídeos no YouTube usando Data API v3 com SafeSearch estrito
export async function searchYouTubeVideos(query: string, limit: number = 3): Promise<YouTubeVideo[]> {
  const API_KEY = getYouTubeApiKey();
  if (!API_KEY) {
    console.warn('YouTube API key ausente. Configure-a para habilitar vídeos.');
    return [];
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', query);
  url.searchParams.set('maxResults', String(limit));
  url.searchParams.set('type', 'video');
  url.searchParams.set('videoEmbeddable', 'true');
  url.searchParams.set('safeSearch', 'strict');
  url.searchParams.set('key', API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Erro YouTube API: ${res.status}`);
  }
  const data: any = await res.json();
  const items: any[] = Array.isArray(data.items) ? data.items : [];

  // Filtro adicional de termos sensíveis (pt/en)
  const banned = /(sexo|sexual|porn|xxx|nsfw|nude|nudity|viol[eê]ncia|gore|blood|ass|boob|breast|kill|murder|rape|homic[ií]dio|tiro|arma)/i;

  const results: YouTubeVideo[] = [];
  for (const it of items) {
    const id = it?.id?.videoId as string | undefined;
    const sn = it?.snippet || {};
    const title: string = sn.title || '';
    const description: string = sn.description || '';

    if (!id) continue;
    if (banned.test(title) || banned.test(description)) continue;

    const thumbnail = sn.thumbnails?.medium?.url || sn.thumbnails?.default?.url || '';
    if (!thumbnail) continue;

    results.push({
      id,
      title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail,
    });

    if (results.length >= limit) break;
  }

  return results;
}
