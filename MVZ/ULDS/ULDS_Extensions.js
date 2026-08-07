//=============================================================================
// ULDS_Extensions.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 无限图层显示系统 - 扩展
 * @author Rose_shadows
 * @target MV MZ
 * @orderAfter ULDS
 * @help
 * === 介绍 ===
 * 
 * 本插件扩展了 ULDS.js 插件的功能：
 * 1. 设置全局ULDS图层，可在所有地图显示，无需复制粘贴注释；
 * 2. 添加“frame”参数，允许开发人员截取某张图中的一部分用作图片的图像。
 * 具体参见“使用方法”。
 * 
 * ！注意！请将该插件放到紧邻 ULDS.js 插件之下的位置。否则无效果。
 * 即，在插件管理器中，本插件必须为 ULDS.js 的下一个插件。
 * 
 * 
 * === 使用方法 ===
 * 
 * 1. 全局ULDS图层
 * 
 *    在插件参数“全局ULDS图层设置”中，可以像写地图注释一样写出ULDS图层注释。
 *    这些图层会默认在所有地图上显示。
 *    如果希望在某张地图上隐藏所有全局ULDS图层，在地图备注栏中这样写即可：
 *      <Ignore ULDS Global>
 * 
 * 2. “frame”参数
 * 
 *    添加了新功能，允许开发人员截取一张图中的一部分用作图片的图像。
 *    这样就可以把许多小摆件整合到同一张图片上调取。
 * 
 *    在注释中添加如下参数：
 * 
 *    "frame": "{x: x坐标, y: y坐标, w: 宽度, h: 高度}"
 * 
 *    x坐标、y坐标、宽度、高度的单位均为*像素*。
 *    (x坐标, y坐标) 是开始截取图片的位置坐标。
 *    宽度和高度指的是要截取的图像的宽高。
 *    例如：
 * 
 * <ulds> {
 *     "name": "Inside_C",
 *     "path": "tilesets",
 *     "x": "this.rx(100)",
 *     "y": "this.ry(50)",
 *     "z": 4,
 *     "frame": "{x: 240, y: 240, w: 48, h: 48}"
 * } </ulds>
 *    - 在地图中使用位于 img/tilesets/ 中的 Inside_C.png 图像作为源图像。
 *      以源图像左上角为原点，从 (240, 240) 处截取宽高各为 48 的图像用作要
 *      显示的部分，并将图片放在相对于地图 (100, 50) 的位置处。
 *      该图片Z层级是4。
 * 
 *    这样，地图上就会出现一盘炒饭。
 * 
 *    如果小摆件的尺寸和摆放方式、源图像的大小恰好和图块组中B、C、D、E类型图块图片
 *    一模一样，那么 frame 参数的值也可以这样写：
 * 
 *    "frame": "{tx: x坐标, ty: y坐标, tw: 宽度, th: 高度}"
 * 
 *    此时：
 *    x坐标 - 截取部分最左上角的图块是从左往右数第几块图块。
 *    y坐标 - 截取部分最左上角的图块是从上往下数第几块图块。
 *    宽度 - 截取部分的宽度相当于几块图块。省略时默认为 1。
 *    高度 - 截取部分的高度相当于几块图块。省略时默认为 1。
 *    例如：
 * 
 * <ulds> {
 *     "name": "Inside_C",
 *     "path": "tilesets",
 *     "x": "this.rx(100)",
 *     "y": "this.ry(50)",
 *     "z": 4,
 *     "frame": "{tx: 6, ty: 6}"
 * } </ulds>
 *    - 效果同上一个注释。地图上会出现一盘炒饭。
 * 
 * <ulds> {
 *     "name": "Inside_C",
 *     "path": "tilesets",
 *     "x": "this.rx(100)",
 *     "y": "this.ry(50)",
 *     "z": 4,
 *     "frame": "{tx: 13, ty: 6, tw: 1, th: 2}"
 * } </ulds>
 *    - 地图上会出现一尊士兵雕像。
 * 
 *    注意，经实测，"frame"参数对"loop"参数为true的图片无效。
 * 
 * 
 *    == 更多实例 ==
 * 
 *    1) 动态帧图层 [1张*从左到右*摆放动画帧图片, 1条注释]
 * 
 *    假设图层相对于地图位于(144, 144)，使用 Water_Animated.png 作为图像，
 *    图片中动画共有3帧，每帧间隔20帧 (1/3秒)，
 *    图片动画帧*从左到右*摆放，且要*循环播放*，
 *    则创建以以下格式书写的地图注释：
 * <ulds>{
 *     "name": "Water_Animated",
 *     "x": "this.rx(144)",
 *     "y": "this.ry(144)",
 *     "z": 1,
 *     "frame": "{y: 0, w: 96, h: 96, x: (function(){var frameCount = 3; var frameInverval = 20; var size = 96; var isCharAnime = false; var result=0;var f=Math.floor(t/frameInverval);var realFrameCount=isCharAnime?(frameCount-1)*2:frameCount;var currentFrameUnderTurn=Math.floor(f%realFrameCount);if(isCharAnime){if(currentFrameUnderTurn<frameCount){result=currentFrameUnderTurn*size;}else{result=(realFrameCount-currentFrameUnderTurn)*size;}}else{result=currentFrameUnderTurn*size;}return result;})()}"
 * }</ulds>
 *     在这个例子中，w 和 h 分别为一帧动画的宽高，
 *     frameCount 指的是图片中包含几帧动画，frameInverval 是帧间隔。
 *     size 则应该等于 w，即一帧动画的宽度。
 * 
 *     isCharAnime 控制播放方式。
 *     当图片中的动画帧这样摆放：[1][2][3]
 *     如果将 isCharAnime 设为 false (如上例)，那么播放方式为：
 *     > [1][2][3][1][2][3][1][2]...
 *     如果将 isCharAnime 设为 true，播放方式则为：
 *     > [1][2][3][2][1][2][3][2][1][2]...
 * 
 *     ※ 同样的例子，
 *     如果动画图片中的动画帧是*从上到下*摆放的，
 *     那么将 frame 参数中的 y 和 x 的位置交换就可以了。
 *     即：
 *     "frame": "{x: 0, w: 96, h: 96, y: (function(){var frameCount = 3; var frameInverval = 20; var size = 96; var isCharAnime = false; var result=0;var f=Math.floor(t/frameInverval);var realFrameCount=isCharAnime?(frameCount-1)*2:frameCount;var currentFrameUnderTurn=Math.floor(f%realFrameCount);if(isCharAnime){if(currentFrameUnderTurn<frameCount){result=currentFrameUnderTurn*size;}else{result=(realFrameCount-currentFrameUnderTurn)*size;}}else{result=currentFrameUnderTurn*size;}return result;})()}"
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT License
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 
 * @param Global Layers Note
 * @text 全局ULDS图层设置
 * @type note
 * @desc 设置应用于所有地图的ULDS图层。在这里写 ULDS 注释。可使用忽略标签以防图层显示在特定地图中。详见插件帮助。
 * @default ""
 */
var Imported = Imported || {};
Imported.ULDS_Extensions = true;

var RSSD = RSSD || {};
RSSD.ULDS_E = {};
RSSD.ULDS_E.pluginName = 'ULDS_Extensions';

RSSD.ULDS_E.ULDS_pluginName = 'ULDS';
RSSD.ULDS_E.ULDS_parameters = PluginManager.parameters(RSSD.ULDS_E.ULDS_pluginName);
RSSD.ULDS_E.ULDS_RE = /<ulds>([^]*?)<\/ulds>/ig;

RSSD.ULDS_E.parameters = PluginManager.parameters(RSSD.ULDS_E.pluginName);
RSSD.ULDS_E.globalLayersNote = JSON.parse(RSSD.ULDS_E.parameters['Global Layers Note'] || "\n");
RSSD.ULDS_E.ignoreGlobalLayers_RE = /<Ignore ULDS Global>/ig;

RSSD.ULDS_E.isProperlyInstalled = (()=>{
    const index_ULDS = $plugins.findIndex(p => p.name === RSSD.ULDS_E.ULDS_pluginName);
    const index_Addons = $plugins.findIndex(p => p.name === RSSD.ULDS_E.pluginName);
    if(index_ULDS > 0 && index_Addons - index_ULDS === 1) return true;
    else if(index_ULDS === -1) console.error(`Cannot find ${RSSD.ULDS_E.ULDS_pluginName}.js for ${RSSD.ULDS_E.pluginName}.js.`);
    else if(index_Addons - index_ULDS !== 1) console.error(`${RSSD.ULDS_E.pluginName}.js must be the very next plugin installed after ${RSSD.ULDS_E.ULDS_pluginName}.js.`)
    return false;
})();

RSSD.ULDS_E.ULDS_Sprite_Constructor = null;       // the constructor of ULDS.Sprite
RSSD.ULDS_E.ULDS_TilingSprite_Constructor = null; // the constructor of ULDS.TilingSprite

RSSD.ULDS_E.uldsSettingsMatchCount = function(str) {
    const re = RSSD.ULDS_E.ULDS_RE;
    const matches = str.match(re);
    return matches ? matches.length : 0;
};

if(RSSD.ULDS_E.isProperlyInstalled) {

    let __ULDS_E_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        this.__private_ULDS_E_manipulateMapNote();
        this.__private_ULDS_E_manipulateULDSSpriteClass();
        this.__private_ULDS_E_reviveMapNote();
    };

    Spriteset_Map.prototype.__private_ULDS_E_manipulateMapNote = function() {
        const isGlobalLayersHidden = RSSD.ULDS_E.ignoreGlobalLayers_RE.test($dataMap.note);
        if(!isGlobalLayersHidden) {
            const note = RSSD.ULDS_E.globalLayersNote;
            $dataMap.note = note + $dataMap.note;
            __ULDS_E_Spriteset_Map_createTilemap.call(this);
        } else {
            __ULDS_E_Spriteset_Map_createTilemap.call(this);
        }
    };

    Spriteset_Map.prototype.__private_ULDS_E_manipulateULDSSpriteClass = function() {
        const uldsSpriteCount = RSSD.ULDS_E.uldsSettingsMatchCount($dataMap.note);
        if(uldsSpriteCount !== 0) {
            const uldsSprites = this._tilemap.children.slice(-uldsSpriteCount);
            for(let i = 0; i < uldsSprites.length; i++) {
                const sprite = uldsSprites[i];
                const constructor = sprite.constructor;
                if(sprite instanceof TilingSprite) {
                    // Catch the constructor of ULDS.TillingSprite
                    if(!RSSD.ULDS_E.ULDS_TilingSprite_Constructor) {
                        this.__private_ULDS_E_initializeULDSTilingSprite(constructor);
                    }
                } else {
                    // ULDS.Sprite
                    if(!RSSD.ULDS_E.ULDS_Sprite_Constructor) {
                        this.__private_ULDS_E_initializeULDSSprite(constructor);
                    }
                }
                if(RSSD.ULDS_E.ULDS_TilingSprite_Constructor && RSSD.ULDS_E.ULDS_Sprite_Constructor) {
                    break;
                }
            };
        }
    };

    Spriteset_Map.prototype.__private_ULDS_E_reviveMapNote = function() {
        const note = RSSD.ULDS_E.globalLayersNote;
        $dataMap.note = $dataMap.note.replace(note, '');
    };

    Spriteset_Map.prototype.__private_ULDS_E_initializeULDSTilingSprite = function(constructor) {
        RSSD.ULDS_E.ULDS_TilingSprite_Constructor = constructor;
        this.__private_defineFrameToSprite(constructor);
    };

    Spriteset_Map.prototype.__private_ULDS_E_initializeULDSSprite = function(constructor) {
        RSSD.ULDS_E.ULDS_Sprite_Constructor = constructor;
        this.__private_defineFrameToSprite(constructor);
    };

    /**
     * Allows you to use just a part of the image source
     * in case you have too many doodads and you don't want to use them as seperated image files.
     */
    Spriteset_Map.prototype.__private_defineFrameToSprite = function(constructor) {
        /**
         * The property for ULDS.Sprite frame.
         *
         * @type object
         * @name ULDS.Sprite#frame
         */
        Object.defineProperty(constructor.prototype, "frame", {
            "get": function() {
                return this._frame;
            },
            "set": function(params) {
                // params: {tx: tile_x, ty: tile_y, tw: tile_width, th: tile_height}
                // params: {x: x, y: y, w: width, h: height}
                var frame = this._frame;
                if(params instanceof Object) {
                    if(params.tx !== undefined) {
                        // in tileSizes
                        var tileWidth = $gameMap.tileWidth();
                        var tileHeight = $gameMap.tileHeight();
                        var x = (+params.tx - 1) * tileWidth;
                        var y = (+params.ty - 1) * tileHeight;
                        var w = (+(params.tw || "1")) * tileWidth;
                        var h = (+(params.th || "1")) * tileHeight;
                        if(frame.x !== x || frame.y !== y || frame.width !== w || frame.height !== h) {
                            this._frame.x = x;
                            this._frame.y = y;
                            this._frame.width = w;
                            this._frame.height = h;
                            this._refresh();
                        }
                    } else {
                        // in pixels
                        if(frame.x !== params.x || frame.y !== params.y || frame.width !== params.w || frame.height !== params.h) {
                            this._frame.x = +params.x;
                            this._frame.y = +params.y;
                            this._frame.width = +params.w;
                            this._frame.height = +params.h;
                            this._refresh();
                        }
                    }
                } else {
                    throw new Error('The property of ULDS Sprite "frame" should be an object.')
                }
            },
            configurable: true
        });
    };
}
