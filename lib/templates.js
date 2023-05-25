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

    const shadow = this.attachShadow({ mode: "open" })

    this.base = document.createElement("section")
    this.base.style.width = "100%"
    this.base.style.height = "100%"
    this.base.style.display = "flex"
    this.base.style.flexDirection = "column"
    this.base.style.justifyContent = "center"
    this.base.style.alignItems = "center"
    this.base.style.fontSize = "1.5em"

    shadow.appendChild(this.base)
  }

  set numbered(value) {
    this.setAttribute("numbered", String(Boolean(value)))
  }

  numberingDefault = true

  get numbered() {
    return Boolean(this.getAttribute("numbered") ?? this.numberingDefault)
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



export class JustText extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: "open" })

    const slot = document.createElement("slot")

    shadow.appendChild(slot)
  }

  get text () {
    return this.shadowRoot?.firstChild?.textContent ?? ""
  }
}

customElements.define("just-text", JustText)



export class TitleSlide extends SlideBase {
  constructor() {
    super()
    
    this.numberingDefault = false

    const heading = document.createElement("h1")
    heading.style.fontSize = "3em"

    const slot = document.createElement("slot")

    this.base
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

    const slot = document.createElement("slot")

    this.base.appendChild(slot)
  }
}

customElements.define("padded-slide", PaddedSlide)



export class HeadedSlide extends PaddedSlide {
  constructor() {
    super()

    this.base.removeChild(this.base.firstChild)
    this.base.style.justifyContent = "start"

    const heading = document.createElement("h1")
    heading.style.marginTop = "0"
    heading.style.alignSelf = "start"

    const headingSlot = document.createElement("slot")
    headingSlot.name = "heading"

    heading.appendChild(headingSlot)

    const content = document.createElement("div")
    content.style.flex = "auto"
    content.style.display = "flex"
    content.style.justifyContent = "center"
    content.style.alignItems = "center"
  
    const contentSlot = document.createElement("slot")
    contentSlot.name = "content"

    content.appendChild(contentSlot)

    this.base.append(heading, content)
  }
}

customElements.define("headed-slide", HeadedSlide)
