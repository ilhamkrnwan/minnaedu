import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Scroll parallax (data-parallax scenes + data-depth layers), hero entrance, section reveals.
// Reduced motion: no parallax/split/movement, only short opacity fades.
export function useMotion() {
  let mm: gsap.MatchMedia | undefined

  function init(root: HTMLElement) {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const $$ = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, root)

    mm = gsap.matchMedia()
    mm.add(
      { full: '(prefers-reduced-motion: no-preference)', narrow: '(max-width: 680px)' },
      (ctx) => {
        const { full, narrow } = ctx.conditions as { full: boolean, narrow: boolean }

        // Fade/rise a group once when it scrolls into view.
        const rise = (sel: string, y: number, stagger = 0.12) => {
          const els = $$(sel)
          if (!els.length) return
          const dy = full ? y : 0
          gsap.set(els, { opacity: 0, y: dy })
          ScrollTrigger.batch(els, {
            start: 'top 88%',
            once: true,
            onEnter: batch => gsap.to(batch, {
              opacity: 1, y: 0, duration: full ? 0.9 : 0.4, ease: 'expo.out', stagger: full ? stagger : 0
            })
          })
        }

        rise('.subjects li', 14, 0.08)
        rise('.program-grid article', 40)
        rise('.quotes figure', 28)
        rise('.steps li', 24, 0.15)
        rise('.teacher-copy > *', 20, 0.1)
        rise('.contact-panel > div:first-child > *', 20, 0.1)

        if (!full) return

        // Hero entrance: headline lines unmask, marker underline draws, art layers settle in.
        const h1 = root.querySelector<HTMLElement>('.hero h1')
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        if (h1) {
          SplitText.create(h1, {
            type: 'lines',
            mask: 'lines',
            maskClass: 'split-mask',
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(h1, { opacity: 1 })
              return tl.fromTo(self.lines, { yPercent: 125 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0)
            }
          })
          tl.fromTo('.hero .marker', { '--mark': 0 }, { '--mark': 1, duration: 0.9, ease: 'power2.out' }, 0.7)
        }
        tl.fromTo('.hero-copy > :not(h1)', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.35)
          .fromTo('.hero-discover', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1)
          .fromTo('.hero-shapes', { opacity: 0, scale: 0.94, yPercent: 5 }, { opacity: 1, scale: 1, yPercent: 0, duration: 1.4 }, 0.1)
          .fromTo('.hero-type-back', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.3)
          .fromTo('.hero-type-front', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.45)
          .fromTo('.hero-figures', { opacity: 0, yPercent: 14 }, { opacity: 1, yPercent: 0, duration: 1.3 }, 0.5)
          .fromTo('.hero-botanicals', { opacity: 0, xPercent: 16, yPercent: 8 }, { opacity: 1, xPercent: 0, yPercent: 0, duration: 1.3 }, 0.7)
        // Start values are now inline; the pre-hydration CSS hide can go.
        document.documentElement.classList.remove('motion')

        // Headings of later sections: line unmask on enter.
        $$('section:not(.hero) h2').forEach((h) => {
          SplitText.create(h, {
            type: 'lines',
            mask: 'lines',
            maskClass: 'split-mask',
            autoSplit: true,
            onSplit: self => gsap.from(self.lines, {
              yPercent: 125,
              duration: 0.9,
              ease: 'expo.out',
              stagger: 0.1,
              scrollTrigger: { trigger: h, start: 'top 88%', once: true }
            })
          })
        })

        // Parallax: each layer drifts by its data-depth (px) across the scene's pass through the viewport.
        const strength = narrow ? 0.46 : 1
        $$('[data-parallax]').forEach((scene) => {
          const isHero = scene.classList.contains('hero-art')
          scene.querySelectorAll<HTMLElement>('[data-depth]').forEach((layer) => {
            const d = Number(layer.dataset.depth || 0) * strength
            gsap.fromTo(layer,
              { y: isHero ? 0 : -d * 0.5 },
              {
                y: isHero ? d : d * 0.5,
                ease: 'none',
                scrollTrigger: {
                  trigger: scene,
                  start: isHero ? 'top top' : 'top bottom',
                  end: 'bottom top',
                  scrub: 0.6
                }
              })
          })
        })
      },
      root
    )

    // Fonts/lazy images shift layout; re-measure triggers.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }

  function cleanup() {
    mm?.revert()
  }

  return { init, cleanup }
}
