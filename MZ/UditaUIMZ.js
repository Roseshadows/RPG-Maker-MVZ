//=============================================================================================
// UditaUIMZ.js
// Author: Rose_shadows
//=============================================================================================
/*:
 * @plugindesc 1.1.1 - Wolf RPG Editor 的 UI
 * @author 离影玫 | Rose_shadows
 * @target MZ
 * @help 
 * === 介绍 ===
 * 
 * 
 * 该插件允许你在 RMMZ 中使用 Wolf RPG Editor (Udita) 格式的窗口皮肤、选择光标
 * 和对话暂停光标。
 * 
 * 窗口皮肤和选择光标的图像选用九宫格切片方式。
 * 九宫格切片（9 Slice）指将皮肤图片横纵均匀切割成九宫格九个部分，
 * 取其左上、右上、左下、右下切片，保持原样，绘制到窗口的四角部分，
 * 再取其上、下、左、右切片，经过拉伸，绘制到窗口四边剩下的部分，
 * 最后取其中间的切片，经过拉伸，填充窗口中心的空缺部分。
 * 
 * Wolf RPG Editor格式对话暂停光标是指将所有动画帧排成一列，共6帧的格式。
 * 不过该插件允许你使用不止6帧的动画光标，具体可以去插件参数中看看。
 * 
 * Wolf RPG Editor格式选择光标和窗口皮肤里的选择光标格式一样。
 * 
 * !注意! 
 * 
 * 1. 为了兼容原生RM的UI系统，该插件覆写了绘制UI的相关代码，所以请将插件放在
 *    插件管理器靠上的位置。
 * 
 * 2. 该插件目前只实现替换Udita样式的窗口皮肤和消息暂停光标，
 *    对于文本颜色、方向箭头、光标等方面并无改动。
 *    除了窗口皮肤和消息暂停光标本身外，其他有关RMMV窗口元素的设置仍以 RMMZ 格
 *    式皮肤上的图像为准。
 * 
 * 3. 已知 Bug：如果使用了Udita窗口皮肤，但不使用Udita选择光标，
 *    无法正常显示RM原生的UI光标。
 *    解决方法：尽量同时使用Udita窗口皮肤和Udita选择光标。可以将RM原生选择光标
 *    转成Udita选择光标格式。
 * 
 * 
 * 
 * === 事件脚本 ===
 * 
 * $gameSystem.setUditaskinState(true | false);
 * - 控制是否对所有窗口使用Udita格式的皮肤。
 *   若为 true，则使用Udita格式的皮肤，若为 false，则使用 RMMZ 格式的皮肤。
 * 
 * $gameSystem.setUditaPauseSignState(true | false);
 * - 控制是否对所有窗口使用Udita格式的对话暂停光标。
 *   若为 true，则使用Udita格式的暂停光标，若为 false，则使用 RMMZ 格式的暂停光
 *   标。
 * 
 * $gameSystem.setUditaCursorState(true | false);
 * - 控制是否对所有窗口使用Udita格式的选择光标。
 *   若为 true，则使用Udita格式的光标，若为 false，则使用 RMMZ 格式的光标。
 * 
 * $gameSystem.uditaskin()
 * - 返回通用的Udita格式皮肤。
 * 
 * $gameSystem.uditaPauseSign()
 * - 返回通用的Udita格式对话暂停光标。
 * 
 * $gameSystem.uditaCursor()
 * - 返回通用的Udita格式选择光标。
 * 
 * 
 * 
 * === 开发者脚本 ===
 * 
 * 
 * !注意! 
 * 
 * 1. 该插件修改了 _backSprite 下的 TilingSprite 的位置。
 *    现在 TilingSprite 是 _backSprite 的 children[9] 。
 * 
 * 2. 默认情况下所有窗口都可以在RM的UI和Udita的UI之间切换，以Udita为优先项。
 *    如果想设置特定窗口只用Udita的UI，则将插件参数“初始是否使用...”设为true，
 *    然后按照下面第4节的代码设置对应UI图片即可。
 *    如果想设置特定窗口只用RM的窗口皮肤作UI，
 *    则写以下代码：
 * 
 * Window_xxx.prototype.isRMWindowskinOnly = function() {
 *     return true;
 * };
 * 
 * 3. 为了兼容RM原生窗口皮肤，该插件修改了定义RM原生窗口图像的方法。
 *    在使用该插件，并为特定窗口自定义RM原生窗口皮肤时，
 *    请务必不要覆写 loadWindowskin 方法，而覆写以下方法：
 * 
 * Window_xxx.prototype.windowskinName = function() {
 *     return '窗口皮肤名';
 * };
 * 
 * ※ 结合第 2, 3 的应用实例：
 * 
 * // 设置 Window_RpCounter 不使用 Udita 的 UI，
 * // 只用 Window_Rp.png 作为RM原生UI的窗口皮肤图像。
 * 
 * if(Imported.UditaUIMZ) {
 *     Window_RpCounter.prototype.windowskinName = function() {
 *         return 'Window_Rp';
 *     };
 *     Window_RpCounter.prototype.isRMWindowskinOnly = function() {
 *         return true;
 *     };
 * } else {
 *     Window_RpCounter.prototype.loadWindowskin = function() {
 *         this.windowskin = ImageManager.loadSystem('Window_Rp');
 *     };
 * }
 * 
 * 4. Udita的UI的相关自定义代码：
 * 
 * // 设置窗口是否使用Udita格式的皮肤，默认使用通用设置。
 * // 因为这个函数写在 update 里，所以每帧都会检查一次
 * Window_xxx.prototype.updateUditaskin = function() {
 *     this._isUditaskin = true;
 * };
 * 
 * // 设置窗口是否使用Udita格式的对话暂停光标
 * // 因为这个函数写在 update 里，所以每帧都会检查一次
 * Window_xxx.prototype.updateUditaPauseSign = function() {
 *     this._isUditaPauseSign = true;
 * };
 * 
 * // 设置窗口是否使用Udita格式的选择光标
 * // 因为这个函数写在 update 里，所以每帧都会检查一次
 * Window_xxx.prototype.updateUditaCursor = function() {
 *     this._isUditaCursor = true;
 * };
 * 
 * // 设置窗口使用的Udita格式窗口皮肤
 * Window_xxx.prototype.loadUditaskin = function() {
 *     this.uditaskin = ImageManager.loadSystem('WindowBase');
 * };
 * 
 * // 设置窗口使用的Udita格式对话暂停光标
 * Window_xxx.prototype.loadUditaPauseSign = function() {
 *     this.uditaPauseSign = ImageManager.loadSystem('TextPause');
 * };
 * 
 * // 设置窗口使用的Udita格式选择光标
 * Window_xxx.prototype.loadUditaCursor = function() {
 *     this.uditaCursor = ImageManager.loadSystem('CursorBase');
 * };
 * 
 * // 如果你使用了扩展插件 UditaUIMZ_Addon_MultiUIStyles.js ，
 * // 而且整个过程只用一张图像作为UI，
 * // 则还需要写以下代码：（具体请看扩展插件帮助文档）
 * 
 * Window_xxx.prototype.isUditaskinStyleStatic = function() {
 *     return true;  // 窗口皮肤样式固定不变
 * };
 * 
 * Window_xxx.prototype.isUditaCursorStyleStatic = function() {
 *     return true;  // 选择光标样式固定不变
 * };
 * 
 * Window_xxx.prototype.isUditaPauseSignStyleStatic = function() {
 *     return true;  // 对话暂停光标样式固定不变
 * };
 * 
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT 协议
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 * 1.0.1 - 添加设置主菜单组队已选选项css颜色的插件参数，以适配Udita窗口皮肤。
 * 1.1.0 - 修改插件逻辑，扩充“开发者脚本”内容。
 * 1.1.1 - 更新功能，使用Udita选择光标时，主菜单组队已选选项也会使用Udita光标。
 *         移除设置主菜单组队已选选项css颜色的插件参数。
 * 
 * @command 启用/禁用Udita窗口皮肤
 * 
 * @arg 是否启用
 * @type boolean
 * @on 启用
 * @off 禁用
 * @default true
 * 
 * @command 启用/禁用Udita对话暂停光标
 * 
 * @arg 是否启用
 * @type boolean
 * @on 启用
 * @off 禁用
 * @default true
 * 
 * @command 启用/禁用Udita选择光标
 * 
 * @arg 是否启用
 * @type boolean
 * @on 启用
 * @off 禁用
 * @default true
 * 
 * @param === 窗口皮肤 ===
 * 
 * @param Initially Use Udita Skin
 * @text 初始是否使用Udita皮肤
 * @parent === 窗口皮肤 ===
 * @type boolean
 * @on Udita
 * @off RMMV
 * @desc 游戏开始时是否使用Udita格式的皮肤？
 * @default false
 * 
 * @param Default Udita Windowskin Name
 * @text 默认Udita窗口皮肤
 * @parent === 窗口皮肤 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的Udita窗口皮肤。放在 img/system/ 目录下。
 * @default WindowBase
 * 
 * @param === 对话暂停光标 ===
 * 
 * @param Initially Use Udita Pause Sign
 * @text 初始是否使用Udita暂停光标
 * @parent === 对话暂停光标 ===
 * @type boolean
 * @on Udita
 * @off RMMV
 * @desc 游戏开始时是否使用Udita格式的对话暂停光标？
 * @default false
 * 
 * @param Default Udita Pause Sign Name
 * @text 默认Udita暂停光标
 * @parent === 对话暂停光标 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的Udita对话暂停光标。放在 img/system/ 目录下。
 * @default TextPause
 * 
 * @param Udita Pause Sign Position
 * @text Udita暂停光标位置
 * @parent === 对话暂停光标 ===
 * @type select
 * @option 左
 * @value 0
 * @option 中
 * @value 1
 * @option 右
 * @value 2
 * @desc Udita对话暂停光标在窗口下方的位置。
 * 0 - 左，1 - 中，2 - 右
 * @default 1
 * 
 * @param Udita Pause Sign Frames
 * @text Udita暂停光标帧数
 * @parent === 对话暂停光标 ===
 * @type number
 * @min 1
 * @desc Udita对话暂停光标的动画帧数。
 * Udita默认是6帧。
 * @default 6
 * 
 * @param Udita Pause Sign Anime Speed
 * @text Udita暂停光标动画速度
 * @parent === 对话暂停光标 ===
 * @type number
 * @min 1
 * @desc Udita对话暂停光标的动画速度。数字越小，速度越快。默认是12
 * @default 12
 * 
 * @param === 选择光标 ===
 * 
 * @param Initially Use Udita Cursor
 * @text 初始是否使用Udita选择光标
 * @parent === 选择光标 ===
 * @type boolean
 * @on Udita
 * @off RMMV
 * @desc 初始时是否使用Udita格式的选择光标？
 * @default false
 * 
 * @param Default Udita Cursor Name
 * @text 默认Udita选择光标名称
 * @parent === 选择光标 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的Udita选择光标。放在 img/system/ 目录下。
 * @default CursorBase
 * 
 * @param Enable Udita Cursor Blinking
 * @text Udita选择光标是否闪烁
 * @parent === 选择光标 ===
 * @type boolean
 * @on 闪烁
 * @off 不闪烁
 * @default Udita选择光标是否闪烁？
 * @default true
 */

var Imported = Imported || {};
Imported.UditaUIMZ = true;

var RSSD = RSSD || {};
RSSD.UUI = {};
RSSD.UUI.pluginName = 'UditaUIMZ';

RSSD.UUI.parameters = PluginManager.parameters(RSSD.UUI.pluginName);
RSSD.UUI.isUseSkin         = RSSD.UUI.parameters['Initially Use Udita Skin'] === 'true';
RSSD.UUI.isUsePauseSign    = RSSD.UUI.parameters['Initially Use Udita Pause Sign'] === 'true';
RSSD.UUI.isUseCursor       = RSSD.UUI.parameters['Initially Use Udita Cursor'] === 'true';
RSSD.UUI.pauseSignPosition = +RSSD.UUI.parameters['Udita Pause Sign Position'] || 1;
RSSD.UUI.commonSkin        = ''+RSSD.UUI.parameters['Default Udita Windowskin Name'] || '';
RSSD.UUI.commonPauseSign   = ''+RSSD.UUI.parameters['Default Udita Pause Sign Name'] || '';
RSSD.UUI.commonCursor      = ''+RSSD.UUI.parameters['Default Udita Cursor Name'] || '';
RSSD.UUI.isCursorBlinking  = RSSD.UUI.parameters['Enable Udita Cursor Blinking'] === 'true';
RSSD.UUI.pauseSignFrames   = +RSSD.UUI.parameters['Udita Pause Sign Frames'] || 6;
RSSD.UUI.pauseSignSpeed    = +RSSD.UUI.parameters['Udita Pause Sign Anime Speed'] || 12;

//==============================================================================
// Game_System
//==============================================================================

let __RSSD_UUI_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    __RSSD_UUI_Game_System_initialize.call(this);
    this.clearUditaSettings();
};

Game_System.prototype.clearUditaSettings = function() {
    this._isUditaskin = RSSD.UUI.isUseSkin;
    this._isUditaPauseSign = RSSD.UUI.isUsePauseSign;
    this._isUditaCursor = RSSD.UUI.isUseCursor;
    this._uditaskin = RSSD.UUI.commonSkin;
    this._uditaPauseSign = RSSD.UUI.commonPauseSign;
    this._uditaCursor = RSSD.UUI.commonCursor;
};

Game_System.prototype.isUditaskin = function() {
    return this._isUditaskin;
};

Game_System.prototype.isUditaPauseSign = function() {
    return this._isUditaPauseSign;
};

Game_System.prototype.isUditaCursor = function() {
    return this._isUditaCursor;
};

Game_System.prototype.uditaskin = function() {
    return this._uditaskin;
};

Game_System.prototype.uditaPauseSign = function() {
    return this._uditaPauseSign;
};

Game_System.prototype.uditaCursor = function() {
    return this._uditaCursor;
};

Game_System.prototype.setUditaskinState = function(boo) {
    this._isUditaskin = boo;
};

Game_System.prototype.setUditaPauseSignState = function(boo) {
    this._isUditaPauseSign = boo;
};

Game_System.prototype.setUditaCursorState = function(boo) {
    this._isUditaCursor = boo;
};

//==============================================================================
// Bitmap
//==============================================================================

/**
 * 为Bitmap设置slice9效果
 * @param {Bitmap} source 源slice9的UI图像
 * @param {Rectangle} drect 目的位置Rectangle对象
 */
Bitmap.prototype.setRectPartsGeometry4Udita = function(source, drect) {
    const x = drect.x, y = drect.y, w = drect.width, h = drect.height;
    const skin = source;
    const sw = Math.floor(skin.width / 3);
    const sh = Math.floor(skin.height / 3);
    this.blt(skin, 0, 0, sw, sh, x, y, sw, sh); // up left
    this.blt(skin, sw*2, 0, sw, sh, x + w - sw, y, sw, sh); // up right
    this.blt(skin, 0, sw*2, sw, sh, x, y + h - sh, sw, sh); // down left
    this.blt(skin, sw*2, sh*2, sw, sh, x + w - sw, y + h - sh, sw, sh); // down right
    this.blt(skin, 0, sh, sw, sh, x, y + sh, sw, h - 2*sh); // left
    this.blt(skin, sw, 0, sw, sh, x + sw, y, w - 2*sw, sh); // up
    this.blt(skin, 2*sw, sh, sw, sh, x + w - sw, y + sh, sw, h - 2*sh); // right
    this.blt(skin, sw, 2*sh, sw, sh, x + sw, y + h - sh, w - 2*sw, sh); // down
    this.blt(skin, sw, sh, sw, sh, x + sw, y + sh, w - 2*sw, h - 2*sh); // center
};

//==============================================================================
// Window
//==============================================================================

let __Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
    __Window_initialize.call(this);
    this._uditaskin = null;
    this._uditaPauseSign = null;
    this._uditaCursor = null;
    this._isUditaskin = false;
    this._isUditaskinpri = false;
    this._isUditaPauseSign = false;
    this._isUditaPauseSignpri = false;
    this._isUditaCursor = false;
    this._isUditaCursorpri = false;
};

/**
 * 用作窗口皮肤的 Wolf RPG Editor 格式图片。
 * The skin bitmap in Wolf RPG Editor format used for Windowskin.
 * 
 * @property uditaskin
 * @type bitmap
 */

Object.defineProperty(Window.prototype, 'uditaskin', {
    get: function() {
        return this._uditaskin;
    },
    set: function(value) {
        if (this._uditaskin !== value) {
            this._uditaskin = value;
            this._uditaskin.addLoadListener(this._onUditaskinLoad.bind(this));
        }
    },
    configurable: true
});

Window.prototype._onUditaskinLoad = function() {
    this._onWindowskinLoad();
};

/**
 * 用作对话暂停光标的 Wolf RPG Editor 格式图片。
 * The pause sign bitmap in Wolf RPG Editor format.
 * 
 * @property uditaPauseSign
 * @type bitmap
 */
Object.defineProperty(Window.prototype, 'uditaPauseSign', {
    get: function() {
        return this._uditaPauseSign;
    },
    set: function(value) {
        if(this._uditaPauseSign !== value) {
            this._uditaPauseSign = value;
            this._uditaPauseSign.addLoadListener(this._onUditaPauseSignLoad.bind(this));
        }
    },
    configurable: true
});

/**
 * 用作选择光标的 Wolf RPG Editor 格式图片。
 * The cursor bitmap in Wolf RPG Editor format.
 * 
 * @property uditaCursor
 * @type bitmap
 */
 Object.defineProperty(Window.prototype, 'uditaCursor', {
    get: function() {
        return this._uditaCursor;
    },
    set: function(value) {
        if(this._uditaCursor !== value) {
            this._uditaCursor = value;
            this._uditaCursor.addLoadListener(this._onUditaCursorLoad.bind(this));
        }
    },
    configurable: true
});

Window.prototype._onUditaPauseSignLoad = function() {
    this._refreshPauseSign();
};

Window.prototype._onUditaCursorLoad = function() {
    this._refreshCursor();
};

Window.prototype.windowskinName = function() {
    return 'Window';
};

Window.prototype.isRMWindowskinOnly = function() {
    return false;
};

let __RSSD_UUI_Window__createBackSprite = Window.prototype._createBackSprite;
Window.prototype._createBackSprite = function() {
    this._backSprite = new Sprite();
    for (let i = 0; i < 9; i++) {
        this._backSprite.addChild(new Sprite());
    }
    this._backSprite.addChild(new TilingSprite());
    this._container.addChild(this._backSprite);
};

// Override
Window.prototype._refreshBack = function() {
    if(this._isUditaskin && this._uditaskin && !this.isRMWindowskinOnly()){
        const bitmap = this._uditaskin;
        const backSprite = this._backSprite;
        backSprite.bitmap = null;
        backSprite.scale.x = 1;
        backSprite.scale.y = 1;
        backSprite.children[0].scale.x = 1;
        backSprite.children[0].scale.y = 1;
        backSprite.children[9].bitmap = null;
        const drect = { x: 0, y: 0, width: this._width, height: this._height };
        const srect = { x: 0, y: 0, width: bitmap.width, height: bitmap.height };
        const wm = bitmap.width / 3;
        const hm = bitmap.height / 3;
        for (const child of backSprite.children) {
            child.bitmap = this._uditaskin;
        }
        this._setRectPartsGeometry4Udita(backSprite, srect, drect, wm, hm);
        backSprite.setColorTone(this._colorTone);
        backSprite.alpha = 1;
    } else {
        const m = this._margin;
        const w = Math.max(0, this._width - m * 2);
        const h = Math.max(0, this._height - m * 2);
        const sprite = this._backSprite;
        const tilingSprite = sprite.children[9];
        const windowskin = ImageManager.loadSystem(this.windowskinName());
        for(const child of sprite.children) {
            child.bitmap = null;
        }
        // [Note] We use 95 instead of 96 here to avoid blurring edges.
        sprite.bitmap = windowskin;
        sprite.setFrame(0, 0, 95, 95);
        sprite.move(m, m);
        sprite.scale.x = w / 95;
        sprite.scale.y = h / 95;
        tilingSprite.bitmap = windowskin;
        tilingSprite.setFrame(0, 96, 96, 96);
        tilingSprite.move(0, 0, w, h);
        tilingSprite.scale.x = 1 / sprite.scale.x;
        tilingSprite.scale.y = 1 / sprite.scale.y;
        sprite.setColorTone(this._colorTone);
        sprite.alpha = 192 / 255;
    }
};

let __RSSD_UUI_Window__refreshFrame = Window.prototype._refreshFrame;
Window.prototype._refreshFrame = function() {
    if(this._isUditaskin && this._uditaskin && !this.isRMWindowskinOnly()) {
        for(const child of this._frameSprite.children) {
            child.bitmap = null;
        }
    } else {
        __RSSD_UUI_Window__refreshFrame.call(this);
    }
};

// Override
Window.prototype._refreshArrows = function() {
    const w = this._width;
    const h = this._height;
    const p = 24;
    const q = p / 2;
    const sx = 96 + p;
    const sy = 0 + p;
    const windowskin = ImageManager.loadSystem(this.windowskinName());
    this._downArrowSprite.bitmap = windowskin;
    this._downArrowSprite.anchor.x = 0.5;
    this._downArrowSprite.anchor.y = 0.5;
    this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
    this._downArrowSprite.move(w / 2, h - q);
    this._upArrowSprite.bitmap = windowskin;
    this._upArrowSprite.anchor.x = 0.5;
    this._upArrowSprite.anchor.y = 0.5;
    this._upArrowSprite.setFrame(sx + q, sy, p, q);
    this._upArrowSprite.move(w / 2, q);
};

// Override
Window.prototype._refreshPauseSign = function() {
    if(this._isUditaPauseSign && this._uditaPauseSign && !this.isRMWindowskinOnly()) {
        const bitmap = this._uditaPauseSign;
        const w = bitmap.width;
        const h = Math.floor(bitmap.height / 6);
        const pauseSignSprite = this._pauseSignSprite;
        pauseSignSprite.bitmap = bitmap;
        pauseSignSprite.anchor.x = 0.5;
        pauseSignSprite.anchor.y = 1;
        switch(RSSD.UUI.pauseSignPosition) {
            case 0:
                var psx = 0;
                var psy = this._height;
                break;
            case 1:
                var psx = this._width / 2;
                var psy = this._height;
                break;
            case 2:
                var psx = this._width - bitmap.width;
                var psy = this._height;
                break;
        };
        pauseSignSprite.move(psx, psy);
        pauseSignSprite.setFrame(0, 0, w, h);
        pauseSignSprite.alpha = 0;
    } else {
        const sx = 144;
        const sy = 96;
        const p = 24;
        const windowskin = ImageManager.loadSystem(this.windowskinName());
        this._pauseSignSprite.bitmap = windowskin;
        this._pauseSignSprite.anchor.x = 0.5;
        this._pauseSignSprite.anchor.y = 1;
        this._pauseSignSprite.move(this._width / 2, this._height);
        this._pauseSignSprite.setFrame(sx, sy, p, p);
        this._pauseSignSprite.alpha = 0;
    }
};

let __RSSD_UUI_Window__updatePauseSign = Window.prototype._updatePauseSign;
Window.prototype._updatePauseSign = function() {
    if(this._isUditaPauseSign && this._uditaPauseSign && !this.isRMWindowskinOnly()) {
        const sprite = this._pauseSignSprite;
        const frames = RSSD.UUI.pauseSignFrames;
        const speed = RSSD.UUI.pauseSignSpeed;
        const x = 0;
        const y = Math.floor(this._animationCount / speed) % frames;
        const w = sprite.bitmap.width;
        const h = Math.floor(sprite.bitmap.height / frames);
        if (!this.pause) {
            sprite.alpha = 0;
        } else if (sprite.alpha < 1) {
            sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
        }
        sprite.setFrame(x, y*h, w, h);
        sprite.visible = this.isOpen();
    } else {
        __RSSD_UUI_Window__updatePauseSign.call(this);
    }
};

// Override
let __RSSD_UUI_Window__refreshCursor = Window.prototype._refreshCursor;
Window.prototype._refreshCursor = function() {
    if(this._isUditaCursor && this._uditaCursor && !this.isRMWindowskinOnly()) {
        const bitmap = this._uditaCursor;
        const drect = this._cursorRect.clone();
        const srect = { x: 0, y: 0, width: bitmap.width, height: bitmap.height };
        const m = Math.floor(bitmap.width / 3);
        for (const child of this._cursorSprite.children) {
            child.bitmap = bitmap;
        }
        this._setRectPartsGeometry4Udita(this._cursorSprite, srect, drect, m, m);
    } else {
        const drect = this._cursorRect.clone();
        const srect = { x: 96, y: 96, width: 48, height: 48 };
        const m = 4;
        const windowskin = ImageManager.loadSystem(this.windowskinName());
        for (const child of this._cursorSprite.children) {
            child.bitmap = this._windowskin;  // 改成常量windowskin，指令就会闪烁，不知道为什么改不了
        }
        this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
    }
};

// Override
Window.prototype._setRectPartsGeometry4Udita = function(sprite, srect, drect, wm, hm) {
    const sx = srect.x;
    const sy = srect.y;
    const sw = srect.width;
    const sh = srect.height;
    const dx = drect.x;
    const dy = drect.y;
    const dw = drect.width;
    const dh = drect.height;
    const smw = sw - wm * 2;
    const smh = sh - hm * 2;
    const dmw = dw - wm * 2;
    const dmh = dh - hm * 2;
    const children = sprite.children;
    sprite.setFrame(0, 0, dw, dh);
    sprite.move(dx, dy);
    // corner
    children[0].setFrame(sx, sy, wm, hm);
    children[1].setFrame(sx + sw - wm, sy, wm, hm);
    children[2].setFrame(sx, sy + sh - hm, wm, hm);
    children[3].setFrame(sx + sw - wm, sy + sh - hm, wm, hm);
    children[0].move(0, 0);
    children[1].move(dw - wm, 0);
    children[2].move(0, dh - hm);
    children[3].move(dw - wm, dh - hm);
    // edge
    children[4].move(wm, 0);
    children[5].move(wm, dh - hm);
    children[6].move(0, hm);
    children[7].move(dw - wm, hm);
    children[4].setFrame(sx + wm, sy, smw, hm);
    children[5].setFrame(sx + wm, sy + sh - hm, smw, hm);
    children[6].setFrame(sx, sy + hm, wm, smh);
    children[7].setFrame(sx + sw - wm, sy + hm, wm, smh);
    children[4].scale.x = dmw / smw;
    children[5].scale.x = dmw / smw;
    children[6].scale.y = dmh / smh;
    children[7].scale.y = dmh / smh;
    // center
    if (children[8]) {
        children[8].setFrame(sx + wm, sy + hm, smw, smh);
        children[8].move(wm, hm);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
    }
    for (const child of children) {
        child.visible = dw > 0 && dh > 0;
    }
};

let __RSSD_UUI_Window_updateTransfrom = Window.prototype.updateTransform;
Window.prototype.updateTransform = function() {
    this._updateWindowskinStyle();
    this._updatePauseSignStyle();
    this._updateCursorStyle();
    __RSSD_UUI_Window_updateTransfrom.call(this);
};

Window.prototype._updateWindowskinStyle = function() {
    if(this._isUditaskinpri !== this._isUditaskin) {
        this._onWindowskinStyleChange();
        this._isUditaskinpri = this._isUditaskin;
    };
};

Window.prototype._updatePauseSignStyle = function() {
    if(this._isUditaPauseSignpri !== this._isUditaPauseSign) {
        this._onPauseSignStyleChange();
        this._isUditaPauseSignpri = this._isUditaPauseSign;
    };
};

Window.prototype._updateCursorStyle = function() {
    if(this._isUditaCursorpri !== this._isUditaCursor) {
        this._onCursorStyleChange();
        this._isUditaCursorpri = this._isUditaCursor;
    };
};

Window.prototype._onWindowskinStyleChange = function() {
    this._refreshBack();
    this._refreshFrame();
};

Window.prototype._onPauseSignStyleChange = function() {
    this._refreshPauseSign();
};

Window.prototype._onCursorStyleChange = function() {
    this._refreshCursor();
};

let __RSSD_UUI_Window__updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
    if(this._isUditaCursor && !RSSD.UUI.isCursorBlinking) {
        this._cursorSprite.alpha = 1;
    } else {
        __RSSD_UUI_Window__updateCursor.call(this);
    };
};

//==============================================================================
// Window_Base
//==============================================================================

let __RSSD_UUI_Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
    __RSSD_UUI_Window_Base_initialize.call(this, rect);
    this.initUditaTempData();
    this.updateUditaskin();
    this.checkForRMWindowskinUse();
    this.loadUditaBitmaps();
};

Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(this.windowskinName());
};

Window_Base.prototype.initUditaTempData = function() {
    this._temp_isUditaskin = false;
    this._temp_isUditaCursor = false;
    this._temp_isUditaPauseSign = false;
};

Window_Base.prototype.checkForRMWindowskinUse = function() {
    if(this._isUditaskin && !this.isRMWindowskinOnly()) {
        this._windowskinTempEmptyBitmap = this._windowskinTempEmptyBitmap || new Bitmap(1, 1);
        this.windowskin = this._windowskinTempEmptyBitmap;
    } else {
        if(this._windowskinTempEmptyBitmap) this._windowskinTempEmptyBitmap.destroy();
        this.loadWindowskin();
    }
};

Window_Base.prototype.loadUditaBitmaps = function() {
    this.loadUditaskin();
    this.loadUditaPauseSign();
    this.loadUditaCursor();
};

let __RSSD_UUI_Window_Base_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
    __RSSD_UUI_Window_Base_update.call(this);
    this.updateUditaStuff();
};

Window_Base.prototype.updateUditaStuff = function() {
    this.updateUditaskin();
    this.updateUditaPauseSign();
    this.updateUditaCursor();
    this.updateUditaAdditionalStuff();
};

Window_Base.prototype.updateUditaskin = function() {
    this._isUditaskin = $gameSystem.isUditaskin();
};

Window_Base.prototype.updateUditaPauseSign = function() {
    this._isUditaPauseSign = $gameSystem.isUditaPauseSign();
};

Window_Base.prototype.updateUditaCursor = function() {
    this._isUditaCursor = $gameSystem.isUditaCursor();
};

Window_Base.prototype.updateUditaAdditionalStuff = function() {
    this.updateCheckForRMWindowskinUse();
    this.updateUWTempStatus();  // UditaUI & RM Window
};

Window_Base.prototype.updateCheckForRMWindowskinUse = function() {
    if(this.isOnUWSkinChange()) {
        this.checkForRMWindowskinUse();
    }
};

Window_Base.prototype.isOnUWSkinChange = function() {
    return this._temp_isUditaskin !== this._isUditaskin;
};

Window_Base.prototype.isOnUWCursorChange = function() {
    return this._temp_isUditaCursor !== this._isUditaCursor;
};

Window_Base.prototype.isOnUWPauseSignChange = function() {
    return this._temp_isUditaPauseSign !== this._isUditaPauseSign;
};

Window_Base.prototype.updateUWTempStatus = function() {
    this._temp_isUditaskin = this._isUditaskin;
    this._temp_isUditaCursor = this._isUditaCursor;
    this._temp_isUditaPauseSign = this._isUditaPauseSign;
};

Window_Base.prototype.loadUditaskin = function() {
    this.uditaskin = ImageManager.loadSystem($gameSystem.uditaskin());
};

Window_Base.prototype.loadUditaPauseSign = function() {
    this.uditaPauseSign = ImageManager.loadSystem($gameSystem.uditaPauseSign());
};

Window_Base.prototype.loadUditaCursor = function() {
    this.uditaCursor = ImageManager.loadSystem($gameSystem.uditaCursor());
};

let __RSSD_UUI_Window_MenuStatus_drawPendingItemBackground = Window_MenuStatus.prototype.drawPendingItemBackground;
Window_MenuStatus.prototype.drawPendingItemBackground = function(index) {
    if(this._isUditaCursor && !this.isRMWindowskinOnly()) {
        if (index === this._pendingIndex) {
            const rect = this.itemRect(index);
            this.changePaintOpacity(false);
            this.contents.setRectPartsGeometry4Udita(this._uditaCursor, rect);
            this.changePaintOpacity(true);
        }
    } else {
        __RSSD_UUI_Window_MenuStatus_drawPendingItemBackground.call(this, index);
    }
};

//==============================================================================
// PluginManager
//==============================================================================

PluginManager.registerCommand(RSSD.UUI.pluginName, '启用/禁用Udita窗口皮肤', (args)=>{
    const isEnabled = args['是否启用'] === 'true';
    $gameSystem.setUditaskinState(isEnabled);
});

PluginManager.registerCommand(RSSD.UUI.pluginName, '启用/禁用Udita对话暂停光标', (args)=>{
    const isEnabled = args['是否启用'] === 'true';
    $gameSystem.setUditaPauseSignState(isEnabled);
});

PluginManager.registerCommand(RSSD.UUI.pluginName, '启用/禁用Udita选择光标', (args)=>{
    const isEnabled = args['是否启用'] === 'true';
    $gameSystem.setUditaCursorState(isEnabled);
});