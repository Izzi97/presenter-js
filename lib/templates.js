export class SlideSet extends HTMLElement {
  constructor() {
    super()
    
    this.style.display = "none"
    this.style.position = "absolute"
    this.style.width = "100%"
    this.style.height = "100%"

    const root = this.attachShadow({mode: "open"})
    const slot = document.createElement("slot")

    root.appendChild(slot)
  }

  show() {
    this.style.display = "block"
  }

  hide() {
    this.style.display = "none"
  }
}

customElements.define("slide-set", SlideSet)



export class Slide extends HTMLElement {
  constructor() {
    super()

    this.style.width = "100%"
    this.style.height = "100%"

    const shadow = this.attachShadow({ mode: "open" })

    const base = document.createElement("section")
    base.style.width = "100%"
    base.style.height = "100%"
    base.style.position = "relative"
    base.style.display = "flex"
    base.style.flexDirection = "column"
    base.style.justifyContent = "center"
    base.style.alignItems = "center"
    base.style.boxSizing = "border-box"
    base.style.padding = "3em"
    base.style.fontSize = "1.5em"

    this.base = shadow.appendChild(base)
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

  show() {
    this.style.display = "flex"
  }

  hide() {
    this.style.display = "none"
  }
}

customElements.define("base-slide", Slide)



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



export class SimpleSlide extends Slide {
  constructor() {
    super()

    const slot = document.createElement("slot")

    this.base.appendChild(slot)
  }
}

customElements.define("simple-slide", SimpleSlide)



export class TitleSlide extends Slide {
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



export class HeadedSlide extends Slide {
  constructor() {
    super()

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
