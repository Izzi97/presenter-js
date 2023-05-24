export const toFullscreen = document => {
  const html = document.querySelector("html")
  html.style.width = "100%"
  html.style.height = "100%"
  html.style.margin = 0
  html.style.padding = 0

  const body = document.body
  body.style.width = "100%"
  body.style.height = "100%"
  body.style.margin = 0
  body.style.padding = 0
}
