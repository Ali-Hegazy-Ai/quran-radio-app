/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Don't expose the framework in response headers
  poweredByHeader: false,

  async headers() {
    // Allowed stream/API origins — explicit allowlist, not wildcard
    const streamOrigins = 'https://stream.radiojar.com https://media.radiojar.com'
    const apiOrigins = 'https://api.quran.com https://verses.quran.com'
    const analyticsOrigins = 'https://va.vercel-scripts.com https://vitals.vercel-insights.com'

    const csp = [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its CSS-in-JS; unsafe-eval is NOT needed
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      // Google Fonts (if added in future) + self
      "font-src 'self' https://fonts.gstatic.com",
      // OG images and web-hosted assets
      "img-src 'self' data: https:",
      // Only allow audio from the actual stream host
      `media-src 'self' blob: ${streamOrigins}`,
      // API calls are restricted to known endpoints
      `connect-src 'self' ${streamOrigins} ${apiOrigins} ${analyticsOrigins}`,
      // Web Audio API needs blob: workers
      "worker-src 'self' blob:",
      // Prevent embedding in iframes except on same origin
      "frame-ancestors 'self'",
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Safe referrer — sends origin only to same site, nothing to cross-origin
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // HSTS — enforce HTTPS for 2 years, include subdomains, allow preloading
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Restrict browser feature access
          { key: 'Permissions-Policy', value: 'autoplay=(self), fullscreen=(self), camera=(), microphone=(), geolocation=()' },
          // Disable cross-origin isolation issues
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
