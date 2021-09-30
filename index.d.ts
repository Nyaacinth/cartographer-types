/// <reference path="./CartographerMap.d.ts"/>

/** @noResolution */
declare module "cartographer" {
    /**
     * Cartographer
     * @description A small library for loading, reading, and drawing Tiled maps in LÖVE. Come with various utilities to make parsing Tiled maps easier
     * @link https://github.com/tesselode/cartographer
     * @version 2.2
     * @author tesselode
     * @license MIT
     */
    namespace cartographer {
        /**
         * Load a Tiled map from an exported Lua file
         * @param path Path to the lua file
         * @noSelf
         */
        function load(path: string): CartographerMap
    }

    export = cartographer
}
