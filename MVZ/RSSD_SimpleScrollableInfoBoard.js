//=============================================================================
// RSSD_SimpleScrollableInfoBoard.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 2.3.0 - 简易可滚动信息板 (读报系统)
 * @author 离影玫 | Rose_shadows
 * @target MV MZ
 * @url https://github.com/Roseshadows
 * @help 
 *  === 介绍 ===
 * 
 * 该插件扩展了滚动文本的功能。
 * 
 * 在打开特定开关后，可以使用事件指令【显示滚动文本】来显示一个可滚动的
 * 信息板。
 * 在信息板中，可以用滚轮或上下方向键滚动文本。
 * 若要退出信息板，请按Esc键、点击鼠标右键或双击屏幕。
 * 
 * 关闭开关后，【显示滚动文本】将会恢复原来的功能。
 * 
 * !注意!如果你在使用信息板时需要连续使用两次以上事件指令【显示滚动文本
 * 】，请在相邻事件指令之间添加【等待】指令。时长推荐为10帧。
 * 否则有的信息板可能不会显示出来。
 * 
 * 
 * === 功能 - 设置信息板背景样式 ===
 * 
 * 通过设置文本的滚动速度，可以设定信息板背景样式为窗口或是透明。
 * 若速度为2（默认），则背景样式为窗口；
 * 若速度为1，则背景样式为透明。
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
 * 2.0.0 - 增加了对RMMZ的支持。
 * 2.1.0 - 新增功能，可以根据文本滚动速度设定背景样式为窗口或是透明。
 * 2.3.0 - 调整了部分代码的结构，修复了用Esc键或鼠标右键关闭信息板时会
 *         调出主菜单的Bug，新增打开/关闭信息板时播放指定音效的功能，
 *         修复关闭信息板时窗口直接消失而不是播放关闭动画的Bug。
 * 
 * @param === 基础设置 ===
 * 
 * @param Enable Switch ID
 * @text 启用开关ID
 * @parent === 基础设置 ===
 * @type switch
 * @desc 启用信息板功能的开关。默认为 开关#19 。
 * @default 19
 * 
 * @param Default Width
 * @text 信息板默认宽度
 * @parent === 基础设置 ===
 * @type number
 * @desc 信息板的默认宽度。默认：400
 * @default 400
 * 
 * @param Default Height
 * @text 信息板默认高度
 * @parent === 基础设置 ===
 * @type number
 * @desc 信息板的默认高度。默认：500
 * @default 500
 * 
 * @param Width Variable ID
 * @text 信息板宽度变量ID
 * @parent === 基础设置 ===
 * @type variable
 * @desc 在游戏中控制信息板宽度的变量ID。默认：19
 * @default 19
 * 
 * @param Height Variable ID
 * @text 信息板高度变量ID
 * @parent === 基础设置 ===
 * @type variable
 * @desc 在游戏中控制信息板高度的变量ID。默认：20
 * @default 20
 * 
 * @param === 音效设置 ===
 * 
 * @param Play Open SE
 * @text 是否播放打开音效
 * @parent === 音效设置 ===
 * @type boolean
 * @desc 打开信息板时是否播放音效？若开启这一项，默认使用“确认”音效。也可以在下面的参数自定义音效。
 * @default false
 * 
 * @param Open SE
 * @text 信息板打开音效
 * @parent === 音效设置 ===
 * @type struct<aud>
 * @desc 打开信息板时播放的音效。
 * @default {"SE Name":"","SE Volume":"90","SE Pitch":"100","SE Pan":"100"}
 * 
 * @param Play Close SE
 * @text 是否播放关闭音效
 * @parent === 音效设置 ===
 * @type boolean
 * @desc 关闭信息板时是否播放音效？若开启这一项，默认使用“取消”音效。也可以在下面的参数自定义音效。
 * @default false
 * 
 * @param Close SE
 * @text 信息板关闭音效
 * @parent === 音效设置 ===
 * @type struct<aud>
 * @desc 关闭信息板时播放的音效。
 * @default {"SE Name":"","SE Volume":"90","SE Pitch":"100","SE Pan":"100"}
 */
/*~struct~aud:
 * @param SE Name
 * @text 音效名
 * @type file
 * @dir audio/se/
 * @require 1
 * @default 
 * 
 * @param SE Volume
 * @text 音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param SE Pitch
 * @text 音调
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param SE Pan
 * @text 声场
 * @min -100
 * @max 100
 * @default 100
 */
var Imported = Imported || {};
Imported.RSSD_SimpleScrollableInfoBoard = true;

var RSSD = RSSD || {};
RSSD.SimpleScrollableInfoBoard = {};
var parameters = PluginManager.parameters('RSSD_SimpleScrollableInfoBoard');
RSSD.SimpleScrollableInfoBoard.switchId          = +parameters['Enable Switch ID'] || 19;
RSSD.SimpleScrollableInfoBoard.width             = +parameters['Default Width'] || 400;
RSSD.SimpleScrollableInfoBoard.height            = +parameters['Default Height'] || 500;
RSSD.SimpleScrollableInfoBoard.varWidth          = +parameters['Width Variable ID'] || 19;
RSSD.SimpleScrollableInfoBoard.varHeight         = +parameters['Height Variable ID'] || 20;

var temp_obj1 = JSON.parse(parameters['Open SE'] || '{}');
RSSD.SimpleScrollableInfoBoard.isOpenSEEnabled = parameters['Play Open SE'] === 'true';
RSSD.SimpleScrollableInfoBoard.openSeName   = temp_obj1['SE Name'] || '';
RSSD.SimpleScrollableInfoBoard.openSeVolume = +(temp_obj1['SE Volume'] || '90');
RSSD.SimpleScrollableInfoBoard.openSePitch  = +(temp_obj1['SE Pitch'] || '100');
RSSD.SimpleScrollableInfoBoard.openSePan    = +(temp_obj1['SE Pan'] || '100');

var temp_obj2 = JSON.parse(parameters['Close SE'] || '{}');
RSSD.SimpleScrollableInfoBoard.isCloseSEEnabled = parameters['Play Close SE'] === 'true';
RSSD.SimpleScrollableInfoBoard.closeSeName   = temp_obj2['SE Name'] || '';
RSSD.SimpleScrollableInfoBoard.closeSeVolume = +(temp_obj2['SE Volume'] || '90');
RSSD.SimpleScrollableInfoBoard.closeSePitch  = +(temp_obj2['SE Pitch'] || '100');
RSSD.SimpleScrollableInfoBoard.closeSePan    = +(temp_obj2['SE Pan'] || '100');

RSSD.SSIB = JSON.parse(JSON.stringify(RSSD.SimpleScrollableInfoBoard));

//=============================================================================
// Window_ScrollText
//=============================================================================

Window_ScrollText.prototype.isOpenAndActive = function() {
    return this.isOpen() && this.active;
};

Window_ScrollText.prototype.windowWidth = function() {
    return $gameVariables.value(RSSD.SSIB.varWidth) || RSSD.SSIB.width;
};

Window_ScrollText.prototype.windowHeight = function() {
    return $gameVariables.value(RSSD.SSIB.varHeight) || RSSD.SSIB.height;
};

Window_ScrollText.prototype.isOnInfoBoardMode = function() {
    return $gameSwitches.value(RSSD.SSIB.switchId);
};

var __RSSD_SSIB_Window_ScrollText_startMessage = Window_ScrollText.prototype.startMessage;
Window_ScrollText.prototype.startMessage = function() {
    this.refreshWindowType();
    __RSSD_SSIB_Window_ScrollText_startMessage.call(this);
    if(this.isOnInfoBoardMode()) {
        this.playInfoBoardTriggered();
        this.open();
    } else {
        this.openness = 255;
    }
};

Window_ScrollText.prototype.refreshWindowType = function() {
    this.refreshLayoutForType();
};

Window_ScrollText.prototype.refreshLayoutForType = function() {
    if(this.isOnInfoBoardMode()) {
        if(this.needsInfoBoardWindowBack()) {
            this.refreshLayout_InfoWindowBack();
        } else if(this.needsInfoBoardTransBack()) {
            this.refreshLayout_InfoTransBack();
        }
    } else {
        this.refreshLayout_Initial();
    }
};

Window_ScrollText.prototype.needsInfoBoardWindowBack = function() {
    return $gameMessage.scrollSpeed() === 2;
};

Window_ScrollText.prototype.needsInfoBoardTransBack = function() {
    return $gameMessage.scrollSpeed() === 1;
};

Window_ScrollText.prototype.refreshLayout_InfoWindowBack = function() {
    this.opacity = 192;
    this.openness = 0;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_ScrollText.prototype.refreshLayout_InfoTransBack = function() {
    this.opacity = 0;
    this.openness = 255;
    this.width = this.windowWidth();
    this.height = this.windowHeight();
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_ScrollText.prototype.refreshLayout_Initial = function() {
    this.opacity = 0;
    this.openness = 255;
    this.width = Graphics.boxWidth;
    this.height = Graphics.boxHeight;
    this.x = 0;
    this.y = 0;
};

Window_ScrollText.prototype.playInfoBoardTriggered = function() {
    if(RSSD.SSIB.isOpenSEEnabled) {
        if(RSSD.SSIB.openSeName) {
            AudioManager.playStaticSe({
                name: RSSD.SSIB.openSeName, volume: RSSD.SSIB.openSeVolume, pitch: RSSD.SSIB.openSePitch, pan: RSSD.SSIB.openSePan
            });
        } else {
            SoundManager.playOk();
        }
    }
};

var __RSSD_SSIB_Window_ScrollText_refresh = Window_ScrollText.prototype.refresh;
Window_ScrollText.prototype.refresh = function() {
    __RSSD_SSIB_Window_ScrollText_refresh.call(this);
    this.refreshForInfoBoardMode();
};

Window_ScrollText.prototype.refreshForInfoBoardMode = function() {
    if(this.isOnInfoBoardMode()) {
        this.origin.y = 0;
    }
};

var __RSSD_SSIB_Window_ScrollText_updateMessage = Window_ScrollText.prototype.updateMessage;
Window_ScrollText.prototype.updateMessage = function() {
    if(this.isOnInfoBoardMode()) {
        this.processWheel();
        this.updateArrow();
        if(this.isInfoBoardCancelled()) {
            Input.update();
            TouchInput.update();
            this.terminateMessage();
        }
    } else {
        __RSSD_SSIB_Window_ScrollText_updateMessage.call(this);
    }
};

Window_ScrollText.prototype.isInfoBoardCancelled = function() {
    return Input.isPressed('cancel') || TouchInput.isCancelled();
};

if(Utils.RPGMAKER_NAME == 'MZ') {
    var __RSSD_SSIB_Window_ScrollText_updatePlacement = Window_ScrollText.prototype.updatePlacement;
    Window_ScrollText.prototype.updatePlacement = function() {
        if(this.isOnInfoBoardMode()) {
            this.updateInfoBoardPlacement();
        } else {
            __RSSD_SSIB_Window_ScrollText_updatePlacement.call(this);
        }
    };

    Window_ScrollText.prototype.updateInfoBoardPlacement = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x = (Graphics.boxWidth - width) / 2;
        var y = (Graphics.boxHeight - height) / 2;
        this.move(x, y, width, height);
    };
}

Window_ScrollText.prototype.updateArrow = function() {
    var visibleArea = this.windowHeight() - 2 * this.padding;
    if(visibleArea > this.contents.height) return;
    var top = this.contents.height - visibleArea;
    var bottom = 0;
    this.upArrowVisible = this.origin.y > bottom;
    this.downArrowVisible = this.origin.y < top;
};

Window_ScrollText.prototype.processWheel = function() {
    if(this.isOpenAndActive()) {
        var visibleArea = this.windowHeight() - 2 * this.padding;
        if(visibleArea > this.contents.height) return;
        var threshold = 20;
        if(TouchInput.wheelY >= threshold || Input.isRepeated('down')) {
            this.scrollDown();
        }
        if(TouchInput.wheelY <= -threshold || Input.isRepeated('up')) {
            this.scrollUp();
        }
    }
};

Window_ScrollText.prototype.scrollDown = function() {
    var visibleArea = this.windowHeight() - 2 * this.padding;
    var top = this.contents.height - visibleArea;
    if(this.origin.y === top) return;
    if(top - this.origin.y < this.scrollSpeed() && top - this.origin.y > 0) {
        this.origin.y = top;
    } else {
        if(this.canScrollDown()) {
            this.origin.y += this.scrollSpeed();
        }
    }
};

Window_ScrollText.prototype.scrollUp = function() {
    var bottom = 0;
    if(this.origin.y === bottom) return;
    if(this.origin.y - bottom < this.scrollSpeed() && this.origin.y - bottom > 0) {
        this.origin.y = bottom;
    } else {
        if(this.canScrollUp()) {
            this.origin.y -= this.scrollSpeed();
        }
    }
};

Window_ScrollText.prototype.canScrollDown = function() {
    var visibleArea = this.windowHeight() - 2 * this.padding;
    return this.origin.y <= this.contents.height - visibleArea;
};

Window_ScrollText.prototype.canScrollUp = function() {
    return this.origin.y !== 0 && this.origin.y >= 0;
};

var __RSSD_SSIB_Window_ScrollText_scrollSpeed = Window_ScrollText.prototype.scrollSpeed;
Window_ScrollText.prototype.scrollSpeed = function() {
    if(this.isOnInfoBoardMode()) {
        return this.distancePerScroll();  //px
    } else {
        return __RSSD_SSIB_Window_ScrollText_scrollSpeed.call(this);
    }
};

Window_ScrollText.prototype.distancePerScroll = function() {
    return 30;   //px
};

var __RSSD_SSIB_Window_ScrollText_terminateMessage = Window_ScrollText.prototype.terminateMessage;
Window_ScrollText.prototype.terminateMessage = function() {
    __RSSD_SSIB_Window_ScrollText_terminateMessage.call(this);
    if(this.isOnInfoBoardMode()) {
        this.playInfoBoardCancelled();
        this.show();
        this.close();
    }
};

Window_ScrollText.prototype.playInfoBoardCancelled = function() {
    if(RSSD.SSIB.isCloseSEEnabled) {
        if(RSSD.SSIB.closeSeName) {
            AudioManager.playStaticSe({
                name: RSSD.SSIB.closeSeName, volume: RSSD.SSIB.closeSeVolume, pitch: RSSD.SSIB.closeSePitch, pan: RSSD.SSIB.closeSePan
            });
        } else {
            SoundManager.playCancel();
        }
    }
};

var __RSSD_SSIB_Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
Scene_Map.prototype.isMenuCalled = function() {
    var scrollTextWindow = this._scrollTextWindow;
    return __RSSD_SSIB_Scene_Map_isMenuCalled.call(this) && !(scrollTextWindow.isOnInfoBoardMode() && scrollTextWindow.isOpenAndActive());
};