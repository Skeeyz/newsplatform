import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Homepage
  entries.push({
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0
  })

  if (!apiUrl) return entries;

  try {
    // Categories
    const categoriesRes = await fetch(`${apiUrl}/categories`, { next: { revalidate: 3600 } })
    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json()
      const categories = Array.isArray(categoriesData?.items) ? categoriesData.items : (Array.isArray(categoriesData?.data?.items) ? categoriesData.data.items : (Array.isArray(categoriesData?.data) ? categoriesData.data : []));
      for (const cat of categories) {
        if (cat.deleted_at) continue;
        entries.push({
          url: `${siteUrl}/${cat.slug}`,
          lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.7
        })
      }
    }

    // Articles — only published, not deleted
    const articlesRes = await fetch(`${apiUrl}/articles?limit=5000`, { next: { revalidate: 3600 } })
    if (articlesRes.ok) {
      const articlesData = await articlesRes.json()
      const articles = Array.isArray(articlesData?.items) ? articlesData.items : (Array.isArray(articlesData?.data?.items) ? articlesData.data.items : (Array.isArray(articlesData?.data) ? articlesData.data : []));
      for (const article of articles) {
        if (article.deleted_at || article.status !== 'published') continue;
        entries.push({
          url: `${siteUrl}/posts/${article.slug}`,
          lastModified: article.updated_at ? new Date(article.updated_at) : new Date(article.published_at ?? Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8
        })
      }
    }
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return entries
}
