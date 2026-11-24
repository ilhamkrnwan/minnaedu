import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

let registered = false

export function useGSAP() {
  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)
    registered = true
  }

  return {
    gsap,
    ScrollTrigger,
    DrawSVGPlugin
  }
}
