# Presenter JS

## 🦧 What it does

It displays minimalistic presentations (like MS PowerPoint).

## 🕹 How to use it

```
<slide-set>
...
</slide-set>

<script>
import load, { themes } from "../lib/present.js"

const slideSet = document.querySelector("slide-set")
const { start } = load(slideSet, themes.dark)

const { error, stop } = start()

if (error)
  console.error(error)
</script>
```

The call to the `start` function will spin up a new browser popup window which displays the presentation.
Navigation is available via the arrow keys (right or down for next slide left or up for previous slide).
Escape closes the popup window and thereby stops the presentation.

For a deeper dive, have a look at the `./index.html`.
