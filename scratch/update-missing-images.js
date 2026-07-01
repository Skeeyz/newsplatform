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

const R2_URLS = [
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925549397-smart_city_hanoi.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925550189-high_speed_train.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925550604-flood_prevention.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925550968-hanoi_traffic.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925551293-ai_agent_office.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925551606-ar_glasses.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925551860-semiconductor_2nm.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925552263-autonomous_ev.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925552450-soccer_academy.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925552821-hanoi_marathon.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925553037-esports_stadium.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925553354-film_festival.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925553678-dan_bau_pop.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925554180-cooking_show.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925554903-music_festival.png",
  "https://pub-a2f157c1253e4420830c52887b0f6bce.r2.dev/articles/1782925555388-livestream_ecom.png"
];

async function main() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .is('deleted_at', null);

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Analyzing ${articles.length} articles...`);
  
  let updateCount = 0;
  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const isR2 = art.thumbnail_key && art.thumbnail_key.includes('.r2.dev');
    
    if (!isR2) {
      // Pick an image from the pool
      const selectedUrl = R2_URLS[i % R2_URLS.length];
      console.log(`Updating Article ID: ${art.id} ("${art.title}")`);
      console.log(`  Old thumbnail: ${art.thumbnail_key}`);
      console.log(`  New thumbnail: ${selectedUrl}`);

      // Also update image blocks in the content array if any exist
      let updatedContent = art.content;
      if (art.content) {
        let blocks = [];
        if (Array.isArray(art.content)) {
          blocks = art.content;
        } else if (art.content.blocks && Array.isArray(art.content.blocks)) {
          blocks = art.content.blocks;
        }
        
        const newBlocks = blocks.map(block => {
          if (block.type === 'image' && (!block.src || !block.src.includes('.r2.dev'))) {
            return {
              ...block,
              src: selectedUrl
            };
          }
          return block;
        });
        
        if (Array.isArray(art.content)) {
          updatedContent = newBlocks;
        } else if (art.content.blocks) {
          updatedContent = {
            ...art.content,
            blocks: newBlocks
          };
        }
      }

      const { error: updateError } = await supabase
        .from('articles')
        .update({
          thumbnail_key: selectedUrl,
          content: updatedContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', art.id);

      if (updateError) {
        console.error(`  Error updating article ID ${art.id}:`, updateError);
      } else {
        console.log(`  Successfully updated!`);
        updateCount++;
      }
    }
  }

  console.log(`Completed. Updated ${updateCount} articles.`);
}

main();
