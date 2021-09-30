/// <reference path="./CartographerLayer.d.ts"/>

/** Interface of Cartographer Map */
interface ICartographerMap {
    /**
     * Get the tileset that has the tile with the given global ID if it exists
     * @param gid The global ID of the tile
     */
    getTileset(gid: number): import("tiled-types/types").TiledTileset | undefined

    /**
     * Get a tile with the given global ID if it exists
     * @param gid The global ID of the tile
     */
    getTile(gid: number): import("tiled-types/types").TiledTile | undefined

    /**
     * Get the type of a tile if it exists
     * @param gid The global ID of the tile
     */
    getTileType(gid: number): string | undefined

    /**
     * Get the value of a property of a tile if it exists
     * @param gid The global ID of the tile
     * @param property_name The name of the property
     */
    getTileProperty(gid: number, property_name: string): string | number | boolean | undefined

    /**
     * Set the value of a tile property if it exists
     * @param gid The global ID of the tile
     * @param property_name The name of the property
     * @param property_value The value to set the property to
     */
    setTileProperty(gid: number, property_name: string, property_value: string | number | boolean): void

    /**
     * Get a layer by name, it can get nested layers
     * @param vargs The name(s) of the layers to get
     * @returns The last one of `vargs`, if there's any name could not match the layer, then `undefined` will be returned
     */
    getLayer(...vargs: string[]): CartographerLayer | undefined

    /**
     * Update all animations in the map
     * @param dt Delta Time
     */
    update(dt: number): void

    /** Draw the solid color background of the map */
    drawBackground(): void

    /** Draw the map */
    draw(): void
}

/**
 * Cartographer Map
 * @description Since isometic and hexagonal maps are not supported yet, the map types will only extends `TiledMapOrthogonal` or `TiledMapStaggered`
 */
type CartographerMap = (ICartographerMap & import("tiled-types/types").TiledMapOrthogonal) | (ICartographerMap & import("tiled-types/types").TiledMapStaggered)
