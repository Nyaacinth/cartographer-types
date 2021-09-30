/** To declare the base class for all layers */
interface ICartographerLayer {
    /**
     * Convert grid coordinates to pixel coordinates for this layer
     * @param grid_x The column to get the pixel coordinates
     * @param grid_y The row to get the pixel coordinates
     * @returns
     * ```text
     * x: The horizontal position of the grid cell in pixels
     * y: The vertical position of the grid cell in pixels
     * ```
     */
    gridToPixel(grid_x: number, grid_y: number): LuaMultiReturn<[x: number, y: number]>

    /**
     * Convert pixel coordinates for this layer to grid coordinates
     * @param x The horizontal position to get the grid cell
     * @param y The vertical position to get the grid cell
     * @returns
     * ```text
     * grid_x: The column of the grid cell
     * grid_y: The row of the grid cell
     * ```
     */
    pixelToGrid(x: number, y: number): LuaMultiReturn<[grid_x: number, grid_y: number]>
}

/** To declare the parent class for tile layers and object layers */
interface ICartographerSpriteLayer extends ICartographerLayer {
    /**
     * Update animations on the layer
     * @param dt Delta Time
     */
    update(dt: number): void

    /** Draw the layer */
    draw(): void
}

/** A layer that contains tiles placed on a grid */
interface ICartographerTileLayer extends ICartographerSpriteLayer {
    /**
     * Get the bounds of the layer in tiles
     * @returns
     * ```text
     * left: the left bound of the layer
     * top: the top bound of the layer
     * right: the right bound of the layer
     * bottom: the bottom bound of the layer
     * ```
     */
    getGridBounds(): LuaMultiReturn<[left: number, top: number, right: number, bottom: number]>

    /**
     * Get the bounds of the layer in pixels
     * @returns
     * ```text
     * left: the left bound of the layer
     * top: the top bound of the layer
     * right: the right bound of the layer
     * bottom: the bottom bound of the layer
     * ```
     */
    getPixelBounds(): LuaMultiReturn<[left: number, top: number, right: number, bottom: number]>

    /**
     * Get the tile at the given grid position
     * @param x T column to get the tile
     * @param y The row to get the tile
     * @returns The global ID of the tile at the given grid position, or false if the tile is empty
     */
    getTileAtGridPosition(x: number, y: number): number | false

    /**
     * Set the tile at the given grid position
     * @param x The column to set the tile
     * @param y The row to set the tile
     * @param gid The global ID of the tile
     */
    setTileAtGridPosition(x: number, y: number, gid: number): void

    /**
     * Get the tile at the given pixel position
     * @param x The horizontal position to get the tile
     * @param y The vertical position to get the tile
     * @returns The global ID of the tile at the given grid position, or false if the tile is empty
     */
    getTileAtPixelPosition(x: number, y: number): number | false

    /**
     * Set the tile at the given pixel position
     * @param x The horizontal position to set the tile
     * @param y The vertical position to get the tile
     * @param gid The global ID of the tile
     */
    setTileAtPixelPosition(x: number, y: number, gid: number): void

    /**
     * Return an iterator over all the tiles in this layer
     * @description The iterator returns following values
     * ```text
     * index: The index of the tile
     * gid: The global ID of the tile
     * grid_x: The x position of the tile in grid cells
     * grid_y: The y position of the tile in grid cells
     * x: the x Position of the tile in pixels
     * y: the y Position of the tile in pixels
     * ```
     */
    getTiles(): LuaIterable<LuaMultiReturn<[index: number, gid: number, grid_x: number, grid_y: number, x: number, y: number]>>
}

/** A layer that displays a single image */
interface ICartographerImageLayer extends ICartographerLayer {
    /** Draw the layer */
    draw(): void
}

/** A layer that contains other layers */
interface ICartographerGroup extends ICartographerLayer {
    /**
     * Get a layer by name, it can get nested layers
     * @param vargs The name(s) of the layers to get
     * @returns The last one of `vargs`, if there's any name could not match the layer, then `undefined` will be returned
     */
    getLayer(...vargs: string[]): CartographerLayer | undefined

    /**
     * Update animations in all child layers
     * @param dt Delta Time
     */
    update(dt: number): void

    /** Draw the layer */
    draw(): void
}

/** Cartographer Layer Types, check before use them! */
type CartographerLayer =
    (ICartographerSpriteLayer & import("tiled-types").TiledLayerObjectgroup) |
    (ICartographerTileLayer & import("tiled-types").TiledLayerTilelayer) |
    (ICartographerImageLayer & import("tiled-types").TiledLayerImagelayer) |
    (ICartographerGroup & import("tiled-types").TiledLayerGroup)
