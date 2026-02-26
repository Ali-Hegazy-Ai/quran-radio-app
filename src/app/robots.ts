import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/private/', '/api/'],
            },
            {
                // Prevent AI scrapers from indexing live stream data
                userAgent: 'GPTBot',
                disallow: '/',
            },
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
        ],
        sitemap: 'https://quran-radio-app.vercel.app/sitemap.xml',
        host: 'https://quran-radio-app.vercel.app',
    }
}
