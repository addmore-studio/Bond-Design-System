import { codeToHtml } from "shiki";

export async function highlight(code: string, lang = "tsx") {
  return codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}
