export class PresentationSlides extends HTMLElement {
  constructor() {
    super()
    
    const root = this.attachShadow({mode: "open"})
    const slot = document.createElement("slot")
    slot.style.display = "none"

    root.appendChild(slot)
  }

  getSlides() {
    const title = this.getAttribute("title") ?? "No Title"
    const slides = Array.from(this.children)
    slides.title = title

    return slides
  }
}

customElements.define("presentation-slides", PresentationSlides)



export class SlideBase extends HTMLElement {
  constructor() {
    super()

    this.root = this.attachShadow({mode: "open"})

    this.base = document.createElement("section")
    this.base.style.width = "100%"
    this.base.style.height = "100%"
    this.base.style.display = "flex"
    this.base.style.flexDirection = "column"
    this.base.style.justifyContent = "center"
    this.base.style.alignItems = "center"
    this.base.style.fontSize = "1.5em"

    const slot = document.createElement("slot")

    this.slot = slot

    this.root
      .appendChild(this.base)
      .appendChild(slot)
  }

  set numbered(value) {
    this.setAttribute("numbered", String(value))
  }

  get numbered() {
    return Boolean(this.getAttribute("numbered") ?? true)
  }

  addSlideNumber(number) {
    if (this.numbered && isFinite(number)) {
      const span = document.createElement("span")
      span.innerText = String(number)
      span.style.position = "absolute"
      span.style.bottom = "1em"
      span.style.margin = "auto"

      this.base.appendChild(span)
    }

    return this
  }
}

customElements.define("slide-base", SlideBase)



export class TitleSlide extends HTMLElement {
  constructor() {
    super()
    
    const root = this.attachShadow({mode: "open"})

    const base = new SlideBase()
    base.numbered = true

    const heading = document.createElement("h1")
    heading.style.fontSize = "3em"

    const slot = document.createElement("slot")

    root
      .appendChild(base)
      .appendChild(heading)
      .appendChild(slot)
  }
}

customElements.define("title-slide", TitleSlide)



export class PaddedSlide extends SlideBase {
  constructor() {
    super()

    this.base.style.boxSizing = "border-box"
    this.base.style.padding = "3em"
  }
}

customElements.define("padded-slide", PaddedSlide)



// export class NAME extends HTMLElement {
//   constructor() {
//     super()

//     const root = this.attachShadow({mode: "open"})
//   }
// }

// customElements.define("name-name", NAME)
