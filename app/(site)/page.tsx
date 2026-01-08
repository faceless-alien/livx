import { Hero } from '@/components/sections/Hero'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { ImpactStats } from '@/components/sections/ImpactStats'
import { OpenCallsPreview } from '@/components/sections/OpenCallsPreview'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { Testimonials } from '@/components/sections/Testimonials'
import { FinalCTA } from '@/components/sections/FinalCTA'

export const revalidate = 60

export default function Home() {
  return (
    <div>
      <Hero />
      <WhatWeDo />
      <ImpactStats />
      <OpenCallsPreview />
      <FeaturedProjects />
      <PartnerLogos />
      <Testimonials />
      <FinalCTA />
    </div>
  )
}
