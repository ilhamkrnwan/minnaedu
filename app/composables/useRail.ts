// Arrow buttons for a native scroll-snap row: step one card, disable at the ends.
export function useRail() {
  const track = ref<HTMLElement | null>(null)
  const atStart = ref(true)
  const atEnd = ref(false)

  const sync = () => {
    const el = track.value
    if (!el) return
    atStart.value = el.scrollLeft < 4
    atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
  }

  const step = (dir: 1 | -1) => {
    const el = track.value
    if (!el) return
    const card = (el.firstElementChild?.getBoundingClientRect().width || 300) + 16
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * card, behavior: smooth ? 'smooth' : 'auto' })
  }

  onMounted(() => {
    sync()
    track.value?.addEventListener('scroll', sync, { passive: true })
    addEventListener('resize', sync)
  })
  onUnmounted(() => removeEventListener('resize', sync))

  return { track, atStart, atEnd, prev: () => step(-1), next: () => step(1) }
}
