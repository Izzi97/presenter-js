# Presenter JS

## 🦧 What it does

It displays minimalistic presentations (like MS PowerPoint).

## 🕹 How to use it

```
import load from "../lib/index.js"

const slides = ...
// acquire an array of DOM-elements to be displayed as slides

const { start } = load(slides)

const { error } = start()

if (error)
  console.error(error)

```

The call to the `start` function will spin up a new browser popup window which displays the presentation.
Navigation is available via the arrow keys (right or down for next slide left or up for previous slide).
Escape closes the popup window and thereby stops the presentation.

For a deeper dive, have a look at the `./demo/` directory.
