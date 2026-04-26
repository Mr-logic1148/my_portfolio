import FloatingSocials from '@/components/FloatingSocials'
import MorphicCrystalBackground from '@/components/MorphicCrystalBackground'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

export const metadata = {
  title: 'Mehraj Gaud — Full-Stack Developer',
  description:
    'Portfolio of Mehraj Gaud — Full-Stack Developer, Next.js Engineer, and Machine Learning enthusiast building high-end scalable web experiences.',
  openGraph: {
    title: 'Mehraj Gaud — Full-Stack Developer',
    description: 'Building high-end, scalable web experiences with modern technologies.',
    url: 'https://your-vercel-url.vercel.app', // 👈 replace with your actual URL
    siteName: 'Mehraj Gaud Portfolio',
    images: [
      {
        url: '/og-image.png', // 👈 add a 1200x630 image to /public called og-image.png
        width: 1200,
        height: 630,
        alt: 'Mehraj Gaud Portfolio',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mehraj Gaud — Full-Stack Developer',
    description: 'Building high-end, scalable web experiences with modern technologies.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative isolate">
        {/* Scroll progress bar — thin indigo line at top of viewport */}
        <ScrollProgress />

        <MorphicCrystalBackground />
        <div className="relative z-10">
          <Navbar />
          <FloatingSocials />
          {children}
        </div>
      </body>
    </html>
  )
}