// Runs during Vercel's build step. Reads index.html (which has placeholder
// tokens, safe to commit to a public repo), swaps in the real values from
// environment variables, and writes the result to public/index.html for
// Vercel to serve.
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    '\nMissing SUPABASE_URL or SUPABASE_ANON_KEY.\n' +
    'Set both in Vercel: Project Settings -> Environment Variables.\n'
  );
  process.exit(1);
}

const srcPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(srcPath, 'utf8');

html = html.replace('__SUPABASE_URL__', SUPABASE_URL);
html = html.replace('__SUPABASE_ANON_KEY__', SUPABASE_ANON_KEY);

fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);

console.log('Built public/index.html with Supabase config injected.');
