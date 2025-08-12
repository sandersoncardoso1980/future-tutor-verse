export const TENOR_API_KEY = "AIzaSyBquz8fOHuAbKYLbsY0DwVFU4iAop7rimA";

// Busca GIFs no Tenor com filtros de segurança
export async function searchTenorGifs(query: string, limit: number = 3): Promise<string[]> {
  const url = new URL("https://tenor.googleapis.com/v2/search");
  url.searchParams.set("q", query);
  url.searchParams.set("key", TENOR_API_KEY);
  url.searchParams.set("limit", String(limit));
  // Filtro mais rígido para evitar sexo/violência
  url.searchParams.set("contentfilter", "high");
  // Retornar somente GIFs
  url.searchParams.set("media_filter", "gif");
  // Pequena aleatoriedade para variedade
  url.searchParams.set("random", "true");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Erro Tenor API: ${res.status}`);
  }

  const data: any = await res.json();
  const results: any[] = Array.isArray(data.results) ? data.results : [];

  // Filtro adicional por palavras sensíveis (pt/en)
  const banned = /(sexo|sexual|porn|xxx|nsfw|nude|nudity|viol[eê]ncia|gore|blood|ass|boob|breast|kill|murder|rape|homic[ií]dio|tiro|arma)/i;

  const urls: string[] = [];
  for (const item of results) {
    const desc: string = item?.content_description || "";
    if (banned.test(desc)) continue;

    const media = item?.media_formats || {};
    const gifUrl: string | undefined = media.gif?.url || media.tinygif?.url || item?.url || item?.itemurl;

    if (gifUrl && !banned.test(gifUrl)) {
      urls.push(gifUrl);
    }

    if (urls.length >= limit) break;
  }

  return urls;
}

// Controle simples de limite diário por usuário usando localStorage
function usageKey(userId: string) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `tenor-usage:${userId}:${today}`;
}

export function getRemainingTenorUsage(userId: string, maxPerDay = 3): number {
  const key = usageKey(userId);
  const used = parseInt(localStorage.getItem(key) || "0", 10) || 0;
  return Math.max(0, maxPerDay - used);
}

export function incrementTenorUsage(userId: string, amount = 1) {
  const key = usageKey(userId);
  const used = parseInt(localStorage.getItem(key) || "0", 10) || 0;
  localStorage.setItem(key, String(used + amount));
}
