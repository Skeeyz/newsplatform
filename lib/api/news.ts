import { apiGet } from "@/lib/api/http";
import type {
  Article,
  CategoryFeed,
  HomeFeed,
  PostRecommendations,
  SiteSettings,
  NavigationItem,
} from "@/lib/types/news";

export function mapBackendArticleToFrontend(data: any): Article {
  return {
    id: data.slug || data.id?.toString() || "",
    title: data.title || "",
    category: data.category?.name || data.category || "Tin tức",
    categorySlug: data.category?.slug || undefined,
    time: data.published_at || data.created_at || new Date().toISOString(),
    image: data.thumbnail_key || "",
    intro: data.summary || undefined,
    content: data.content?.blocks || data.content || undefined,
  };
}

export async function getSiteSettings(): Promise<{ settings: SiteSettings, categories: NavigationItem[] }> {
  try {
    const [settingsData, categoriesData] = await Promise.all([
      apiGet<any>("/settings", { next: { revalidate: 60 } }).catch(() => null),
      apiGet<any>("/categories", { next: { revalidate: 60 } }).catch(() => null),
    ]);

    const data = settingsData || {};
    const categoriesItems = Array.isArray(categoriesData?.items) ? categoriesData.items : (Array.isArray(categoriesData) ? categoriesData : []);
    
    const dynamicPrimaryLinks = categoriesItems
      .filter((cat: any) => !cat.deleted_at && cat.status !== 'inactive')
      .slice(0, 6)
      .map((cat: any) => ({
          label: cat.name.toUpperCase(),
          href: `/${cat.slug}`,
        }));

    return {
      settings: {
        brand: {
          name: data?.brand?.name || "WebTinTuc",
          tagline: data?.brand?.tagline || "",
          footerDescription: data?.brand?.footerDescription || "",
          copyright: data?.brand?.copyright || "",
          searchPlaceholder: data?.brand?.searchPlaceholder || "Tìm kiếm...",
          utilityLinks: data?.brand?.utilityLinks || [],
          socialLinks: data?.brand?.socialLinks || [],
        },
        footer: {
          columns: data?.footer?.columns || [],
        }
      },
      categories: dynamicPrimaryLinks
    };
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return {
      settings: {
        brand: { name: "WebTinTuc", tagline: "", footerDescription: "", copyright: "", searchPlaceholder: "Tìm kiếm...", utilityLinks: [], socialLinks: [] },
        footer: { columns: [] }
      },
      categories: []
    };
  }
}

export async function getHomeFeed(): Promise<HomeFeed> {
  const [featuredData, latestData] = await Promise.all([
    apiGet<any>("/articles?featured=true&limit=1", { next: { revalidate: 60 } }),
    apiGet<any>("/articles?limit=12", { next: { revalidate: 60 } }),
  ]);
  
  const featuredItems = Array.isArray(featuredData?.items) ? featuredData.items : (Array.isArray(featuredData) ? featuredData : []);
  const latestItems = Array.isArray(latestData?.items) ? latestData.items : (Array.isArray(latestData) ? latestData : []);

  return {
    featuredArticle: featuredItems.length > 0 ? mapBackendArticleToFrontend(featuredItems[0]) : undefined,
    latestArticles: latestItems.map(mapBackendArticleToFrontend),
  };
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  try {
    const data = await apiGet<any>(`/articles/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    return mapBackendArticleToFrontend(data);
  } catch (error) {
    if (isNotFound(error)) return undefined;
    throw error;
  }
}

export async function getPostRecommendations(
  articleId: string,
): Promise<PostRecommendations> {
  const [relatedData, likeData] = await Promise.all([
    apiGet<any>(`/articles?limit=4`, { next: { revalidate: 60 } }).catch(() => null),
    apiGet<any>(`/articles?limit=4`, { next: { revalidate: 60 } }).catch(() => null),
  ]);

  const relatedItems = Array.isArray(relatedData?.items) ? relatedData.items : (Array.isArray(relatedData) ? relatedData : []);
  const likeItems = Array.isArray(likeData?.items) ? likeData.items : (Array.isArray(likeData) ? likeData : []);

  return {
    relatedPosts: relatedItems.map(mapBackendArticleToFrontend),
    likePosts: likeItems.map(mapBackendArticleToFrontend),
  };
}

export async function getCategoryFeed(
  category: string,
): Promise<CategoryFeed | undefined> {
  try {
    const data = await apiGet<any>(
      `/articles/category/${encodeURIComponent(category)}`,
      { next: { revalidate: 60 } },
    );
    
    const categoryInfo = data?.category || { name: category };
    const items = Array.isArray(data?.articles?.items) ? data.articles.items : (Array.isArray(data?.items) ? data.items : []);
    
    return {
      label: categoryInfo.name,
      featured: items.length > 0 ? mapBackendArticleToFrontend(items[0]) : mapBackendArticleToFrontend({}),
      list: items.slice(1).map(mapBackendArticleToFrontend),
    };
  } catch (error) {
    if (isNotFound(error)) return undefined;
    throw error;
  }
}

export async function getKnownCategorySlugs() {
  try {
    const categoriesData = await apiGet<any>("/categories", { next: { revalidate: 60 } });
    const items = Array.isArray(categoriesData?.items) ? categoriesData.items : (Array.isArray(categoriesData) ? categoriesData : []);
    return items.filter((cat: any) => !cat.deleted_at).map((cat: any) => cat.slug);
  } catch (error) {
    return [];
  }
}

function isNotFound(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 404
  );
}
