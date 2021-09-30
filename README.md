## cartographer-types

Type declarations of [cartographer](https://github.com/tesselode/cartographer), a small library for loading, reading, and drawing Tiled maps in LÖVE.

**NOTE: This Declaration is Designed to be used with [TypeScriptToLua](https://typescripttolua.github.io), Not Common Typescript**

| Command | Description |
|-|-|
|`yarn add -D cartographer-types`| Install this declaration |
|`yarn add tesselode/cartographer`| Install cartographer |

Upon installation this declaration package can be linked to a *tsconfig.json* file.

```json
{
    "compilerOptions": {
        "types": [
            "cartographer-types"
        ]
    }
}
```

And used anywhere like this:

```typescript
import * as cartographer from "cartographer"

let map = cartographer.load("path/to/my/map.lua")

love.update = (dt) => {
    map.update(dt)
}

love.draw = () => {
    map.draw()
}
```

Make sure to append ";./node_modules/?/?.lua" to your package.path to assist where Lua looks for modules. (for love2d you will need to do this with [`love.filesystem.setRequirePath`](https://love2d.org/wiki/love.filesystem.setRequirePath))

```typescript
package.path += ";./node_modules/?/?.lua"

// ... or in love2d (main.ts, conf.ts won't work):

love.filesystem.setRequirePath(love.filesystem.getRequirePath() + ";node_modules/?/?.lua")
```
