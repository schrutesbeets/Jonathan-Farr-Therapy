import fs from "fs";
import path from "path";

const SEARCH_DIRS = ["src", "public", "app", "lib", "components"];
const IGNORE_FILES = [".env.example"];
const DANGEROUS_PATTERNS = [
  /AIzaSy[A-Za-z0-9_-]{33}/g, // Google API keys
  /sk-[A-Za-z0-9_-]{48}/g,    // OpenAI keys
  /ghp_[A-Za-z0-9]{36}/g,     // GitHub tokens
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
  /NEXT_PUBLIC_.*SECRET/gi,
  /NEXT_PUBLIC_.*KEY/gi,
  /NEXT_PUBLIC_.*TOKEN/gi,
  /VITE_.*SECRET/gi,
  /VITE_.*PRIVATE_KEY/gi,
  /VITE_.*TOKEN/gi,
];

let violationCount = 0;

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== ".git" && entry.name !== "dist") {
        scanDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      if (IGNORE_FILES.includes(entry.name)) continue;

      const content = fs.readFileSync(fullPath, "utf-8");
      for (const pattern of DANGEROUS_PATTERNS) {
        const matches = content.match(pattern);
        if (matches) {
          const lineMatches = content.split("\n").filter((line) => pattern.test(line));
          for (const line of lineMatches) {
            if (
              line.includes("your_api_key_here") ||
              line.includes("your_secret_here") ||
              line.includes("example") ||
              line.includes("security-audit")
            ) {
              continue;
            }
            console.error(`[SECURITY LEAK ALERT] Found potential secret leak in ${fullPath}:`);
            console.error(`  --> Line: ${line.trim()}`);
            violationCount++;
          }
        }
      }
    }
  }
}

console.log("🔒 Running Pre-Commit Security & Secrets Audit...");
for (const dir of SEARCH_DIRS) {
  scanDirectory(dir);
}

if (violationCount === 0) {
  console.log("✅ SECURITY AUDIT PASSED: Zero leaked secrets or hardcoded tokens found!");
  process.exit(0);
} else {
  console.error(`❌ SECURITY AUDIT FAILED: ${violationCount} potential secret leaks detected.`);
  process.exit(1);
}
