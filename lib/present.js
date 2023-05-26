import { SlideSet } from "./templates.js"

const makeStart = (slideSet) => anchor => {
  if (!(slideSet instanceof SlideSet))
    return new Error("invalid slide-set provided")

  if(!slideSet.hasChildNodes())
    return new Error("empty slide-set provided")
  
  anchor = !(anchor instanceof HTMLElement)
    ? document.body
    : anchor

  const slides = Array.from(slideSet.children)
  slides.forEach((slide, index) => {
    slide?.addSlideNumber?.(index)
  })

  let index

  const transition = (from, to) => {
    const toValidSlideIndex = index =>
      index < 0 
        ? 0 :
      index >= slides.length 
        ? slides.length - 1 
        : index
    
    from = toValidSlideIndex(from)
    to = toValidSlideIndex(to)

    slides[from]?.hide?.()
    slides[to].show()
    
    return to
  }

  const handleKeyboardInput = event => {
    switch(event.key) {
      case "ArrowRight":
      case "ArrowDown":
        index = transition(index, index + 1)
        break
      case "ArrowLeft":
      case "ArrowUp":
        index = transition(index, index - 1)
        break
      case "Escape":
        stop()
    }
  }

  anchor.addEventListener("keydown", handleKeyboardInput)

  const stop = () => {
    slideSet.hide()

    anchor.removeEventListener("keydown", handleKeyboardInput)
    anchor.removeChild(slideSet)
  }

  anchor.appendChild(slideSet)
  slideSet.show()
  
  index = transition(undefined, 0)

  return { stop }
}

const load = (slideSet) => {
  return {
    start: makeStart(slideSet)
  }
}

export default load
