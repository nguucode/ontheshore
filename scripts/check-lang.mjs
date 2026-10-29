// Chạy sau `astro build`: trang tiếng Anh (<html lang="en">) không được lộ chữ tiếng Việt,
// trừ tên riêng trong ALLOW và phần tử có lang="vi" (ví dụ nút "Tiếng Việt").
// Bắt lỗi kiểu chuỗi tiếng Việt viết cứng thay vì qua t("vi", "en").
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const DIST = "dist";
const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const ALLOW = new Set(["Ngưu", "Nguyễn", "ẫ", "ặ", "ỗ"]); // tên; ví dụ dấu chồng trong bài typography
const ATTRS = /\s(?:alt|title|aria-label|content|placeholder)="([^"]*)"/g;
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? files(join(dir, d.name)) : d.name.endsWith(".html") ? [join(dir, d.name)] : [],
  );

const problems = [];
const check = (file, text) => {
  const words = text.split(/[\s.,;:!?()"'·—/]+/).filter((w) => VI.test(w) && !ALLOW.has(w));
  if (words.length) problems.push([file, words.join(" "), text.trim()]);
};

for (const file of files(DIST)) {
  const html = readFileSync(file, "utf8").replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "");
  if (!/<html[^>]*\slang="en"/.test(html)) continue;
  const stack = []; // true = đang trong phần tử lang="vi"
  for (const [, close, tag, attrs, text] of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g)) {
    const inVi = stack.includes(true);
    if (text !== undefined) {
      if (!inVi) check(file, text);
      continue;
    }
    const name = tag.toLowerCase();
    if (close) {
      stack.pop();
      continue;
    }
    const vi = /\slang="vi"/.test(attrs);
    if (!inVi && !vi) for (const [, v] of attrs.matchAll(ATTRS)) check(file, v);
    if (!VOID.has(name) && !attrs.endsWith("/")) stack.push(vi);
  }
}

if (problems.length) {
  console.error("Chữ tiếng Việt trên trang tiếng Anh (dùng t(\"vi\", \"en\") hoặc lang=\"vi\"):");
  for (const [file, word, ctx] of problems) console.error(`  ${relative(DIST, file)}: "${word}" in "${ctx.slice(0, 100)}"`);
  process.exit(1);
}
console.log("check-lang: OK");
