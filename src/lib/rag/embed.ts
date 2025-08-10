// Embeddings via Ollama (leve, sem libs pesadas). API: POST /api/embeddings { model, prompt }

export async function embedTexts(
  texts: string[],
  {
    baseUrl = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434',
    model = process.env.EMBED_MODEL_NAME || 'nomic-embed-text:latest',
  }: { baseUrl?: string; model?: string } = {}
): Promise<number[][]> {
  const results: number[][] = [];
  for (const text of texts) {
    const res = await fetch(`${baseUrl}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, prompt: text }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Embeddings upstream error: ${err}`);
    }
    const data = await res.json();
    const embedding: number[] = data?.embedding;
    if (!Array.isArray(embedding)) throw new Error('Invalid embedding payload');
    results.push(embedding);
  }
  return results;
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-9);
}


