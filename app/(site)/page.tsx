import { Hero } from '@/components/sections/Hero'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ImpactStats } from '@/components/sections/ImpactStats'
import { OpenCallsPreview } from '@/components/sections/OpenCallsPreview'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { Testimonials } from '@/components/sections/Testimonials'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

function LoadingSection() {
  return (
    <div className="py-16 flex justify-center">
      <div className="animate-pulse text-muted">Loading...</div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <WhatWeDo />
      <ImpactStats />
      <Suspense fallback={<LoadingSection />}>
        <OpenCallsPreview />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <PartnerLogos />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Testimonials />
      </Suspense>
      <FinalCTA />
    </div>
  )
}
