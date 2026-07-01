import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envContent = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    env[key] = val;
  }
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, thumbnail_key, content')
    .is('deleted_at', null);

  if (error) {
    console.error(error);
    return;
  }

  console.log("Articles with MISSING or NON-R2 images:");
  articles.forEach(art => {
    const isOk = art.thumbnail_key && (art.thumbnail_key.includes('.r2.dev') || art.thumbnail_key.includes('supabase'));
    if (!isOk) {
      console.log(`[ID: ${art.id}] Title: "${art.title}" -> Thumbnail: ${art.thumbnail_key || 'NULL'}`);
    }
  });
}

main();
