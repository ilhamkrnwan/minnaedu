import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Scroll motion for inner pages (home uses useMotion):
// - h1/h2 unmask line by line
// - children of [data-reveal] rise in as they enter (an element without children rises itself)
// - [data-scrub-words] words fade from faint to solid, tied to scroll position
// - [data-depth] drifts by that many px while passing through the viewport
// Reduced motion: short fades only.
export function useReveal() {
  const root = ref<HTMLElement | null>(null)
  let mm: gsap.MatchMedia | undefined

  onMounted(() => {
    const el = root.value
    if (!el) return
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const $$ = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, el)

    const context = gsap.matchMedia()
    mm = context
    context.add({ full: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      const { full } = ctx.conditions as { full: boolean }

      const items = $$('[data-reveal]').flatMap(group => group.children.length ? [...group.children] as HTMLElement[] : [group])
      if (items.length) {
        gsap.set(items, { opacity: 0, y: full ? 28 : 0 })
        ScrollTrigger.batch(items, {
          start: 'top 90%',
          once: true,
          onEnter: batch => gsap.to(batch, {
            opacity: 1, y: 0, duration: full ? 0.9 : 0.4, ease: 'expo.out', stagger: full ? 0.08 : 0
          })
        })
      }

      if (!full) return

      $$('h1, h2').forEach((h) => {
        SplitText.create(h, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: self => gsap.from(self.lines, {
            yPercent: 125,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: h, start: 'top 90%', once: true }
          })
        })
      })

      // Long descriptive text: each word goes from faint to solid as the paragraph scrolls by.
      $$('[data-scrub-words]').forEach((text) => {
        SplitText.create(text, {
          type: 'words',
          autoSplit: true,
          onSplit: self => gsap.fromTo(self.words, { opacity: 0.15 }, {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: text, start: 'top 80%', end: 'bottom 45%', scrub: true }
          })
        })
      })

      $$('[data-depth]').forEach((layer) => {
        const d = Number(layer.dataset.depth || 0) * (innerWidth < 680 ? 0.5 : 1)
        gsap.fromTo(layer, { y: -d / 2 }, {
          y: d / 2,
          ease: 'none',
          scrollTrigger: { trigger: layer, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        })
      })
    }, el)

    // Fonts and lazy images shift layout; re-measure triggers.
    document.fonts?.ready.then(() => {
      if (mm === context) ScrollTrigger.refresh()
    })
  })

  onBeforeUnmount(() => {
    const context = mm
    mm = undefined
    context?.revert()
  })

  return root
}
