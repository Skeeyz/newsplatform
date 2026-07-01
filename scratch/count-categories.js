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
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .is('deleted_at', null)
    .neq('status', 'inactive');
    
  if (catError) {
    console.error(catError);
    return;
  }

  for (const cat of categories) {
    const { count, error } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', cat.id)
      .is('deleted_at', null);
      
    console.log(`Category: "${cat.name}" (ID: ${cat.id}, Slug: ${cat.slug}) -> Articles: ${count}`);
  }
}

main();
