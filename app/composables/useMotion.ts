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

    const context = gsap.matchMedia()
    mm = context
    context.add(
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
        rise('.teacher-card', 32, 0.1)
        rise('.rail-track > li', 32, 0.1)
        rise('.cta-copy > p, .cta-actions, .faq-contact, .faq-list details', 20, 0.08)

        if (!full) {
          rise('.scene:not(.hero-art) [data-depth]', 0, 0)
          return
        }

        // Hero entrance: headline lines unmask, marker underline draws, art layers settle in.
        const h1 = root.querySelector<HTMLElement>('.hero h1')
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        if (h1) {
          SplitText.create(h1, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
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
            linesClass: 'split-line',
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

        // Scene layer entrances on scroll: layers reveal one-by-one (staggered back to front) like hero.
        $$('.scene:not(.hero-art)').forEach((scene) => {
          const layers = scene.querySelectorAll<HTMLElement>('[data-depth]')
          if (!layers.length) return

          const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })

          layers.forEach((layer, idx) => {
            const isBack = idx === 0
            const isDetail = idx === layers.length - 1 && layers.length > 3
            const isLeft = idx === 2 && layers.length === 4
            const isRight = idx === 3 && layers.length === 4

            let initXPercent = 0
            let initYPercent = 12
            let initScale = 0.94
            let dur = 1.1

            if (isBack) {
              initScale = 0.92
              initYPercent = 6
              dur = 1.2
            } else if (isDetail) {
              initScale = 0.72
              initYPercent = 8
              dur = 1.0
            } else if (isLeft) {
              initXPercent = -8
              initYPercent = 10
              initScale = 0.95
              dur = 1.05
            } else if (isRight) {
              initXPercent = 8
              initYPercent = 10
              initScale = 0.95
              dur = 1.05
            }

            gsap.set(layer, {
              opacity: 0,
              scale: initScale,
              yPercent: initYPercent,
              xPercent: initXPercent
            })

            tl.to(
              layer,
              {
                opacity: 1,
                scale: 1,
                yPercent: 0,
                xPercent: 0,
                duration: dur
              },
              idx * 0.18
            )
          })

          // A standalone trigger avoids a deferred timeline refresh during parallax setup.
          ScrollTrigger.create({
            trigger: scene,
            start: 'top 85%',
            once: true,
            onEnter: () => { tl.play() }
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
    document.fonts?.ready.then(() => {
      if (mm === context) ScrollTrigger.refresh()
    })
  }

  function cleanup() {
    const context = mm
    mm = undefined
    context?.revert()
  }

  return { init, cleanup }
}
