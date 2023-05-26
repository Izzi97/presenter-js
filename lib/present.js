import { toFullscreen } from "./document.js"
import { SlideSet } from "./templates.js"

export const themes = {
  light: {
    color: "black",
    backgroundColor: "white"
  },
  dark: {
    color: "rgb(255, 255, 255, 0.87)",
    backgroundColor: "#121212"
  }
}

const makeStart = (slideSet, theme) => anchor => {
  if (!(slideSet instanceof SlideSet))
    return { error: new Error("invalid slide-set provided") }

  if(!slideSet.hasChildNodes())
    return { error: new Error("empty slide-set provided") }
  
  if (!(theme instanceof Object))
    return { error: new Error("invalid theme provided") }
  
  anchor = !(anchor instanceof HTMLElement)
    ? toFullscreen(document).body
    : anchor

  const slides = Array.from(slideSet.children)
  slides.forEach((slide, index) => {
    slide?.addSlideNumber?.(index)
    slide?.applyTheme?.(theme)
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

const load = (slideSet, theme) => {
  return {
    start: makeStart(slideSet, theme)
  }
}

export default load
