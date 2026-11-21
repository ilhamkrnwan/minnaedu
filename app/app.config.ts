export default defineAppConfig({
  ui: {
    colors: {
      primary: 'minna-ink',
      secondary: 'minna-green',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'font-semibold cursor-pointer'
      }
    },
    accordion: {
      slots: {
        trigger: 'py-5 text-base font-semibold text-ink cursor-pointer',
        body: 'pb-5 text-base leading-relaxed text-ink-muted'
      }
    }
  }
})
