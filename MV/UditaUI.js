//===============================================================
// UditaUI.js
//===============================================================
/*:
 * @plugindesc ver3.02 - Wolf RPG Editor 格式的 UI
 * @author 离影玫 | Rose_shadows
 * @help 
 * === 介绍 ===
 * 
 * 
 * 该插件允许你在 RMMV 中使用 Wolf RPG Editor (Udita) 格式的窗口皮肤
 * 、对话暂停光标和选择光标。
 * 
 * Wolf RPG Editor格式皮肤是指将皮肤图片横纵均匀切割成九宫格九个部分，
 * 取其左上、右上、左下、右下切片，保持原样，绘制到窗口的四角部分，
 * 再取其上、下、左、右切片，经过拉伸，绘制到窗口四边剩下的部分，
 * 最后取其中间的切片，经过拉伸，填充窗口中心的空缺部分。
 * 
 * Wolf RPG Editor格式对话暂停光标是指将所有动画帧排成一列，共6帧的格式。
 * 不过该插件允许你使用不止6帧的动画光标，你可以去插件参数中看看。
 * 
 * Wolf RPG Editor格式选择光标和Udita皮肤格式一样。
 * 
 * 该插件还提供在游戏中切换使用RMMV格式或Wolf RPG Editor格式窗口皮肤或
 * 对话暂停光标的功能。
 * 
 * !注意! 该插件目前只实现替换Udita样式的窗口皮肤和消息暂停光标，
 * 对于文本颜色、方向箭头、光标等方面并无改动。
 * 所以除了窗口皮肤和消息暂停光标本身外，其他有关RMMV窗口元素的设置仍以
 * RMMV格式皮肤上的图像为准。
 * 
 * 
 * 
 * === 用法 ===
 * 
 * 
 * == 窗口皮肤 ==
 * 
 * 将 Wolf RPG Editor 格式的窗口皮肤放入 img/system/ 文件夹中，
 * 并命名为 Window2 (插件参数中可设置)。
 * 注：窗口皮肤的宽高建议设为3的整数倍。
 * 
 * 
 * == 对话暂停光标 ==
 * 
 * 将 Wolf RPG Editor 格式的对话暂停光标图像放入 img/system/ 文件夹中，
 * 并命名为 PauseSign (插件参数中可设置)。
 * 该插件不仅允许你使用不止6帧的动画光标，还允许你调整光标动画的速度。
 * 注：暂停光标的高建议设为帧数的整数倍。
 * 
 * 
 * == 选择光标 ==
 * 
 * 将 Wolf RPG Editor 格式的选择光标图像放入 img/system/ 文件夹中，
 * 并命名为 CursorBase (插件参数中可设置)。
 * 该插件还允许你设置在使用Wolf RPG Rditor格式光标时光标是否闪烁。
 * 注：选择光标的高建议设为3的整数倍。
 * 
 * 
 *
 * === 插件指令 ===
 * 
 * 
 * ::Udita windowskin {use?} {filename}
 * 
 * - 是否使用Wolf RPG Editor格式窗口。大小写不敏感。
 *   {use?}的位置填true或false。
 *     若为true，则使用Wolf RPG Editor格式的窗口皮肤；
 *     若为false，则使用RMMV格式的窗口皮肤。
 *   {filename}的位置填要更换的图片名称。位于 img/system/ 下。
 *     注意，只有当前使用的是Wolf RPG Editor格式的素材时，该项才有效。
 * 
 * 
 * ::Udita pausesign {use?} {filename}
 * ::Udita pause-sign {use?} {filename}
 * 
 * - 是否使用Wolf RPG Editor格式对话暂停光标。大小写不敏感。
 *   {use?}的位置填true或false。
 *     若为true，则使用Wolf RPG Editor格式的对话暂停光标；
 *     若为false，则使用RMMV格式的对话暂停光标。
 *   {filename}的位置填要更换的图片名称。位于 img/system/ 下。
 *     注意，只有当前使用的是Wolf RPG Editor格式的素材时，该项才有效。
 * 
 * 
 * ::Udita cursor {use?} {filename}
 * 
 * - 是否使用Wolf RPG Editor格式选择光标。大小写不敏感。
 *   {use?}的位置填true或false。
 *     若为true，则使用Wolf RPG Editor格式的选择光标；
 *     若为false，则使用RMMV格式的选择光标。
 *   {filename}的位置填要更换的图片名称。位于 img/system/ 下。
 *     注意，只有当前使用的是Wolf RPG Editor格式的素材时，该项才有效。
 * 
 * 
 * 
 * === 事件脚本 ===
 * 
 * 
 * RSSD.UditaUI.isUseSkin = true;  // 使用Wolf RPG Editor格式的窗口皮肤
 * RSSD.UditaUI.isUseSkin = false; // 使用RMMV格式的窗口皮肤
 * 
 * RSSD.UditaUI.isUsePauseSign = true;  // 使用Wolf RPG Editor格式的暂停光标
 * RSSD.UditaUI.isUsePauseSign = false; // 使用RMMV格式的暂停光标
 * 
 * RSSD.UditaUI.isUseCursor = true;  // 使用Wolf RPG Editor格式的选择光标
 * RSSD.UditaUI.isUseCursor = false; // 使用RMMV格式的选择光标
 * 
 * RSSD.UditaUI.uditaskin = 'Window3';
 * // --- 使用名为Window3的图像作为Wolf RPG Editor格式的窗口皮肤
 * 
 * RSSD.UditaUI.uditaPauseSign = 'PauseSign2';
 * // --- 使用名为PauseSign2的图像作为Wolf RPG Editor格式的暂停光标
 * 
 * RSSD.UditaUI.uditaCursor = 'CursorBase2';
 * // --- 使用名为CursorBase2的图像作为Wolf RPG Editor格式的选择光标
 * 
 * 
 * === 使用条款 ===
 * 
 * 免费用于商业与非商业工程。允许二次转发及修改。
 * 不强制署名，但不要声明该插件是除 Rose_shadows | 离影玫 | OrchidBones | 
 * 兰骨 以外的人所写的。
 * Free to be used in both commercial and non-commercial projects. You can 
 * also modify or redistribute this plugin, as long as you do not claim this
 * plugin belongs to anyone except me, Rose_shadows | 离影玫 | OrchidBones | 
 * 兰骨. 
 * Credits are appreciated, but not required.
 * 
 * 
 * === 更新日志 ===
 * 
 * v1.00 - 完成。初步添加了对Udita格式窗口皮肤的支持。
 * v1.01 - 添加了对存档的支持。
 *         现在，游戏当前使用的皮肤格式可以存入存档中。
 * v1.02 - 修复了修改窗口皮肤格式时，窗口没有立即更改格式的问题。
 * v2.00 - 进一步添加了对Udita格式对话暂停光标的支持。
 *         整理了插件参数列表，新增关于Udita格式对话暂停光标的设置。
 * v2.10 - 新增更换Udita格式UI图片的功能。
 * v3.00 - 添加了对Udita格式选择光标的支持及相关插件参数设置。
 * v3.01 - 修复“Udita选择光标是否闪烁”参数失效的问题。
 * v3.02 - 修复Udita光标下组队界面pending背景依然为色块而非选择光标的问题。
 * 
 * @param ===== 窗口皮肤 =====
 * 
 * @param Initially Use Udita Skin
 * @text 初始是否使用Udita皮肤
 * @type boolean
 * @on Udita
 * @off RMMV
 * @desc 游戏开始时是否使用Udita格式的皮肤？
 * @default false
 * 
 * @param Default Udita Windowskin Name
 * @text 默认Udita窗口皮肤
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的Udita窗口皮肤。放在 img/system/ 目录下。
 * @default Window2
 * 
 * @param
 * @param ==== 对话暂停光标 ====
 * 
 * @param Initially Use Udita Pause Sign
 * @text 初始是否使用Udita暂停光标
 * @type boolean
 * @on Udita
 * @off RMMV
 * @desc 游戏开始时是否使用Udita格式的对话暂停光标？
 * @default false
 * 
 * @param Default Udita Pause Sign Name
 * @text 默认Udita暂停光标
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的Udita对话暂停光标。放在 img/system/ 目录下。
 * @default PauseSign
 * 
 * @param Udita Pause Sign Position
 * @text Udita暂停光标位置
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
 * @type number
 * @min 1
 * @desc Udita对话暂停光标的动画帧数。
 * Udita默认是6帧。
 * @default 6
 * 
 * @param Udita Pause Sign Anime Speed
 * @text Udita暂停光标动画速度
 * @type number
 * @min 1
 * @desc Udita对话暂停光标的动画速度。数字越小，速度越快。默认是12
 * @default 12
 * 
 * @param
 * @param ==== 选择光标 ====
 * 
 * @param Initially Use Udita Cursor
 * @text 初始是否使用Udita选择光标
 * @type boolean
 * @on Udita
 * @off RMMV
 * @desc 初始时是否使用Udita格式的选择光标？
 * @default false
 * 
 * @param Default Udita Cursor Name
 * @text 默认Udita选择光标名称
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的Udita选择光标。放在 img/system/ 目录下。
 * @default CursorBase
 * 
 * @param Enable Udita Cursor Blinking
 * @text Udita选择光标是否闪烁
 * @type boolean
 * @on 闪烁
 * @off 不闪烁
 * @default Udita选择光标是否闪烁？
 * @default true
 */

var Imported = Imported || {};
Imported.UditaUI = true;

var RSSD = RSSD || {};
RSSD.UditaUI = {};

RSSD.UditaUI.parameters = PluginManager.parameters('UditaUI');
RSSD.UditaUI.isUseSkin              = RSSD.UditaUI.parameters['Initially Use Udita Skin'] === 'true';
RSSD.UditaUI.isUsePauseSign         = RSSD.UditaUI.parameters['Initially Use Udita Pause Sign'] === 'true';
RSSD.UditaUI.isUseCursor            = RSSD.UditaUI.parameters['Initially Use Udita Cursor'] === 'true';
RSSD.UditaUI.uditaPauseSignPosition = +RSSD.UditaUI.parameters['Udita Pause Sign Position'] || 1;
RSSD.UditaUI.uditaskin              = ''+RSSD.UditaUI.parameters['Default Udita Windowskin Name'] || 'Window2';
RSSD.UditaUI.uditaPauseSign         = ''+RSSD.UditaUI.parameters['Default Udita Pause Sign Name'] || 'PauseSign';
RSSD.UditaUI.uditaCursor            = ''+RSSD.UditaUI.parameters['Default Udita Cursor Name'] || 'CursorBase';
RSSD.UditaUI.isCursorBlinking       = RSSD.UditaUI.parameters['Enable Udita Cursor Blinking'] === 'true';
RSSD.UditaUI.uditaPauseSignFrames   = +RSSD.UditaUI.parameters['Udita Pause Sign Frames'] || 6;
RSSD.UditaUI.uditaPauseSignSpeed    = +RSSD.UditaUI.parameters['Udita Pause Sign Anime Speed'] || 12;

//==============================================================================
// Bitmap
//==============================================================================

/**
 * 在Bitmap实例上绘制九宫格格式的图像
 * @param {Bitmap} source 源slice9的UI图像
 * @param {Rectangle} srect 原位置Rectangle对象
 * @param {Rectangle} drect 目的位置Rectangle对象，若省略则使用srect的值
 * @param {Number} wm 横向缩进，默认为源slice9图像的1/3
 * @param {Number} hm 纵向缩进，默认为源slice9图像的1/3
 */
Bitmap.prototype.setRectPartsGeometry_9slice = function(source, srect, drect, wm, hm) {
    const sx = srect.x, sy = srect.y, sw = srect.width, sh = srect.height;
    drect = drect || srect;
    const dx = drect.x, dy = drect.y, dw = drect.width, dh = drect.height;
    wm = wm || Math.floor(sw / 3);
    hm = hm || Math.floor(sh / 3);
    const skin = source;
    this.blt(skin, sx, sy, wm, hm, dx, dy, wm, hm); // up left
    this.blt(skin, sx + sw - wm, sy, wm, hm, dx + dw - wm, dy, wm, hm); // up right
    this.blt(skin, sx, sy + sw - hm, wm, hm, dx, dy + dh - hm, wm, hm); // down left
    this.blt(skin, sx + sw - wm, sy + sh - hm, wm, hm, dx + dw - wm, dy + dh - hm, wm, hm); // down right
    this.blt(skin, sx, sy + hm, wm, sh - 2*hm, dx, dy + hm, wm, dh - 2*hm); // left
    this.blt(skin, sx + wm, sy, sw - 2*wm, hm, dx + wm, dy, dw - 2*wm, hm); // up
    this.blt(skin, sx + sw - wm, sy + hm, wm, sh - 2*hm, dx + dw - wm, dy + hm, wm, dh - 2*hm); // right
    this.blt(skin, sx + wm, sy + sh - hm, sw - 2*wm, hm, dx + wm, dy + dh - hm, dw - 2*wm, hm); // down
    this.blt(skin, sx + wm, sy + hm, sw - 2*wm, sh - 2*hm, dx + wm, dy + hm, dw - 2*wm, dh - 2*hm); // center
};

//===============================================================
// Game_Interpreter
//===============================================================

var __UUI_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    __UUI_Game_Interpreter_pluginCommand.call(this, command, args);
    if(command.toLowerCase() == '::udita') {
        if(args[0].toLowerCase() == 'windowskin') {
            RSSD.UditaUI.isUseSkin = args[1].toLowerCase() == 'true';
            if(args[2] && RSSD.UditaUI.isUseSkin) {
                RSSD.UditaUI.uditaskin = ''+args[2];
            };
        } else if (args[0].toLowerCase() == 'pausesign' || args[0].toLowerCase() == 'pause-sign') {
            RSSD.UditaUI.isUsePauseSign = args[1].toLowerCase() == 'true';
            if(args[2] && RSSD.UditaUI.isUsePauseSign) {
                RSSD.UditaUI.uditaPauseSign = ''+args[2];
            };
        } else if(args[0].toLowerCase() == 'cursor') {
            RSSD.UditaUI.isUseCursor = args[1].toLowerCase() == 'true';
            if(args[2] && RSSD.UditaUI.isUseCursor) {
                RSSD.UditaUI.uditaCursor = ''+args[2];
            };
        }
    }
};


//===============================================================
// Window
//===============================================================

var __Window_initialize = Window.prototype.initialize;
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
            this._uditaskin.addLoadListener(this._onWindowskinLoad.bind(this));
        }
    },
    configurable: true
});

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
    this._refreshAllParts();
};

Window.prototype._onUditaCursorLoad = function() {
    this._refreshAllParts();
};

var __Window__refreshBack = Window.prototype._refreshBack;
Window.prototype._refreshBack = function() {
    if(this._isUditaskin){

        // Udita-formated Windowskin will not use this._margin. You need to modify the skin image.

        var w = this._width;
        var h = this._height;
        var bitmap = new Bitmap(w, h);

        this._windowBackSprite.bitmap = bitmap;
        this._windowBackSprite.setFrame(0, 0, w, h);
        this._windowBackSprite.move(0, 0);

        if(w > 0 && h > 0 && this._uditaskin) {
            var skin = this._uditaskin;
            var sw = Math.floor(skin.width / 3);
            var sh = Math.floor(skin.height / 3);
            bitmap.blt(skin, 0, 0, sw, sh, 0, 0, sw, sh); // up left
            bitmap.blt(skin, sw*2, 0, sw, sh, w - sw, 0, sw, sh); // up right
            bitmap.blt(skin, 0, sw*2, sw, sh, 0, h - sh, sw, sh); // down left
            bitmap.blt(skin, sw*2, sh*2, sw, sh, w - sw, h - sh, sw, sh); // down right
            bitmap.blt(skin, 0, sh, sw, sh, 0, sh, sw, h - 2*sh); // left
            bitmap.blt(skin, sw, 0, sw, sh, sw, 0, w - 2*sw, sh); // up
            bitmap.blt(skin, 2*sw, sh, sw, sh, w - sw, sh, sw, h - 2*sh); // right
            bitmap.blt(skin, sw, 2*sh, sw, sh, sw, h - sh, w - 2*sw, sh); // down
            bitmap.blt(skin, sw, sh, sw, sh, sw, sh, w - 2*sw, h - 2*sh); // center

            var tone = this._colorTone;
            bitmap.adjustTone(tone[0], tone[1], tone[2]);
        };
    } else {
        __Window__refreshBack.call(this);
    }
};

var __Window__refreshFrame = Window.prototype._refreshFrame;
Window.prototype._refreshFrame = function() {
    if(this._isUditaskin) {
        var w = this._width;
        var h = this._height;
        var bitmap = new Bitmap(w, h);

        this._windowFrameSprite.bitmap = bitmap;
        this._windowFrameSprite.setFrame(0, 0, w, h);
    } else {
        __Window__refreshFrame.call(this);
    }
};

var __Window__refreshPauseSign = Window.prototype._refreshPauseSign;
Window.prototype._refreshPauseSign = function() {
    if(this._isUditaPauseSign) {
        var bitmap = this._uditaPauseSign;
        var w = bitmap.width;
        var h = Math.floor(bitmap.height / 6);
        this._windowPauseSignSprite.bitmap = bitmap;
        this._windowPauseSignSprite.anchor.x = 0.5;
        this._windowPauseSignSprite.anchor.y = 1;
        switch(RSSD.UditaUI.uditaPauseSignPosition) {
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
        this._windowPauseSignSprite.move(psx, psy);
        this._windowPauseSignSprite.setFrame(0, 0, w, h);
        this._windowPauseSignSprite.alpha = 0;
    } else {
        __Window__refreshPauseSign.call(this);
    }
};

var __Window__updatePauseSign = Window.prototype._updatePauseSign;
Window.prototype._updatePauseSign = function() {
    if(this._isUditaPauseSign) {
        var sprite = this._windowPauseSignSprite;
        var frames = RSSD.UditaUI.uditaPauseSignFrames;
        var speed = RSSD.UditaUI.uditaPauseSignSpeed;
        var x = 0;
        var y = Math.floor(this._animationCount / speed) % frames;
        var w = sprite.bitmap.width;
        var h = Math.floor(sprite.bitmap.height / frames);
        if (!this.pause) {
            sprite.alpha = 0;
        } else if (sprite.alpha < 1) {
            sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
        }
        sprite.setFrame(x, y*h, w, h);
        sprite.visible = this.isOpen();
    } else {
        __Window__updatePauseSign.call(this);
    }
};

var __Window__refreshCursor = Window.prototype._refreshCursor;
Window.prototype._refreshCursor = function() {
    if(RSSD.UditaUI.isUseCursor) {
        var pad = this._padding;
        var x = this._cursorRect.x + pad - this.origin.x;
        var y = this._cursorRect.y + pad - this.origin.y;
        var w = this._cursorRect.width;
        var h = this._cursorRect.height;
        var x2 = Math.max(x, pad);
        var y2 = Math.max(y, pad);
        var ox = x - x2;
        var oy = y - y2;
        var w2 = Math.min(w, this._width - pad - x2);
        var h2 = Math.min(h, this._height - pad - y2);
        var bitmap = new Bitmap(w2, h2);
    
        this._windowCursorSprite.bitmap = bitmap;
        this._windowCursorSprite.setFrame(0, 0, w2, h2);
        this._windowCursorSprite.move(x2, y2);
    
        if (w > 0 && h > 0 && this._uditaCursor) {
            var skin = this._uditaCursor;
            var p = 0;
            var q = this._uditaCursor.width;
            var m = Math.floor(this._uditaCursor.width / 3);
            bitmap.blt(skin, p+m, p+m, q-m*2, q-m*2, ox+m, oy+m, w-m*2, h-m*2);
            bitmap.blt(skin, p+m, p+0, q-m*2, m, ox+m, oy+0, w-m*2, m);
            bitmap.blt(skin, p+m, p+q-m, q-m*2, m, ox+m, oy+h-m, w-m*2, m);
            bitmap.blt(skin, p+0, p+m, m, q-m*2, ox+0, oy+m, m, h-m*2);
            bitmap.blt(skin, p+q-m, p+m, m, q-m*2, ox+w-m, oy+m, m, h-m*2);
            bitmap.blt(skin, p+0, p+0, m, m, ox+0, oy+0, m, m);
            bitmap.blt(skin, p+q-m, p+0, m, m, ox+w-m, oy+0, m, m);
            bitmap.blt(skin, p+0, p+q-m, m, m, ox+0, oy+h-m, m, m);
            bitmap.blt(skin, p+q-m, p+q-m, m, m, ox+w-m, oy+h-m, m, m);
        }
    } else {
        __Window__refreshCursor.call(this);
    }
}

var __Window_updateTransfrom = Window.prototype.updateTransform;
Window.prototype.updateTransform = function() {
    this._updateWindowskinStyle();
    this._updatePauseSignStyle();
    this._updateCursorStyle();
    __Window_updateTransfrom.call(this);
};

Window.prototype._updateWindowskinStyle = function() {
    if(this._isUditaskinpri !== this._isUditaskin) {
        this._refreshBack();
        this._refreshFrame();
        if(this._isUditaskin) {
            this._windowBackSprite.alpha = 1;
        } else {
            this._windowBackSprite.alpha = 192 / 255;
        }
    };
    this._isUditaskinpri = this._isUditaskin;
};

Window.prototype._updatePauseSignStyle = function() {
    if(this._isUditaPauseSignpri !== this._isUditaPauseSign) {
        this._refreshPauseSign();
    };
    this._isUditaPauseSignpri = this._isUditaPauseSign;
};

Window.prototype._updateCursorStyle = function() {
    if(this._isUditaCursorpri !== this._isUditaCursor) {
        this._refreshCursor();
    };
    this._isUditaCursorpri = this._isUditaCursor;
};

var __Window__updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
    if(this._isUditaCursor && !RSSD.UditaUI.isCursorBlinking) {
        this._windowCursorSprite.alpha = 1;
    } else {
        __Window__updateCursor.call(this);
    };
};

//===============================================================
// Window_Base
//===============================================================

var __Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
    __Window_Base_initialize.call(this, x, y, width, height);
    this.loadUditaskin();
    this.loadUditaPauseSign();
    this.loadUditaCursor();
    this._uditaskinName = RSSD.UditaUI.uditaskin;
    this._uditaPauseSignName = RSSD.UditaUI.uditaPauseSign;
    this._uditaCursorName = RSSD.UditaUI.uditaCursor;
};

Window_Base.prototype.loadUditaskin = function() {
    this.uditaskin = ImageManager.loadSystem(RSSD.UditaUI.uditaskin);
};

Window_Base.prototype.loadUditaPauseSign = function() {
    this.uditaPauseSign = ImageManager.loadSystem(RSSD.UditaUI.uditaPauseSign);
};

Window_Base.prototype.loadUditaCursor = function() {
    this.uditaCursor = ImageManager.loadSystem(RSSD.UditaUI.uditaCursor);
};

var __Window_Base_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
    __Window_Base_update.call(this);
    this._isUditaskin = RSSD.UditaUI.isUseSkin;
    this._isUditaPauseSign = RSSD.UditaUI.isUsePauseSign;
    this._isUditaCursor = RSSD.UditaUI;
    if(this._uditaskinName !== RSSD.UditaUI.uditaskin) {
        this.loadUditaPauseSign();
    };
    if(this._uditaPauseSignName !== RSSD.UditaUI.uditaPauseSign) {
        this.loadUditaskin();
    };
    if(this._uditaCursorName !== RSSD.UditaUI.uditaCursor) {
        this.loadUditaCursor();
    };
    this._uditaskinName = RSSD.UditaUI.uditaskin;
    this._uditaPauseSignName = RSSD.UditaUI.uditaPauseSign;
    this._uditaCursorName = RSSD.UditaUI.uditaCursor;
};

//==============================================================================
// Window_MenuStatus
//==============================================================================

let __Window_MenuStatus_drawPendingItemBackground = Window_MenuStatus.prototype.drawItemBackground;
Window_MenuStatus.prototype.drawItemBackground = function(index) {
    if(this._uditaCursor && this._isUditaCursor) {
        if (index === this._pendingIndex) {
            const skin = this._uditaCursor;
            const srect = {x: 0, y: 0, width: skin.width, height: skin.height};
            const drect = this.itemRect(index);
            this.changePaintOpacity(false);
            this.contents.setRectPartsGeometry_9slice(skin, srect, drect);
            this.changePaintOpacity(true);
        }
    } else {
        __Window_MenuStatus_drawPendingItemBackground.call(this, index);
    }
};

//===============================================================
// DataManager
//===============================================================

var __DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = __DataManager_makeSaveContents.call(this);
    contents.RSSD = contents.RSSD || {};
    contents.RSSD.UditaUI_isUseSkin = RSSD.UditaUI.isUseSkin;
    contents.RSSD.UditaUI_isUsePauseSign = RSSD.UditaUI.isUsePauseSign;
    contents.RSSD.UditaUI_isUseCursor = RSSD.UditaUI.isUseCursor;
    contents.RSSD.UditaUI_uditaskin = RSSD.UditaUI.uditaskin;
    contents.RSSD.UditaUI_uditaPauseSign = RSSD.UditaUI.uditaPauseSign;
    contents.RSSD.UditaUI_uditaCursor = RSSD.UditaUI.uditaCursor;
    return contents;
};

var __DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    __DataManager_extractSaveContents.call(this, contents);
    RSSD.UditaUI.isUseSkin = contents.RSSD.UditaUI_isUseSkin;
    RSSD.UditaUI.isUsePauseSign = contents.RSSD.UditaUI_isUsePauseSign;
    RSSD.UditaUI.isUseCursor = contents.RSSD.UditaUI_isUseCursor;
    RSSD.UditaUI.uditaskin = contents.RSSD.UditaUI_uditaskin;
    RSSD.UditaUI.uditaPauseSign = contents.RSSD.UditaUI_uditaPauseSign;
    RSSD.UditaUI.uditaCursor = contents.RSSD.UditaUI_uditaCursor;
};
