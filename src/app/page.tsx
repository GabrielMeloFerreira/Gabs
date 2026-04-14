import About from '@/components/About'
import Experience from '@/components/Experience/Experience'
import { Intro } from "@/components/Intro"
import { NavHeader } from '@/components/NavHeader'

export default function Home() {
  return (
    <>
      <NavHeader />
      <Intro/>
      <About />
      <Experience />
    </>
  )
}
