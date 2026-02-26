import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const SITE_URL = 'https://quran-radio-app.vercel.app'
    return [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        }
    ]
}
