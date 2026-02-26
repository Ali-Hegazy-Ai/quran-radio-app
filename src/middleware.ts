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

    // Respect user's saved preference — never override it
    const existingLang = request.cookies.get(LANG_COOKIE)?.value
    if (existingLang === 'ar' || existingLang === 'en') {
        return response
    }

    // Vercel injects the visitor's country as an HTTP header (no type issues)
    // Docs: https://vercel.com/docs/edge-network/headers#x-vercel-ip-country
    const country = request.headers.get('x-vercel-ip-country') ?? ''

    let lang: 'ar' | 'en'

    if (country) {
        // Country detected — use geo to decide language
        lang = ARABIC_COUNTRIES.has(country) ? 'ar' : 'en'
    } else {
        // No geo header (local dev) — fall back to Accept-Language header
        const acceptLang = request.headers.get('Accept-Language') ?? ''
        const primary = acceptLang.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? ''
        lang = primary.startsWith('ar') ? 'ar' : 'en'
    }

    response.cookies.set(LANG_COOKIE, lang, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax',
    })

    return response
}

export const config = {
    // Run on all pages except Next.js internals and static assets
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
