import { KNOWLEDGE_BASE, KnowledgeItem } from './knowledge';
import { embedTexts, cosineSimilarity } from './embed';

export interface RetrievedChunk extends KnowledgeItem {
  score: number;
}

let cachedEmbeddings: { id: string; embedding: number[] }[] | null = null;

async function ensureEmbeddings(): Promise<typeof cachedEmbeddings> {
  if (cachedEmbeddings) return cachedEmbeddings;
  const texts = KNOWLEDGE_BASE.map((k) => `${k.title}\n\n${k.text}`);
  const vectors = await embedTexts(texts);
  cachedEmbeddings = vectors.map((v, i) => ({ id: KNOWLEDGE_BASE[i].id, embedding: v }));
  return cachedEmbeddings;
}

export async function retrieve(query: string, topK = 4): Promise<RetrievedChunk[]> {
  const items = await ensureEmbeddings();
  const [qVec] = await embedTexts([query]);
  const scored = items!.map((e) => ({
    id: e.id,
    score: cosineSimilarity(qVec, e.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, topK);
  const out: RetrievedChunk[] = top.map((s) => {
    const k = KNOWLEDGE_BASE.find((x) => x.id === s.id)!;
    return { ...k, score: s.score };
  });
  return out;
}

export function buildSystemPrompt(): string {
  return [
    'Você é um assistente da agência Vulcano. Responda objetivamente, em português do Brasil, e quando fizer sentido ofereça próxima ação (ex.: solicitar informações para orçamento).',
    'Quando a pergunta for sobre serviços da Vulcano, dê preferência a informações desta base de conhecimento. Se não tiver certeza, explique sucintamente e seja honesto sobre limitações.',
  ].join('\n');
}

export function formatContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map((c) => `# ${c.title}\n${c.text}`)
    .join('\n\n---\n\n');
}


