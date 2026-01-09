//=============================================================================================
// RSSD_SlicingUI.js
// Author: Rose_shadows
//=============================================================================================
/*:
 * @plugindesc 1.0.0 - 切片UI
 * @author 离影玫 | Rose_shadows
 * @target MZ
 * @help 
 * === 介绍 ===
 * 
 * 该插件允许你在 RMMZ 中使用九宫格切片格式的窗口皮肤、选择光标，
 * 同时提供了绘制九宫格、三宫格切片格式的UI的函数。
 * 另外，还提供用一张图片额外设置对话暂停光标的功能。
 * 
 * 窗口皮肤和选择光标的图像选用九宫格切片方式。
 * 九宫格切片（9 Slice）指将皮肤图片横纵均匀切割成九宫格九个部分，
 * 取其左上、右上、左下、右下切片，保持原样，绘制到窗口的四角部分，
 * 再取其上、下、左、右切片，经过拉伸，绘制到窗口四边剩下的部分，
 * 最后取其中间的切片，经过拉伸，填充窗口中心的空缺部分。
 * 
 * 对于对话暂停光标的格式：
 * 是指将所有动画帧*从上到下*，排成*一列*的格式。
 * 该插件允许你调整光标的位置、帧数和动画速度，具体可见插件参数。
 * 
 * 九宫格切片选择光标和窗口皮肤里的选择光标格式一样。
 * 
 * !注意! 
 * 1. 请将插件放在插件管理器靠上的位置，以保证兼容性。
 * 2. 该插件目前除了窗口皮肤、选择光标和消息暂停光标本身外，
 *    其他有关RM窗口元素的设置仍以 RM 格式皮肤上的图像为准。
 * 3. RM 窗口的行高默认为36像素，
 *    所以不建议使用宽高远大于这个值的九宫格切片UI图像，
 *    否则在宽度或高度较小的窗口或指令中，UI图像中间的过渡将很不自然。
 * 
 * 
 * === 开发者脚本 ===
 * 
 * Window_xxx.prototype.loadSlicingskin = function() {
 *     // 启用九宫格切片格式的窗口皮肤，并使用 Slicingskin.png 
 *     this.slicingskin = ImageManager.loadSystem('Slicingskin');
 *     // 禁用九宫格切片格式的窗口皮肤
 *     this.slicingskin = null;
 * };
 * 
 * Window_xxx.prototype.loadSlicingCursor = function() {
 *     // 启用九宫格切片格式的选择光标，并使用 SlicingCursor.png 
 *     this.slicingCursor = ImageManager.loadSystem('SlicingCursor');
 *     // 禁用九宫格切片格式的选择光标
 *     this.slicingCursor = null;
 * };
 * 
 * Window_xxx.prototype.loadSlicingPauseSign = function() {
 *     // 启用该插件设定的格式的对话暂停光标，并使用 SlicingPauseSign.png 
 *     this.slicingPauseSign = ImageManager.loadSystem('SlicingPauseSign');
 *     // 禁用该插件设定的格式的对话暂停光标
 *     this.slicingPauseSign = null;
 * };
 * 
 * 新增方法：
 * 
 * Bitmap.prototype.setRectPartsGeometry_9slice(source, srect, drect, wm, hm)
 * - 在Bitmap实例上绘制九宫格格式的图像。
 *   param {Bitmap} source 源slice9的UI图像
 *   param {Rectangle} srect 原位置Rectangle对象
 *   param {Rectangle} drect 目的位置Rectangle对象，若省略则使用srect的值
 *   param {Number} wm 横向缩进，默认为源slice9图像的1/3
 *   param {Number} hm 纵向缩进，默认为源slice9图像的1/3
 * 
 * Bitmap.prototype.setRectPartsGeometry_3slice_Horz(source, srect, drect, wm)
 * - 在Bitmap实例上绘制横向三宫格格式的图像。可用于绘制按钮。
 *   param {Bitmap} source 源slice3的UI图像
 *   param {Rectangle} srect 原位置Rectangle对象
 *   param {Rectangle} drect 目的位置Rectangle对象，若省略则使用srect的值
 *   param {Number} wm 横向缩进，默认为源slice3图像的1/3
 * 
 * Bitmap.prototype.setRectPartsGeometry_3slice_Vert(source, srect, drect, hm)
 * - 在Bitmap实例上绘制纵向三宫格格式的图像。可用于绘制滚动条。
 *   param {Bitmap} source 源slice3的UI图像
 *   param {Rectangle} srect 原位置Rectangle对象
 *   param {Rectangle} drect 目的位置Rectangle对象，若省略则使用srect的值
 *   param {Number} hm 纵向缩进，默认为源slice3图像的1/3
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
 * 
 * 
 * 
 * @param === 通用设置 ===
 * 
 * @param 默认RM格式皮肤
 * @parent === 通用设置 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 颜色代码等设定依然需要从默认RMMV格式皮肤上获取。另外，若不使用切片格式的皮肤等部件，则会用以该图像为基础的RM格式UI。
 * @default Window
 * 
 * @param 是否隐藏指令背景
 * @parent === 通用设置 ===
 * @type boolean
 * @desc 是否不绘制指令的暗淡背景？
 * @default false
 * 
 * @param === 窗口皮肤 ===
 * 
 * @param 切片格式默认窗口皮肤
 * @parent === 窗口皮肤 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的切片格式窗口皮肤。放在 img/system/ 目录下。若设为空，则使用该插件设置的默认RM格式皮肤。
 * @default Window_slice9
 * 
 * @param 切片格式皮肤是否强制不透明
 * @parent === 窗口皮肤 ===
 * @type boolean
 * @desc 默认情况下切片格式的皮肤不透明度与系统设置中的窗口不透明度一致。若设为true，切片格式的皮肤不透明度强制设为255。
 * @default true
 * 
 * @param === 对话暂停光标 ===
 * 
 * @param 切片格式默认暂停光标
 * @parent === 对话暂停光标 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的切片格式对话暂停光标。放在 img/system/ 目录下。若设为空，则使用该插件设置的默认RM格式皮肤。
 * @default TextPause
 * 
 * @param 切片格式暂停光标位置
 * @parent === 对话暂停光标 ===
 * @type select
 * @option 左
 * @value 0
 * @option 中
 * @value 1
 * @option 右
 * @value 2
 * @desc 切片格式对话暂停光标在窗口下方的位置。
 * 0 - 左，1 - 中，2 - 右
 * @default 1
 * 
 * @param 切片格式暂停光标帧数
 * @parent === 对话暂停光标 ===
 * @type number
 * @min 1
 * @desc 切片格式对话暂停光标的动画帧数。默认是6帧。
 * @default 4
 * 
 * @param 切片格式暂停光标动画速度
 * @parent === 对话暂停光标 ===
 * @type number
 * @min 1
 * @desc 切片格式对话暂停光标的动画速度。数字越小，速度越快。默认是12
 * @default 18
 * 
 * @param === 选择光标 ===
 * 
 * @param 切片格式默认选择光标
 * @parent === 选择光标 ===
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 默认的切片格式选择光标。放在 img/system/ 目录下。若设为空，则使用该插件设置的默认RM格式皮肤。
 * @default Cursor_slice9
 * 
 * @param 切片格式选择光标是否闪烁
 * @parent === 选择光标 ===
 * @type boolean
 * @on 闪烁
 * @off 不闪烁
 * @default 切片格式选择光标是否闪烁？
 * @default true
 */
var Imported = Imported || {};
Imported.RSSD_SlicingUI = true;

var RSSD = RSSD || {};
RSSD.SUI = {};

RSSD.SUI.pluginName = 'RSSD_SlicingUI';
RSSD.SUI.parameters = PluginManager.parameters(RSSD.SUI.pluginName);
RSSD.SUI.windowskin = RSSD.SUI.parameters['默认RM格式皮肤'] || 'Window';
RSSD.SUI.slicingskin = RSSD.SUI.parameters['切片格式默认窗口皮肤'] || '';
RSSD.SUI.slicingS_OpacityForced = RSSD.SUI.parameters['切片格式皮肤是否强制不透明'] === 'true';
RSSD.SUI.slicingPauseSign = RSSD.SUI.parameters['切片格式默认暂停光标'] || '';
RSSD.SUI.slicingPS_Pos = +RSSD.SUI.parameters['切片格式暂停光标位置'] || 1;
RSSD.SUI.slicingPS_Frame = +RSSD.SUI.parameters['切片格式暂停光标帧数'] || 6;
RSSD.SUI.slicingPS_Speed = +RSSD.SUI.parameters['切片格式暂停光标动画速度'] || 12;
RSSD.SUI.slicingCursor = RSSD.SUI.parameters['切片格式默认选择光标'] || '';
RSSD.SUI.slicingC_Blinking = RSSD.SUI.parameters['切片格式选择光标是否闪烁'] === 'true';
RSSD.SUI.hideCmdBack = RSSD.SUI.parameters['是否隐藏指令背景'] === 'true';

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

/**
 * 在Bitmap实例上绘制横向三宫格格式的图像
 * @param {Bitmap} source 源slice3的UI图像
 * @param {Rectangle} srect 原位置Rectangle对象
 * @param {Rectangle} drect 目的位置Rectangle对象，若省略则使用srect的值
 * @param {Number} wm 横向缩进，默认为源slice3图像的1/3
 */
Bitmap.prototype.setRectPartsGeometry_3slice_Horz = function(source, srect, drect, wm) {
    const sx = srect.x, sy = srect.y, sw = srect.width, sh = srect.height;
    drect = drect || srect;
    const dx = drect.x, dy = drect.y, dw = drect.width, dh = drect.height;
    wm = wm || Math.floor(sw / 3);
    const skin = source;
    this.blt(skin, sx, sy, wm, sh, dx, dy, wm, dh); // left
    this.blt(skin, sx + sw - wm, sy, wm, sh, dx + dw - wm, dy, wm, dh); // right
    this.blt(skin, sx + wm, sy, sw - 2*wm, sh, dx + wm, dy, dw - 2*wm, dh); // center
};

/**
 * 在Bitmap实例上绘制纵向三宫格格式的图像
 * @param {Bitmap} source 源slice3的UI图像
 * @param {Rectangle} srect 原位置Rectangle对象
 * @param {Rectangle} drect 目的位置Rectangle对象，若省略则使用srect的值
 * @param {Number} hm 纵向缩进，默认为源slice3图像的1/3
 */
Bitmap.prototype.setRectPartsGeometry_3slice_Vert = function(source, srect, drect, hm) {
    const sx = srect.x, sy = srect.y, sw = srect.width, sh = srect.height;
    drect = drect || srect;
    const dx = drect.x, dy = drect.y, dw = drect.width, dh = drect.height;
    hm = hm || Math.floor(sw / 3);
    const skin = source;
    this.blt(skin, sx, sy, sw, hm, dx, dy, dw, hm); // up
    this.blt(skin, sx, sy + sh - hm, sw, hm, dx, dy + dh - hm, dw, hm); // down
    this.blt(skin, sx, sy + hm, sw, sh - 2*hm, dx, dy + hm, dw, dh - 2*hm); // center
};

//==============================================================================
// Window
//==============================================================================

let __RSSD_SUI_Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
    __RSSD_SUI_Window_initialize.call(this);
    this._slicingskin = null;
    this._slicingPauseSign = null;
    this._slicingCursor = null;
};

/**
 * 用作窗口皮肤的切片格式图片。
 * The skin bitmap in 9 slicing format.
 * 
 * @property slicingskin
 * @type bitmap
 */

Object.defineProperty(Window.prototype, 'slicingskin', {
    get: function() {
        return this._slicingskin;
    },
    set: function(value) {
        if (this._slicingskin !== value) {
            this._slicingskin = value;
            if(value) {
                this._slicingskin.addLoadListener(this._onSlicingskinLoad.bind(this));
            }
        }
    },
    configurable: true
});

Window.prototype._onSlicingskinLoad = function() {
    this._onWindowskinLoad();
};

/**
 * 用作对话暂停光标的切片格式图片。
 * The pause sign bitmap in 9 slicing format.
 * 
 * @property slicingPauseSign
 * @type bitmap
 */
Object.defineProperty(Window.prototype, 'slicingPauseSign', {
    get: function() {
        return this._slicingPauseSign;
    },
    set: function(value) {
        if(this._slicingPauseSign !== value) {
            this._slicingPauseSign = value;
            if(value) {
                this._slicingPauseSign.addLoadListener(this._onSlicingPauseSignLoad.bind(this));
            }
        }
    },
    configurable: true
});

Window.prototype._onSlicingPauseSignLoad = function() {
    this._refreshPauseSign();
};

/**
 * 用作选择光标的切片格式图片。
 * The cursor bitmap in 9 slicing format.
 * 
 * @property slicingCursor
 * @type bitmap
 */
 Object.defineProperty(Window.prototype, 'slicingCursor', {
    get: function() {
        return this._slicingCursor;
    },
    set: function(value) {
        if(this._slicingCursor !== value) {
            this._slicingCursor = value;
            if(value) {
                this._slicingCursor.addLoadListener(this._onSlicingCursorLoad.bind(this));
            }
        }
    },
    configurable: true
});

Window.prototype._onSlicingCursorLoad = function() {
    this._refreshCursor();
};

let __RSSD_SUI_Window__createBackSprite = Window.prototype._createBackSprite;
Window.prototype._createBackSprite = function() {
    __RSSD_SUI_Window__createBackSprite.call(this);
    for (let i = 0; i < 9; i++) {
        this._backSprite.addChild(new Sprite());
    }
};

let __RSSD_SUI_Window__refreshBack = Window.prototype._refreshBack;
Window.prototype._refreshBack = function() {
    if(this._slicingskin){
        this._refreshSlicingBack();
    } else {
        const sprite = this._backSprite;
        for(const child of sprite.children) {
            child.bitmap = null;
        }
        __RSSD_SUI_Window__refreshBack.call(this);
    }
};

let __RSSD_SUI_Window__refreshFrame = Window.prototype._refreshFrame;
Window.prototype._refreshFrame = function() {
    if(this._slicingskin) {
        for(const child of this._frameSprite.children) {
            child.bitmap = null;
        }
    } else {
        __RSSD_SUI_Window__refreshFrame.call(this);
    }
};

let __RSSD_SUI_Window__refreshCursor = Window.prototype._refreshCursor;
Window.prototype._refreshCursor = function() {
    if(this._slicingCursor) {
        this._refreshSlicingCursor();
    } else {
        __RSSD_SUI_Window__refreshCursor.call(this);
    }
};

let __RSSD_SUI_Window__refreshPauseSign = Window.prototype._refreshPauseSign;
Window.prototype._refreshPauseSign = function() {
    if(this._slicingPauseSign) {
        this._refreshSlicingPauseSign();
    } else {
        __RSSD_SUI_Window__refreshPauseSign.call(this);
    }
};

let __RSSD_SUI_Window__updatePauseSign = Window.prototype._updatePauseSign;
Window.prototype._updatePauseSign = function() {
    if(this._slicingPauseSign) {
        this._updateSlicingPauseSign();
    } else {
        __RSSD_SUI_Window__updatePauseSign.call(this);
    }
};

Window.prototype._refreshSlicingBack = function() {
    const bitmap = this._slicingskin;
    const backSprite = this._backSprite;
    backSprite.bitmap = null;
    backSprite.scale.x = 1;
    backSprite.scale.y = 1;
    backSprite.children[0].bitmap = null;
    const drect = { x: 0, y: 0, width: this._width, height: this._height };
    const srect = { x: 0, y: 0, width: bitmap.width, height: bitmap.height };
    const wm = bitmap.width / 3;
    const hm = bitmap.height / 3;
    for (const child of backSprite.children) {
        child.bitmap = this._slicingskin;
    }
    this._setRectPartsGeometry_9slice(backSprite, srect, drect, wm, hm, 1); // children[0]是纹理遮罩TilingSprite()实例，所以需要偏移1个索引
    backSprite.setColorTone(this._colorTone);
};

Window.prototype._refreshSlicingCursor = function() {
    const bitmap = this._slicingCursor;
    const drect = this._cursorRect.clone();
    const srect = { x: 0, y: 0, width: bitmap.width, height: bitmap.height };
    const m = Math.floor(bitmap.width / 3);
    for (const child of this._cursorSprite.children) {
        child.bitmap = bitmap;
    }
    this._setRectPartsGeometry_9slice(this._cursorSprite, srect, drect, m, m);
};

Window.prototype._refreshSlicingPauseSign = function() {
    const bitmap = this._slicingPauseSign;
    const w = bitmap.width;
    const h = Math.floor(bitmap.height / RSSD.SUI.slicingPS_Frame);
    const pauseSignSprite = this._pauseSignSprite;
    pauseSignSprite.bitmap = bitmap;
    pauseSignSprite.anchor.x = 0.5;
    pauseSignSprite.anchor.y = 1;
    switch(RSSD.SUI.slicingPS_Pos) {
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
};

Window.prototype._updateSlicingPauseSign = function() {
    const sprite = this._pauseSignSprite;
    const frames = RSSD.SUI.slicingPS_Frame;
    const speed = RSSD.SUI.slicingPS_Speed;
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
};

Window.prototype._setRectPartsGeometry_9slice = function(sprite, srect, drect, wm, hm, shiftIndex=0) {
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
    children[0+shiftIndex].setFrame(sx, sy, wm, hm);
    children[1+shiftIndex].setFrame(sx + sw - wm, sy, wm, hm);
    children[2+shiftIndex].setFrame(sx, sy + sh - hm, wm, hm);
    children[3+shiftIndex].setFrame(sx + sw - wm, sy + sh - hm, wm, hm);
    children[0+shiftIndex].move(0, 0);
    children[1+shiftIndex].move(dw - wm, 0);
    children[2+shiftIndex].move(0, dh - hm);
    children[3+shiftIndex].move(dw - wm, dh - hm);
    // edge
    children[4+shiftIndex].move(wm, 0);
    children[5+shiftIndex].move(wm, dh - hm);
    children[6+shiftIndex].move(0, hm);
    children[7+shiftIndex].move(dw - wm, hm);
    children[4+shiftIndex].setFrame(sx + wm, sy, smw, hm);
    children[5+shiftIndex].setFrame(sx + wm, sy + sh - hm, smw, hm);
    children[6+shiftIndex].setFrame(sx, sy + hm, wm, smh);
    children[7+shiftIndex].setFrame(sx + sw - wm, sy + hm, wm, smh);
    children[4+shiftIndex].scale.x = dmw / smw;
    children[5+shiftIndex].scale.x = dmw / smw;
    children[6+shiftIndex].scale.y = dmh / smh;
    children[7+shiftIndex].scale.y = dmh / smh;
    // center
    if (children[8+shiftIndex]) {
        children[8+shiftIndex].setFrame(sx + wm, sy + hm, smw, smh);
        children[8+shiftIndex].move(wm, hm);
        children[8+shiftIndex].scale.x = dmw / smw;
        children[8+shiftIndex].scale.y = dmh / smh;
    }
    for (const child of children) {
        child.visible = dw > 0 && dh > 0;
    }
};

let __RSSD_SUI_Window__updateCursor = Window.prototype._updateCursor;
Window.prototype._updateCursor = function() {
    if(!RSSD.SUI.slicingC_Blinking) {
        this._cursorSprite.alpha = 1;
    } else {
        __RSSD_SUI_Window__updateCursor.call(this);
    };
};

//==============================================================================
// Window_Base
//==============================================================================

let __RSSD_SUI_Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
    __RSSD_SUI_Window_Base_initialize.call(this, rect);
    this.loadSlicingBitmaps();
};

Window_Base.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(RSSD.SUI.windowskin);
};

Window_Base.prototype.updateBackOpacity = function() {
    if(RSSD.SUI.slicingS_OpacityForced) {
        this.backOpacity = 255;
    } else {
        this.backOpacity = $gameSystem.windowOpacity();
    }
};

Window_Base.prototype.loadSlicingBitmaps = function() {
    this.loadSlicingskin();
    this.loadSlicingCursor();
    this.loadSlicingPauseSign();
};

Window_Base.prototype.loadSlicingskin = function() {
    if(RSSD.SUI.slicingskin) {
        this.slicingskin = ImageManager.loadSystem(RSSD.SUI.slicingskin);
    } else {
        this.slicingskin = null;
    }
};

Window_Base.prototype.loadSlicingCursor = function() {
    if(RSSD.SUI.slicingCursor) {
        this.slicingCursor = ImageManager.loadSystem(RSSD.SUI.slicingCursor);
    } else {
        this.slicingCursor = null;
    }
};

Window_Base.prototype.loadSlicingPauseSign = function() {
    if(RSSD.SUI.slicingPauseSign) {
        this.slicingPauseSign = ImageManager.loadSystem(RSSD.SUI.slicingPauseSign);
    } else {
        this.slicingPauseSign = null;
    }
};

//==============================================================================
// Window_Selectable
//==============================================================================

let __RSSD_SUI_Window_Selectable_drawBackgroundRect = Window_Selectable.prototype.drawBackgroundRect;
Window_Selectable.prototype.drawBackgroundRect = function(rect) {
    if(!RSSD.SUI.hideCmdBack) {
        __RSSD_SUI_Window_Selectable_drawBackgroundRect.call(this, rect);
    }
};

//==============================================================================
// Window_MenuStatus
//==============================================================================

let __RSSD_SUI_Window_MenuStatus_drawPendingItemBackground = Window_MenuStatus.prototype.drawPendingItemBackground;
Window_MenuStatus.prototype.drawPendingItemBackground = function(index) {
    if(this._slicingCursor) {
        if (index === this._pendingIndex) {
            const skin = this._slicingCursor;
            const srect = {x: 0, y: 0, width: skin.width, height: skin.height};
            const drect = this.itemRect(index);
            this.changePaintOpacity(false);
            this.contents.setRectPartsGeometry_9slice(skin, srect, drect);
            this.changePaintOpacity(true);
        }
    } else {
        __RSSD_SUI_Window_MenuStatus_drawPendingItemBackground.call(this, index);
    }
};