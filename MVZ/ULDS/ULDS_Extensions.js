//=============================================================================
// ULDS_Extensions.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.0 - 无限图层显示系统 - 扩展
 * @author Rose_shadows
 * @target MV MZ
 * @orderAfter ULDS
 * @help
 * -------------------------------------------------------------------
 * === 介绍 ===
 * 
 * 本插件扩展了 ULDS.js 插件的功能：
 * 1. 设置全局ULDS图层，默认可在所有地图显示，无需复制粘贴注释；
 * 2. 预设ULDS图层，方便在多个地图上重复使用。
 * 
 * ！注意！请将该插件放到紧邻 ULDS.js 插件之下的位置。否则无效果。
 * 即，在插件管理器中，本插件必须为 ULDS.js 的下一个插件。
 * 
 * 
 * -------------------------------------------------------------------
 * === 兼容性 ===
 * 
 * RMMV：1.6.0+
 * RMMZ：1.0.1+
 * 
 * 
 * -------------------------------------------------------------------
 * === 使用方法 ===
 * 
 * 
 * ---------------------------------
 * 1. 全局ULDS图层
 * 
 *    在插件参数“全局ULDS图层设置”中，可以像写地图注释一样写出ULDS图层注释。
 *    这些图层会默认在所有地图上显示。
 *    如果希望在某张地图上隐藏所有全局ULDS图层，在地图备注栏中这样写即可：
 * 
 *      <Ignore ULDS Global>
 * 
 * 
 * ---------------------------------
 * 2. 预设ULDS图层
 * 
 *    在插件参数“预设ULDS图层列表”中，可以预设ULDS图层注释，方便统一管理，
 *    有了这个功能，就可以很方便地做出跨地图通用的昼夜照明、环境光效等效果。
 * 
 *    要使用预设ULDS图层，在地图备注栏中写如下标签即可：
 * 
 *      <ULDS Preset: [KEY]>
 * 
 *    [KEY] 是插件参数中设置的关键字，大小写不敏感。
 *    这样，该地图就会应用对应的预设图层注释。
 *    注：每个预设可包括不止一条图层注释。
 * 
 * 
 *    预设图层还支持 RM 专用的占位符。
 * 
 *    在地图备注栏中这样写标签：
 * 
 *      <ULDS Preset: [KEY], [PARAM_1], [PARAM_2], ...>
 * 
 *    各项 [PARAM] 会按顺序替换预设图层注释中出现的 %1，%2，... 占位符。
 *    [PARAM] 可以是数字，可以是文本，也可以是代码（例如 s.value(8) 等）。
 * 
 *    例如，如果预设图层的关键字是test，图层注释包括：
 * 
 * // 图层1：
 * <ulds>{
 *     "name": "图片_1",
 *     "x": 0,
 *     "y": 0,
 *     "z": 5,
 *     "visible": "s.value(%1)",
 *     "opacity": "v.value(%2)"
 * }<ulds>
 * // 图层2：
 * <ulds>{
 *     "name": "图片_2",
 *     "x": 0,
 *     "y": 0,
 *     "z": 5,
 *     "visible": "s.value(%3)",
 *     "opacity": "v.value(%4)"
 * }<ulds>
 * 
 *    而地图备注栏的标签这样写：
 * 
 *      <ULDS Preset: test, 10, 11, 12, 13>
 * 
 *    那么就相当于：
 *    开关#10 控制 图层1 的 visible，变量#11 控制 图层1 的 opacity；
 *    开关#12 控制 图层2 的 visible，变量#13 控制 图层2 的 opacity。
 * 
 * 
 *    由于该标签的工作原理只是在地图注释被应用前用预设的注释内容替换标签字符串，
 *    所以在插件参数的预设图层注释内容中可以写任何内容，
 *    包括上述两个标签，但要注意避免陷入死循环。
 * 
 * 
 * -------------------------------------------------------------------
 * === 使用条款 ===
 * 
 * MIT License
 * 
 * 
 * -------------------------------------------------------------------
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 
 * @param Global Layers Note
 * @text 全局ULDS图层设置
 * @type note
 * @desc 设置应用于所有地图的ULDS图层。在这里写 ULDS 注释。可使用忽略标签以防图层显示在特定地图中。详见插件帮助。
 * @default ""
 * 
 * @param Layers Presets
 * @text 预设ULDS图层列表
 * @type struct<lp>[]
 * @desc 在这里预设ULDS图层。方便重复使用。具体见插件帮助。
 * @default []
 */
/*~struct~lp:
 * 
 * @param Note
 * @text 备注
 * @desc 该图层注释的备注。方便管理。
 * @default 
 * 
 * @param Key
 * @text 关键字
 * @desc 该图层注释的关键字。相对于其他图层的关键字必须是独一无二的。不建议包含标点符号。详情见插件帮助。
 * @default 
 * 
 * @param Content
 * @text ULDS图层注释内容
 * @type note
 * @desc 在此书写ULDS图层设置。可以像写在地图备注栏里一样，写不止一条注释。
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

RSSD.ULDS_E.uldsPresets = {};
var temp_arr = JSON.parse(RSSD.ULDS_E.parameters['Layers Presets'] || '[]');
temp_arr.forEach(e => {
    const obj = JSON.parse(e);
    RSSD.ULDS_E.uldsPresets[obj.Key.toUpperCase()] = JSON.parse(obj.Content || "\n");
});
RSSD.ULDS_E.ULDS_Preset_RE = /<ULDS Preset:([^]*?)>/ig;

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
        __ULDS_E_Spriteset_Map_createTilemap.call(this);
        this.__private_ULDS_E_manipulateULDSSpriteClass();
        this.__private_ULDS_E_reviveMapNote();
    };

    Spriteset_Map.prototype.__private_ULDS_E_manipulateMapNote = function() {
        this.__private_ULDS_E_applyGlobalLayer();
        this.__private_ULDS_E_applyPresetLayers();
    };

    Spriteset_Map.prototype.__private_ULDS_E_applyGlobalLayer = function() {
        const isGlobalLayersHidden = RSSD.ULDS_E.ignoreGlobalLayers_RE.test($dataMap.note);
        if(!isGlobalLayersHidden) {
            const note = RSSD.ULDS_E.globalLayersNote;
            $dataMap.note = note + $dataMap.note;
        }
    };

    Spriteset_Map.prototype.__private_ULDS_E_applyPresetLayers = function() {
        $dataMap.note = $dataMap.note.replace(RSSD.ULDS_E.ULDS_Preset_RE, function(_match, value){
            const params = value.split(',').map(e => e.trim());
            const key = params.shift();
            k = key.toUpperCase();
            if(k && RSSD.ULDS_E.uldsPresets[k] !== undefined) {
                return RSSD.ULDS_E.uldsPresets[k].format(...params)+'\n';
            } else {
                if(!k) console.error("A ULDS Preset key is invalid. Please check the map note.");
                else console.error(`The ULDS Preset key "${key}" is invalid. Please check the map note.`);
            }
        });
    };

    Spriteset_Map.prototype.__private_ULDS_E_reviveMapNote = function() {
        const note = RSSD.ULDS_E.globalLayersNote;
        $dataMap.note = $dataMap.note.replace(note, '');
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

    Spriteset_Map.prototype.__private_ULDS_E_initializeULDSTilingSprite = function(constructor) {
        RSSD.ULDS_E.ULDS_TilingSprite_Constructor = constructor;
        // Feel free to extend more...
    };

    Spriteset_Map.prototype.__private_ULDS_E_initializeULDSSprite = function(constructor) {
        RSSD.ULDS_E.ULDS_Sprite_Constructor = constructor;
        // Feel free to extend more...
    };
}