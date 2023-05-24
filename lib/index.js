import { isArrayEmpty } from "./array.js"
import { toFullscreen } from "./document.js"

const makeStart = (slides = []) => root => {
  if(!Array.isArray(slides) || isArrayEmpty(slides))
    return new Error("no slides provided")

  const { title = "No Title" } = slides
  slides = slides.map((slide, index) => slide?.addSlideNumber?.(index) ?? slide)

  let popup
  if (!root) {
    popup = window.open(undefined, "presentation", "popup")

    if (!popup)
      return new Error("popup creation failed")

    toFullscreen(popup.document)

    root = popup.document.body
  }

  root.ownerDocument.title = title

  const container = document.createElement("section")
  container.style.width = "100%"
  container.style.height = "100%"
  
  root.appendChild(container)

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

    if (container.contains(slides[from]))
      container.removeChild(slides[from])

    container.appendChild(slides[to])
    
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

  root.addEventListener("keydown", handleKeyboardInput)

  index = transition(undefined, 0)

  const stop = () => {
    root.removeEventListener("keydown", handleKeyboardInput)

    if (popup)
      popup.close()
    else 
      container.remove()
  }

  return { stop }
}

const load = (slides = []) => {
  return {
    start: makeStart(slides)
  }
}

export default load
