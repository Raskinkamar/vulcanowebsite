import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const baseDir = process.env.CONTACT_STORAGE_DIR || './storage/contacts';
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const dateDir = `${yyyy}-${mm}-${dd}`;

    const dir = join(process.cwd(), baseDir, dateDir);
    await mkdir(dir, { recursive: true });

    // Remover caracteres potencialmente perigosos do nome do arquivo. Evitar classes Unicode para compatibilidade do bundler.
    const safeSubject = (subject || message.slice(0, 64) || 'sem-assunto')
      .replace(/[^a-zA-Z0-9\s\-_.]/g, '')
      .trim() || 'sem-assunto';
    const filename = `${yyyy}${mm}${dd}_${hh}${min}${ss}_${safeSubject.replace(/\s+/g, '-').toLowerCase()}.txt`;
    const filePath = join(dir, filename);

    const content = [
      `Data: ${now.toISOString()}`,
      `Nome: ${name}`,
      `Email: ${email || '(não informado)'}`,
      `Assunto: ${subject || '(não informado)'}`,
      'Mensagem:',
      message,
      '',
      '--- JSON ---',
      JSON.stringify({ name, email, subject, message, createdAt: now.toISOString() }, null, 2),
    ].join('\n');

    await writeFile(filePath, content, 'utf-8');

    return NextResponse.json({ success: true, path: filePath });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e?.message || 'Internal error' }, { status: 500 });
  }
}


