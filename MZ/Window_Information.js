//=============================================================================================
// Window_Information.js
// Author: Rose_shadows
//=============================================================================================
/*:
 * @plugindesc 1.0.0 - 带简易滚动条的信息板窗口类
 * @author Rose_shadows
 * @target MZ
 * @help
 * 
 * 该插件新增了一个窗口类，该窗口类的实例自带长文本滚动条的功能。
 * 若检测到文本高度超出窗口可视高度，则会在右侧自动绘制滚动条。
 * 不仅可以用上下键和鼠标滚轮滚动文本，还可以用鼠标或手指直接
 * 上下拖动文本或滚动条。
 * 另外，滚动条还包括了闲置状态和悬停状态时的位图图像。
 * 
 * 该窗口的实例可以用于图书菜单图书内容、单窗口的布告栏等等。
 * 
 * 注意：判断是否需要滚动条时只会检测文本的高度，
 * 无法检测到通过代码预先绘制的图像高度等非文本元素。
 * 
 * 
 * 新增类：
 * Window_Information - 带简易滚动条的信息板窗口类
 * 
 * 使用方法可看代码部分最后的 Scene_Map 示例。将被注掉的代码还原出来即可。
 * 
 */
var Imported = Imported || {};
Imported.Window_Information = true;

var RSSD = RSSD || {};
RSSD.WIN_INFO = {};
RSSD.WIN_INFO.pluginName = 'Window_Infomation';

//==============================================================================
// Game_Temp
//==============================================================================

let __RSSD_WIN_INFO_Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    __RSSD_WIN_INFO_Game_Temp_initialize.call(this);
    this.__private_RSSD_WIN_INFO_mouseX = 0;
    this.__private_RSSD_WIN_INFO_mouseY = 0;
};

Game_Temp.prototype._private_RSSD_WIN_INFO_mouseX = function() {
    return this.__private_RSSD_WIN_INFO_mouseX;
};

Game_Temp.prototype._private_RSSD_WIN_INFO_mouseY = function() {
    return this.__private_RSSD_WIN_INFO_mouseY;
};

//==============================================================================
// TouchInput
//==============================================================================

let __RSSD_WIN_INFO_TouchInput_clear = TouchInput.clear;
TouchInput.clear = function() {
    __RSSD_WIN_INFO_TouchInput_clear.call(this);
    this.__private_RSSD_WIN_INFO_windowBoardLastY = 0;
};

let __RSSD_WIN_INFO_TouchInput_onTrigger = TouchInput._onTrigger;
TouchInput._onTrigger = function(x, y) {
    if (this.isMoved()) return;
    __RSSD_WIN_INFO_TouchInput_onTrigger.call(this, x, y);
    this.__private_RSSD_WIN_INFO_windowBoardLastY = this.y;
};

let __RSSD_WIN_INFO_TouchInput_onMove = TouchInput._onMove;
TouchInput._onMove = function(x, y) {
    this.__private_RSSD_WIN_INFO_windowBoardLastY = this.y;
    __RSSD_WIN_INFO_TouchInput_onMove.call(this, x, y);
};

let __RSSD_WIN_INFO_TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    if($gameTemp) {
        $gameTemp.__private_RSSD_WIN_INFO_mouseX = Graphics.pageToCanvasX(event.pageX);
        $gameTemp.__private_RSSD_WIN_INFO_mouseY = Graphics.pageToCanvasX(event.pageY);
    }
    __RSSD_WIN_INFO_TouchInput_onMouseMove.call(this, event);
};

TouchInput._private_RSSD_WIN_INFO_windowBoardLastY = function() {
    return this.__private_RSSD_WIN_INFO_windowBoardLastY;
};

//==============================================================================
// Window_Information
//==============================================================================

function Window_Information() {
    this.initialize(...arguments);
}

Window_Information.prototype = Object.create(Window_Base.prototype);
Window_Information.prototype.constructor = Window_Information;

Window_Information.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._maxBitmapHeight = 2048;
    this._text = '';
    this._allTextHeight = 0;
    this._scrollbarBaseSprite = null;
    this._scrollbarCtrlSprite = null;
    this._isScrollbarActive = false;
    this._forceNeedsScrollBar = false;
    this._isScrollbarEnabled = true;
};

// 为了兼容Visu的自动换行必须这么写
Object.defineProperty(Window_Information.prototype, 'innerWidth', {
    get: function() {return Math.max(0, this._width - this._padding * 2) - this.scrollbarPadding();},
    configurable: true
});

Window_Information.prototype.contentsHeight = function() {
     if (this._allTextHeight > 0) {
        return Math.min(this._allTextHeight, this._maxBitmapHeight);
    } else {
        return 0;
    }
};

Window_Information.prototype.setScrollbarBaseSprite = function(sprite) {
    this._scrollbarBaseSprite = sprite;
};

Window_Information.prototype.setScrollbarCtrlSprite = function(sprite) {
    this._scrollbarCtrlSprite = sprite;
};

Window_Information.prototype.needsScrollBar = function() {
    return (this.contentsHeight() > this.innerHeight || this._forceNeedsScrollBar) && this._isScrollbarEnabled;
};

Window_Information.prototype.scrollbarPadding = function() {
    if(this.needsScrollBar()) return this.scrollbarPaddingWidth();
    return 0;
};

Window_Information.prototype.scrollbarPaddingWidth = function() {
    return 10;
};

Window_Information.prototype.scrollbarBaseHeight = function() {
    return this.innerHeight;
};

Window_Information.prototype.scrollbarCtrlHeight = function() {
    return this.innerHeight - (this.contentsHeight() - this.innerHeight) / this.scrollAccel() - 2 * this.scrollbarCtrlPaddingY();
};

Window_Information.prototype.scrollbarCtrlPaddingY = function() {
    return 5;
};

Window_Information.prototype.scrollbarX = function() {
    return this.x + this.width - this.padding - this.scrollbarPaddingWidth() / 2;
};

Window_Information.prototype.scrollbarBaseY = function() {
    return this.y + this.padding;
};

Window_Information.prototype.scrollbarCtrlStartY = function() {
    return this.scrollbarBaseY() + this.scrollbarCtrlPaddingY();
};

Window_Information.prototype.scrollbarCtrlEndY = function() {
    return this.y + this.height - this.padding - this.scrollbarCtrlPaddingY() - this.scrollbarCtrlHeight();
};

Window_Information.prototype.scrollOriginEndY = function() {
    return this.contentsHeight() - this.innerHeight;
};

Window_Information.prototype.scrollAccel = function() {
    const rate = Math.max(Math.floor(this.contentsHeight() / this.innerHeight), 2);
    const add = Math.floor(rate / 3);
    return rate + add;
};

Window_Information.prototype.isScrollArrowVisible = function() {
    return true;
};

Window_Information.prototype.isScrollbarActive = function() {
   return this._isScrollbarActive;
};

Window_Information.prototype.isMouseInsideFrame = function() {
    if($gameTemp) {
        const mouseX = $gameTemp._private_RSSD_WIN_INFO_mouseX(), mouseY = $gameTemp._private_RSSD_WIN_INFO_mouseY();
        const left = this.x + this.padding, right = this.x + this.padding + this.innerWidth, top = this.y + this.padding, bottom = this.y + this.padding + this.innerHeight;
        return mouseX.clamp(left, right) === mouseX && mouseY.clamp(top, bottom) === mouseY;  
    }
    return false;
};

Window_Information.prototype.isTouchedInsideFrame = function() {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return this.innerRect.contains(localPos.x, localPos.y);
};

Window_Information.prototype.setText = function(text) {
    this._text = text;
};

Window_Information.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateScrollbarSprite();
    this.updateMessage();
    this.updateTouchScroll();
};

Window_Information.prototype.updateMessage = function() {
    this.processWheel();
    this.updateArrow();
};

Window_Information.prototype.updateArrow = function() {
    const visibleArea = this.innerHeight;
    if(visibleArea > this.contents.height) return;
    const top = this.contents.height - visibleArea;
    const bottom = 0;
    this.upArrowVisible = (this.origin.y > bottom) && this.isScrollArrowVisible();
    this.downArrowVisible = (this.origin.y < top) && this.isScrollArrowVisible();
};

Window_Information.prototype.processWheel = function() {
    const visibleArea = this.innerHeight;
    if(visibleArea > this.contents.height) return;
    const threshold = 20;
    if(this.isMouseInsideFrame()) {
        if(TouchInput.wheelY >= threshold || Input.isRepeated('down')) {
            this.scrollDown();
        }
        if(TouchInput.wheelY <= -threshold || Input.isRepeated('up')) {
            this.scrollUp();
        }
    }
};

Window_Information.prototype.updateTouchScroll = function() {
    if(this.canScroll()) {
        this.updateScrollState();
        this.checkScrollEnd();
    }
};

Window_Information.prototype.updateScrollState = function() {
    const newY = (TouchInput._private_RSSD_WIN_INFO_windowBoardLastY() - TouchInput.y) * 1;
    if (this.isTouchedInsideFrame() && TouchInput.isMoved() && !this.isScrollbarActive()) {
        if (newY) this.origin.y += newY;
    }
    if(this.isScrollbarActive() && TouchInput.isMoved()) {
        if (newY) this.origin.y -= newY * this.scrollAccel();
    }
};

Window_Information.prototype.checkScrollEnd = function() {
    if ((TouchInput.isMoved() || TouchInput._private_RSSD_WIN_INFO_windowBoardLastY())) {
        if(!this.canScrollDown()) {
            const visibleArea = this.innerHeight;
            this.origin.y = this.contents.height - visibleArea;
        } else if(!this.canScrollUp()){
            this.origin.y = 0;
        }
    }
};

Window_Information.prototype.updateScrollbarSprite = function() {
    const base = this._scrollbarBaseSprite, ctrl = this._scrollbarCtrlSprite;
    if(base && ctrl) {
        if((!base.bitmap || !ctrl.bitmap) && this.needsScrollBar()) {
            this.createScrollbarBitmap();
            this.refreshScrollbarPosition();
            this.bindScrollbarHandler();
        }
        base.visible = this.needsScrollBar();
        ctrl.visible = this.needsScrollBar();
        this.updateScrollbarPosition();
    }
};

Window_Information.prototype.createScrollbarBitmap = function() {
    const base = this._scrollbarBaseSprite, ctrl = this._scrollbarCtrlSprite;
    if(base.bitmap) base.bitmap.destroy();
    if(ctrl.bitmap) ctrl.bitmap.destroy();
    this.resetBitmapSettings();
};

Window_Information.prototype.resetBitmapSettings = function() {
    this.drawScrollbarBaseStyle();
    this.drawScrollbarCtrlStyle();
};

Window_Information.prototype.drawScrollbarBaseStyle = function() {
    const base = this._scrollbarBaseSprite;
    base.bitmap = new Bitmap(6, this.scrollbarBaseHeight());
    base.bitmap.fillAll('gray');
};

Window_Information.prototype.drawScrollbarCtrlStyle = function() {
    const ctrl = this._scrollbarCtrlSprite;
    ctrl.bitmap = new Bitmap(16, this.scrollbarCtrlHeight());
    this.applyScrollbarCtrlStyle_Idle();
};

Window_Information.prototype.applyScrollbarCtrlStyle_Idle = function() {
    const ctrl = this._scrollbarCtrlSprite;
    const c1 = '#b4b4b4';
    const c2 = '#d5d5d5';
    const w = ctrl.bitmap.width;
    const h = ctrl.bitmap.height;
    ctrl.bitmap.gradientFillRect(0, 0, w, h, c2, c1, true);
    ctrl.bitmap.strokeRect(0, 0, w, h, c1);
};

Window_Information.prototype.applyScrollbarCtrlStyle_Hover = function() {
    const ctrl = this._scrollbarCtrlSprite;
    const sprite = this._scrollbarCtrlSprite;
    const c1 = '#bcbcbc';
    const c2 = '#e3e3e3';
    const w = ctrl.bitmap.width;
    const h = ctrl.bitmap.height;
    ctrl.bitmap.gradientFillRect(0, 0, w, h, c2, c1, true);
    ctrl.bitmap.strokeRect(0, 0, w, h, c1);
};

Window_Information.prototype.refreshScrollbarPosition = function() {
    const base = this._scrollbarBaseSprite, ctrl = this._scrollbarCtrlSprite;
    base.anchor.x = 0.5, base.anchor.y = 0;
    ctrl.anchor.x = 0.5, ctrl.anchor.y = 0;
    base.x = this.scrollbarX();
    base.y = this.scrollbarBaseY();
    ctrl.x = this.scrollbarX();
    ctrl.y = this.scrollbarCtrlStartY();
};

Window_Information.prototype.updateScrollbarPosition = function() {
    if(this.canScroll()) {
        const length = this.scrollbarCtrlEndY() - this.scrollbarCtrlStartY();
        const dis = this.contentsHeight() - this.innerHeight;
        if(dis > 0) {
            const originDis = this.origin.y;
            const rate = originDis / dis;
            let offsetY = Math.floor(length * rate);
            if(rate === 1) {
                offsetY = length;
            }
            this._scrollbarCtrlSprite.y = this.scrollbarCtrlStartY() + offsetY;
        }
    }
};

Window_Information.prototype.bindScrollbarHandler = function() {
    const sprite = this._scrollbarCtrlSprite;
    sprite.setLongPressHandler(this.onScrollbarLongPressed.bind(this));
    sprite.setReleaseHandler(this.onScrollbarReleased.bind(this));
    sprite.setMouseEnterHandler(this.onScrollbarMouseEnter.bind(this));
    sprite.setMouseExitHandler(this.onScrollbarMouseExit.bind(this));

};

Window_Information.prototype.onScrollbarLongPressed = function() {  // updated per frame
    this._isScrollbarActive = true;
};

Window_Information.prototype.onScrollbarReleased = function() {
    this._isScrollbarActive = false;
};

Window_Information.prototype.onScrollbarMouseEnter = function() {
    this.applyScrollbarCtrlStyle_Hover();
};

Window_Information.prototype.onScrollbarMouseExit = function() {
    this.applyScrollbarCtrlStyle_Idle();
};

Window_Information.prototype.scrollDown = function() {
    const visibleArea = this.innerHeight;
    const top = this.contents.height - visibleArea;
    if(this.origin.y === top) return;
    if(top - this.origin.y < this.scrollSpeed() && top - this.origin.y > 0) {
        this.origin.y = top;
    } else {
        if(this.canScrollDown()) {
            this.origin.y += this.scrollSpeed();
        }
    }
};

Window_Information.prototype.scrollUp = function() {
    const bottom = 0;
    if(this.origin.y === bottom) return;
    if(this.origin.y - bottom < this.scrollSpeed() && this.origin.y - bottom > 0) {
        this.origin.y = bottom;
    } else {
        if(this.canScrollUp()) {
            this.origin.y -= this.scrollSpeed();
        }
    }
};

Window_Information.prototype.canScroll = function() {
    return this.canScrollUp() || this.canScrollDown();
};

Window_Information.prototype.canScrollDown = function() {
    const visibleArea = this.innerHeight;
    return this.origin.y <= this.contents.height - visibleArea;
};

Window_Information.prototype.canScrollUp = function() {
    return this.origin.y !== 0 && this.origin.y >= 0;
};

Window_Information.prototype.scrollSpeed = function() {
    return 30;   //px
};

Window_Information.prototype.refresh = function() {
    this.resetOrigin();
    this.destroyContents();
    this.refreshAllTextHeight();
    this.createContents();
    this.paint();

};

Window_Information.prototype.resetOrigin = function() {
    this.origin.y = 0;
};

Window_Information.prototype.refreshAllTextHeight = function() {
    const isForced = this._forceNeedsScrollBar;
    this._forceNeedsScrollBar = true;
    const height1 = this.textSizeEx(this._text).height;
    this._forceNeedsScrollBar = isForced;
    const isEnabled = this._isScrollbarEnabled;
    this._isScrollbarEnabled = false;
    const height2 = this.textSizeEx(this._text).height;
    this._isScrollbarEnabled = isEnabled;
    if(this.innerHeight.clamp(height1, height2) === this.innerHeight) 
    this._allTextHeight = height2;
    else this._allTextHeight = height1;
};

Window_Information.prototype.paint = function() {
    this.drawTextEx(this._text, 0, 0);
};

//==============================================================================
// Sprite_Info_Scrollbar
//==============================================================================

function Sprite_Info_Scrollbar() {
    this.initialize(...arguments);
}

Sprite_Info_Scrollbar.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_Info_Scrollbar.prototype.constructor = Sprite_Info_Scrollbar;

Sprite_Info_Scrollbar.prototype.initialize = function() {
    Sprite_Clickable.prototype.initialize.call(this);
    this._longPressHandler = null;
    this._mouseEnterHandler = null;
    this._mouseExitHandler = null;
    this._releaseHandler = null;
};

Sprite_Info_Scrollbar.prototype.processTouch = function() {
    Sprite_Clickable.prototype.processTouch.call(this);
    if(this.isClickEnabled()) {
        if(!this._pressed && this.isBeingTouched() && TouchInput.isRepeated()) {
            this._pressed = true;
            this.onLongPressPerFrame();
        }
        if(this._pressed && TouchInput.isRepeated()) {
            this.onLongPressPerFrame();
        }
    }
    if(this.isClickEnabled()) {
        if(!this._pressed && TouchInput.isReleased()) {
            this.onRelease();
        }
    }
};

Sprite_Info_Scrollbar.prototype.setLongPressHandler = function(method) {
    this._longPressHandler = method;
};

Sprite_Info_Scrollbar.prototype.setMouseEnterHandler = function(method) {
    this._mouseEnterHandler = method;
};

Sprite_Info_Scrollbar.prototype.setMouseExitHandler = function(method) {
    this._mouseExitHandler = method;
};

Sprite_Info_Scrollbar.prototype.setReleaseHandler = function(methed) {
    this._releaseHandler = methed;
};

Sprite_Info_Scrollbar.prototype.onLongPressPerFrame = function() {
    if(this._longPressHandler) {
        this._longPressHandler();
    }
};

Sprite_Info_Scrollbar.prototype.onMouseEnter = function() {
    if(this._mouseEnterHandler) {
        this._mouseEnterHandler();
    }
};

Sprite_Info_Scrollbar.prototype.onMouseExit = function() {
    if(this._mouseExitHandler) {
        this._mouseExitHandler();
    }
};

Sprite_Info_Scrollbar.prototype.onRelease = function() {
    if(this._releaseHandler) {
        this._releaseHandler();
    }
};

//==============================================================================
// Scene_Map
// ↓使用示例：先安装VisuMZ_1_MessageCore.js（自动换行功能），
// 再将注释还原为代码即可在地图界面看到示例
//==============================================================================

let ___Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    ___Scene_Map_createAllWindows.call(this);
    this.createTryWindow();
    this.createTryWindowScrollbarSprite();
};

Scene_Map.prototype.createTryWindow = function() {
    this._tryWindow = new Window_Information(new Rectangle(0, 0, 400, 500));
    this._tryWindow.setText('<WordWrap>\\{\\{S\\}\\}cientists have developed a simple DNA blood test that can predict how well patients with breast cancer will respond to treatment. More than 2 million people globally each year are diagnosed with the disease, which is the world’s most prevalent cancer. Although treatments have improved in recent decades, it is not easy to know which ones will work best for which patients. Now researchers have designed a liquid biopsy that tells doctors how likely a patient is to respond to a specific treatment, even before it begins. The test has the potential to be gamechanging because it means patients could be offered alternative options, and avoid treatments that won’t help them, boosting their chances of beating the disease.');
    this._tryWindow.refresh();
    this.addChild(this._tryWindow);
};

Scene_Map.prototype.createTryWindowScrollbarSprite = function() {
    this._tryScrollbarBaseSprite = new Sprite_Clickable();
    this._tryScrollbarCtrlSprite = new Sprite_Info_Scrollbar();
    const base = this._tryScrollbarBaseSprite;
    const ctrl = this._tryScrollbarCtrlSprite;
    this._tryWindow.setScrollbarBaseSprite(base);
    this._tryWindow.setScrollbarCtrlSprite(ctrl);
    this.addChild(base);
    this.addChild(ctrl);
};