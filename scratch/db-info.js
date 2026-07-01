import fs from 'fs';
import path from 'path';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Parse .env.local
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

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || "",
  },
});

async function main() {
  console.log("Connecting to R2...");
  try {
    const command = new ListObjectsV2Command({
      Bucket: env.R2_BUCKET_NAME,
      MaxKeys: 5
    });
    const response = await s3Client.send(command);
    console.log("R2 Connection Success!");
    console.log("Found objects:", response.Contents?.map(c => c.Key) || []);
  } catch (error) {
    console.error("R2 Connection Error:", error);
  }
}

main();
