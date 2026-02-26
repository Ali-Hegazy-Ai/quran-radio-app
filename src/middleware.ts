import { NextRequest, NextResponse } from 'next/server'

// Arabic-speaking countries by ISO 3166-1 alpha-2 code
const ARABIC_COUNTRIES = new Set([
    'EG', // Egypt
    'SA', // Saudi Arabia
    'AE', // UAE
    'KW', // Kuwait
    'QA', // Qatar
    'BH', // Bahrain
    'OM', // Oman
    'JO', // Jordan
    'LB', // Lebanon
    'SY', // Syria
    'IQ', // Iraq
    'LY', // Libya
    'TN', // Tunisia
    'DZ', // Algeria
    'MA', // Morocco
    'YE', // Yemen
    'SD', // Sudan
    'PS', // Palestine
    'MR', // Mauritania
    'SO', // Somalia
    'DJ', // Djibouti
    'KM', // Comoros
])

const LANG_COOKIE = 'quran_radio_lang'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Only set cookie if user hasn't manually chosen a language yet
    const existingLang = request.cookies.get(LANG_COOKIE)?.value
    if (existingLang === 'ar' || existingLang === 'en') {
        return response // Respect saved user preference
    }

    // Detect language from Vercel geo (free at Vercel edge)
    const country = request.geo?.country ?? ''
    const lang = ARABIC_COUNTRIES.has(country) ? 'ar' : 'en'

    // Fallback: check Accept-Language header if no geo
    if (!country) {
        const acceptLang = request.headers.get('Accept-Language') ?? ''
        const primaryLang = acceptLang.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? ''
        const detectedLang = primaryLang.startsWith('ar') ? 'ar' : 'en'
        response.cookies.set(LANG_COOKIE, detectedLang, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 year
            sameSite: 'lax',
        })
        return response
    }

    response.cookies.set(LANG_COOKIE, lang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
    })

    return response
}

export const config = {
    // Run on all pages except static files and API routes
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
