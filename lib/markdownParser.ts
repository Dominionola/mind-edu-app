/**
 * Simple markdown parser using string replacement (no external packages)
 * Supports: headings, bold, italic, lists, links, code blocks
 */

export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Code blocks (```code```)
  html = html.replace(/```([^`]+)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>');

  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>');

  // Headings
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-foreground">$1</h1>');

  // Bold (**text** or __text__)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong class="font-bold text-foreground">$1</strong>');

  // Italic (*text* or _text_)
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em class="italic">$1</em>');

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');

  // Unordered lists (- item)
  html = html.replace(/^- (.*$)/gm, '<li class="ml-6 mb-2">$1</li>');
  html = html.replace(/(<li class="ml-6 mb-2">.*<\/li>\n?)+/g, '<ul class="list-disc my-4 space-y-1 text-muted-foreground">$&</ul>');

  // Ordered lists (1. item)
  html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-6 mb-2">$1</li>');

  // Paragraphs (double line break)
  html = html.replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground leading-relaxed">');
  html = '<p class="mb-4 text-muted-foreground leading-relaxed">' + html + '</p>';

  // Line breaks
  html = html.replace(/\n/g, '<br />');

  return html;
}

export function stripMarkdown(markdown: string): string {
  if (!markdown) return '';

  return markdown
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^- /gm, '')
    .trim();
}
