//==============================================================================
// RSSD_MobilePhone.js
// Author: Rose_shadows
//==============================================================================
/*:
 * @plugindesc 1.1.0 - 手机菜单
 * @author Rose_shadows
 * @target MV MZ
 * @help
 * === 介绍 ===
 *
 * 该插件提供一个简单的手机样式菜单，
 * 玩家可以点击APP呼出界面、调用公共事件、运行脚本。
 * 在插件参数列表中还可以设置手机的样式（背景与遮罩）以便在游戏中更换。
 *
 *
 * === 文件准备 ===
 *
 * 手机菜单的背景和遮罩需要放在 img/phones/ 文件夹下。
 * APP的自定义图标集放在img/system/下。格式必须和游戏的图标集一致
 * （一排最多16个图标，单个图标宽高相等）。
 *
 *
 * === 插件指令 (MV) ===
 *
 * ::RSSD_MP open
 * ::RSSD_MP 打开手机
 * - 打开手机菜单界面
 *
 * ::RSSD_MP setLayout {KEY}
 * ::RSSD_MP 设置样式 {KEY}
 * - 设置关键字为{KEY}的样式。
 *
 * ::RSSD_MP uninstallApp {KEY}
 * ::RSSD_MP 卸载应用 {KEY}
 * - 在手机中隐藏关键字为{KEY}的app。
 *
 * ::RSSD_MP installApp {KEY}
 * ::RSSD_MP 安装应用 {KEY}
 * - 在手机中显示关键字为{KEY}的app。
 *
 *
 * === 事件脚本 ===
 *
 * SceneManager.push(Scene_MobilePhone);
 * - 打开手机菜单。
 *
 * $gameSystem.setPhoneLayout('关键字');
 * - 设置指定关键字的样式。
 *
 * $gameSystem.setPhoneAppVisibility('关键字', boolean);
 * - 设置APP的显隐状态。
 *   boolean处填写true或false。
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
 * 1.0.1 - 增加了设置初始APP的功能。
 * 1.0.2 - 修复用评估代码设置背景位置时不生效的问题。
 * 1.1.0 - 兼容MZ，修复了若干Bug。
 * 
 * 
 * @command 打开手机
 * @desc 打开手机界面。
 * 
 * @command 设置手机样式
 * @desc 为手机界面设置背景和遮罩的预设样式。
 * 
 * @arg 样式关键字
 * @desc 预设的样式关键字。
 * @default 
 * 
 * @command 安装应用
 * @desc 为手机安装应用。
 * 
 * @arg APP关键字
 * @desc 预设的APP关键字。
 * @default 
 * 
 * @command 卸载应用
 * 
 * @arg APP关键字
 * @desc 预设的APP关键字。
 * @default 
 * 
 * 
 * @param APP列表
 * @type struct<app>[]
 * @desc APP列表。这些APP将按列表中的顺序依次排列。
 * @default []
 *
 * @param 初始APP
 * @type string[]
 * @desc 游戏初始时显示的所有APP。在这里要写APP关键字。
 * @default []
 *
 * @param 手机样式集
 * @type struct<layout>[]
 * @desc 手机背景和遮罩的样式集。
 * @default []
 *
 * @param Menu
 * @text === 菜单设置 ===
 * 
 * @param X坐标
 * @parent Menu
 * @desc 菜单的X坐标。可以使用评估代码。
 * @default 268
 * 
 * @param Y坐标
 * @parent Menu
 * @desc 菜单的Y坐标。可以使用评估代码。
 * @default 63
 * 
 * @param 宽度
 * @parent Menu
 * @desc 菜单的宽度。可以使用评估代码。
 * @default 287
 * 
 * @param 高度
 * @parent Menu
 * @desc 菜单的高度。可以使用评估代码。
 * @default 512
 * 
 * @param 列数
 * @parent Menu
 * @desc 一行有几个APP图标？
 * @default 4
 * 
 * @param 可见行数
 * @parent Menu
 * @desc 一共有几行图标？
 * @default 7
 *
 * @param 是否显示窗口
 * @parent Menu
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否显示窗口皮肤？
 * @default false
 * 
 * @param 窗口皮肤
 * @parent Menu
 * @type file
 * @require 1
 * @dir img/system/
 * @desc 所使用的默认窗口皮肤。图片放在img/system/文件夹下。
 * @default Window
 *
 * @param 图标集图片
 * @parent Menu
 * @type file
 * @require 1
 * @dir img/system/
 * @desc APP图标的图标集。默认为IconSet。可以使用不等于32像素宽高的图标。
 * @default IconSet
 * 
 * @param 图标宽度
 * @parent Menu
 * @type number
 * @min 1
 * @desc 实际绘制的APP图标的宽度。单位像素。默认是32.
 * @default 32
 * 
 * @param 图标高度
 * @parent Menu
 * @type number
 * @min 1
 * @desc 实际绘制的APP图标的高度。单位像素。默认是32.
 * @default 32
 * 
 * @param 字体大小
 * @parent Menu
 * @type number
 * @desc 字体的大小。单位像素。
 * @default 16
 * 
 * @param 图标字体间隔
 * @parent Menu
 * @type number
 * @desc 图标与字体的间隔。单位像素。
 * @default 2
 * 
 * @param MZ
 * @text === MZ 相关设置 ===
 * 
 * @param 是否移除指令选项背景
 * @parent MZ
 * @type boolean
 * @on 移除
 * @off 不移除
 * @desc 是否移除APP指令选项的背景？默认不移除（false）
 * @default false
 */

/*~struct~app:
 * 
 * @param APP名
 * @desc 显示在窗口上的APP的名称。
 * @default 应用
 *
 * @param APP关键字
 * @desc APP的关键字。通过脚本安装/卸载APP时会用到。必须独一无二。不能包含空格。
 * @default app1
 * 
 * @param 图标索引
 * @desc APP图标的图标索引。
 * @default 0
 * 
 * @param 打开开关
 * @type switch
 * @desc 点击APP时打开的开关ID。若不打开，则设为0.
 * @default 0
 * 
 * @param 绑定功能类型
 * @type select
 * @option 进入界面
 * @value 0
 * @option 触发公共事件
 * @value 1
 * @option 运行自定义代码
 * @value 2
 * @desc 点击APP时实现的功能。
 * @default 0
 * 
 * @param scene
 * @text == 界面 ==
 * @default ========================
 * 
 * @param 绑定界面
 * @type combo
 * @parent scene
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Equip
 * @option Scene_Skill
 * @option Scene_Status
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_Options
 * @option Scene_GameEnd
 * @desc 若绑定功能类型为进入界面，则会进入此处设置的界面。不仅可绑定默认的界面，还可绑定其他插件提供的界面。
 * @default Scene_Menu
 * 
 * @param commonEvent
 * @text == 公共事件 ==
 * @default ========================
 * 
 * @param 公共事件触发模式
 * @parent commonEvent
 * @type select
 * @option 立即退出手机并执行公共事件
 * @value 0
 * @option 等待玩家自行退出手机后再触发公共事件
 * @value 1
 * @desc 若绑定功能类型为触发公共事件，选择点击APP后触发公共事件的模式。
 * @default 0
 * 
 * @param 绑定公共事件
 * @parent commonEvent
 * @type common_event
 * @desc 若绑定功能类型为触发公共事件，则会触发此处设置的公共事件。
 * @default 1
 * 
 * @param js
 * @text == 自定义代码 ==
 * @default ========================
 * 
 * @param 自定义代码
 * @parent js
 * @type note
 * @desc 若绑定功能类型为运行自定义代码，则会运行此处设置的代码。可以设置不止一条代码。
 * @default 
 * 
 */
 
/*~struct~layout:
 *
 * @param 样式名
 * @desc 仅作备注用。
 * @default 
 *
 * @param 样式关键字
 * @desc 该样式的关键字。必须独一无二。不能包含空格。
 * @default layout1
 * 
 * @param Back
 * @text == 背景设置 ==
 * 
 * @param 背景图片
 * @parent Back
 * @type file
 * @require 1
 * @dir img/phones/
 * @desc 设置图片资源。图片放在img/phones/文件夹下。不用的话请设为空。
 * @default
 * 
 * @param 背景X坐标
 * @parent Back
 * @desc 图片的X坐标。可以使用评估代码。
 * @default Graphics.width / 2 + 3
 * 
 * @param 背景Y坐标
 * @parent Back
 * @desc 图片的Y坐标。可以使用评估代码。
 * @default Graphics.height / 2 + 9
 * 
 * @param 背景混合模式
 * @parent Back
 * @type select
 * @option 正常
 * @value 0
 * @option 叠加
 * @value 1
 * @option 滤色
 * @value 2
 * @option 正片叠底
 * @value 3
 * @desc 图片的混合模式。
 * @default 0
 *
 * @param Mask
 * @text == 遮罩 ==
 *
 * @param 遮罩图片
 * @parent Mask
 * @type file
 * @require 1
 * @dir img/phones/
 * @desc 设置图片资源。图片放在img/phones/文件夹下。不用的话请设为空。
 * @default 
 * 
 * @param 遮罩X坐标
 * @parent Mask
 * @desc 图片的X坐标。可以使用评估代码。
 * @default Graphics.width / 2 + 3
 * 
 * @param 遮罩Y坐标
 * @parent Mask
 * @desc 图片的Y坐标。可以使用评估代码。
 * @default Graphics.height / 2 + 9
 * 
 * @param 遮罩混合模式
 * @parent Mask
 * @type select
 * @option 正常
 * @value 0
 * @option 叠加
 * @value 1
 * @option 滤色
 * @value 2
 * @option 正片叠底
 * @value 3
 * @desc 图片的混合模式。
 * @default 0
 *
 */
var Imported = Imported || {};
Imported.RSSD_MobilePhone = true;

var RSSD = RSSD || {};
RSSD.MP = {};
RSSD.MP.pluginName = 'RSSD_MobilePhone';

RSSD.MP.parameters     = PluginManager.parameters(RSSD.MP.pluginName);
RSSD.MP.windowX        = isNaN(Number(RSSD.MP.parameters['X坐标'])) ? RSSD.MP.parameters['X坐标'] : +RSSD.MP.parameters['X坐标'] || 0;
RSSD.MP.windowY        = isNaN(Number(RSSD.MP.parameters['Y坐标'])) ? RSSD.MP.parameters['Y坐标'] : +RSSD.MP.parameters['Y坐标'] || 0;
RSSD.MP.windowWidth    = isNaN(Number(RSSD.MP.parameters['宽度'])) ? RSSD.MP.parameters['宽度'] : +RSSD.MP.parameters['宽度'] || 287;
RSSD.MP.windowHeight   = isNaN(Number(RSSD.MP.parameters['高度'])) ? RSSD.MP.parameters['高度'] : +RSSD.MP.parameters['高度'] || 512;
RSSD.MP.windowskin     = RSSD.MP.parameters['窗口皮肤'] || 'Window';
RSSD.MP.showWindowskin = RSSD.MP.parameters['是否显示窗口'] === 'true' || false;
RSSD.MP.appIconset     = RSSD.MP.parameters['图标集图片'] || 'IconSet';
RSSD.MP.realIconWidth  = +RSSD.MP.parameters['图标宽度'] || 32;
RSSD.MP.realIconHeight = +RSSD.MP.parameters['图标高度'] || 32;
RSSD.MP.maxCols        = +RSSD.MP.parameters['列数'] || 4;
RSSD.MP.numVisibleRows = +RSSD.MP.parameters['可见行数'] || 7;
RSSD.MP.fontSize       = +RSSD.MP.parameters['字体大小'] || 16;
RSSD.MP.iconTextDis    = +RSSD.MP.parameters['图标字体间隔'] || 2;
RSSD.MP.removeItemBack = RSSD.MP.parameters['是否移除指令选项背景'] === 'true';

/* APP注册 */

var temp_arr = [];
temp_arr = JSON.parse(RSSD.MP.parameters['APP列表']).map(function(app){
    return JSON.parse(app);
});

RSSD.MP.app = {};

for(var i = 0; i < temp_arr.length; i++) {
    var obj = temp_arr[i];
    if(!obj || JSON.stringify(obj) === '{}') continue;
    var app = {};
    app.name           = obj['APP名'] || '应用';
    app.iconIndex      = +obj['图标索引'] || 0;
    app.swi            = +obj['打开开关'] || 0;
    app.bindType       = obj['绑定功能类型'] === undefined ? 2 : +obj['绑定功能类型'];
    app.menuKey        = obj['绑定界面'] || 'Scene_Menu';
    app.callCommonMode = +obj['公共事件触发模式'] || 0;
    app.commonEvent    = +obj['绑定公共事件'] || 0;
    app.code           = !!obj['自定义代码'] ? JSON.parse(obj['自定义代码']) : '';
    var key            = obj['APP关键字'];
    RSSD.MP.app[key]   = app;
}

/* 初始APP */

RSSD.MP.initialApps = [];
RSSD.MP.initialApps = JSON.parse(RSSD.MP.parameters['初始APP']);

/* 样式集注册 */

var temp_arr2 = [];
temp_arr2 = JSON.parse(RSSD.MP.parameters['手机样式集']).map(function(layout){
    return JSON.parse(layout);
});

RSSD.MP.layout = {};

for(var i = 0; i < temp_arr2.length; i++) {
    var obj = temp_arr2[i];
    if(!obj || JSON.stringify(obj) === '{}') continue;
    var lo = {};
    lo.backBitmap    = obj['背景图片'];
    lo.backX         = isNaN(+obj['背景X坐标']) ? obj['背景X坐标'] : +obj['背景X坐标'] || 0;
    lo.backY         = isNaN(+obj['背景Y坐标']) ? obj['背景Y坐标'] : +obj['背景Y坐标'] || 0;
    lo.backBlendMode = +obj['背景混合模式'] || 0;
    lo.maskBitmap    = obj['遮罩图片'];
    lo.maskX         = isNaN(+obj['遮罩X坐标']) ? obj['遮罩X坐标'] : +obj['背景X坐标'] || 0;
    lo.maskY         = isNaN(+obj['遮罩Y坐标']) ? obj['遮罩Y坐标'] : +obj['背景Y坐标'] || 0;
    lo.maskBlendMode = +obj['遮罩混合模式'] || 0;
    var key          = obj['样式关键字'];
    RSSD.MP.layout[key] = lo;
}

//=============================================================================
// Game_System
//=============================================================================

let __RSSD_MP_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    __RSSD_MP_Game_System_initialize.call(this);
    this.initializePhoneAppData();
};

Game_System.prototype.initializePhoneAppData = function() {
    this._currentPhoneLayout = null;
    this._hiddenPhoneAppList = [];
    this.setInitialPhoneApps();
};

Game_System.prototype.setInitialPhoneApps = function() {
    const appList = Object.keys(RSSD.MP.app);
    appList.forEach((app)=>{
        if(!RSSD.MP.initialApps.includes(app)) {
            this._hiddenPhoneAppList.push(app);
        }
    })
};

Game_System.prototype.setPhoneAppVisibility = function(key, visible) {
    const hiddenList = this._hiddenPhoneAppList;
    if(visible !== undefined && !visible) {
        const index = hiddenList.indexOf(key);
        if(index === -1) {
            hiddenList.push(key);
        }
    } else {
        const index = hiddenList.indexOf(key);
        if(index > -1) {
            hiddenList.splice(index, 1, 0);
        }
    }
};

Game_System.prototype.isPhoneAppVisible = function(key) {
    return !this._hiddenPhoneAppList.includes(key);
};

Game_System.prototype.setPhoneLayout = function(key) {
    this._currentPhoneLayout = key;
};

Game_System.prototype.currentPhoneLayout = function() {
    return this._currentPhoneLayout;
};

//=============================================================================
// Window_PhoneMain
//=============================================================================

function Window_PhoneMain() {
    this.initialize.apply(this, arguments);
}

Window_PhoneMain.prototype = Object.create(Window_Command.prototype);
Window_PhoneMain.prototype.constructor = Window_PhoneMain;

Window_PhoneMain.prototype.initialize = function(x, y) {
    // this.initAppIcons();
    if(Utils.RPGMAKER_NAME === 'MZ') {
        const rect = new Rectangle(x, y, this.windowWidth(), this.windowHeight());
        Window_Command.prototype.initialize.call(this, rect);
    } else {
        Window_Command.prototype.initialize.call(this, x, y);
    }
    this.checkWindowOpacity();
    this.selectLast();
};

Window_PhoneMain._lastCommandSymbol = null;

Window_PhoneMain.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

if(Utils.RPGMAKER_NAME === 'MZ') {
    Window_PhoneMain.prototype.resetFontSettings = function() {
        Window_Command.prototype.resetFontSettings.call(this);
        this.contents.fontSize = this.standardFontSize();
    };

    Window_PhoneMain.prototype.drawItemBackground = function() {
        if(!RSSD.MP.removeItemBack) {
            Window_Command.prototype.drawItemBackground.call(this);
        }
    };
}

Window_PhoneMain.prototype.initAppIcons = function() {
    this._iconList = [];
    for(const app in RSSD.MP.app) {
        if($gameSystem.isPhoneAppVisible(app)) {
            this._iconList.push(RSSD.MP.app[app].iconIndex);
        }
    }
};

Window_PhoneMain.prototype.checkWindowOpacity = function() {
    if(!RSSD.MP.showWindowskin) this.opacity = 0;
    else this.opacity = 196;
};

Window_PhoneMain.prototype.itemTextAlign = function() {
    return 'center';
};

Window_PhoneMain.prototype.standardPadding = function() {
    return 12;
};

Window_PhoneMain.prototype.windowWidth = function() {
    return RSSD.MP.windowWidth;
};

Window_PhoneMain.prototype.windowHeight = function() {
    return RSSD.MP.windowHeight;
};

Window_PhoneMain.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(RSSD.MP.windowskin);
};

Window_PhoneMain.prototype.numVisibleRows = function() {
    return RSSD.MP.numVisibleRows;
};

Window_PhoneMain.prototype.maxCols = function() {
    return RSSD.MP.maxCols;
};

Window_PhoneMain.prototype.lineHeight = function() {
    return this.iconDrawingHeight() + this.standardFontSize() + this.iconTextDistance() + 18;
};

Window_PhoneMain.prototype.standardFontSize = function() {
    return RSSD.MP.fontSize;
};

Window_PhoneMain.prototype.iconDrawingWidth = function() {
    return RSSD.MP.realIconWidth;
};

Window_PhoneMain.prototype.iconDrawingHeight = function() {
    return RSSD.MP.realIconHeight;
};

Window_PhoneMain.prototype.iconTextDrawingOffset = function() {
    return 0;
};

Window_PhoneMain.prototype.iconTextDistance = function() {
    return RSSD.MP.iconTextDis;
};

Window_PhoneMain.prototype.makeCommandList = function() {
    for(const app in RSSD.MP.app) {
        this.makeEachCommand(app);
    }
};

Window_PhoneMain.prototype.makeEachCommand = function(key) {
    const appData = RSSD.MP.app[key];
    if($gameSystem.isPhoneAppVisible(key)) {
        this.addCommand(appData.name, 'phoneApp-'+key, true);
    }
};

Window_PhoneMain.prototype.drawItem = function(index) {
    if(Utils.RPGMAKER_NAME === 'MZ') {
        const rect = this.itemRect(index);
        this.drawItemInitStyle(index);
        this.drawItemIcon(index, rect);
        this.drawItemAPPName(index, rect);
    } else {
        const rect = this.itemRectForText(index);
        this.drawItemInitStyle(index);
        this.drawItemIcon(index, rect);
        this.drawItemAPPName(index, rect);
    }
};

Window_PhoneMain.prototype.drawItemInitStyle = function(index) {
    const color = Utils.RPGMAKER_NAME === 'MZ' ? ColorManager.normalColor() : this.normalColor();
    this.changeTextColor(color);
    this.changePaintOpacity(this.isCommandEnabled(index));
};

Window_PhoneMain.prototype.drawItemIcon = function(index, rect) {
    const ix = (rect.width - this.iconDrawingWidth()) / 2; // Offset
    const iy = (this.lineHeight() - (this.iconDrawingHeight() + this.standardFontSize() + this.iconTextDistance())) / 2 + this.iconTextDrawingOffset();
    this.drawIconEx(this._iconList[index],rect.x+ix,rect.y+iy,this.iconDrawingWidth(),this.iconDrawingHeight(), RSSD.MP.appIconset);
};

Window_PhoneMain.prototype.drawItemAPPName = function(index, rect) {
    const align = this.itemTextAlign();
    const ty = this.iconDrawingHeight() / 2 + this.iconTextDrawingOffset() + this.iconTextDistance();
    this.drawText(this.commandName(index),rect.x,rect.y+ty,rect.width,align);
};

Window_PhoneMain.prototype.drawIconEx = function(iconIndex, x, y, dw, dh, fileName='IconSet', w, h) {
    const bitmap = ImageManager.loadSystem(fileName);
    bitmap.addLoadListener(()=>{
        const nw = Math.floor(bitmap.width / 16);
        const nh = nw;
        const pw = w || nw || Window_Base._iconWidth || ImageManager.standardIconWidth;
        const ph = h || nh || Window_Base._iconHeight || ImageManager.standardIconHeight;
        const sx = iconIndex % 16 * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap,sx,sy,pw,ph,x,y,dw,dh);
    });
};

Window_PhoneMain.prototype.processOk = function() {
    Window_PhoneMain._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_PhoneMain.prototype.selectLast = function() {
    this.selectSymbol(Window_PhoneMain._lastCommandSymbol);
};

Window_PhoneMain.prototype.refresh = function() {
    this.initAppIcons();
    Window_Command.prototype.refresh.call(this);
};

//=============================================================================
// Scene_MobilePhone
//=============================================================================

function Scene_MobilePhone() {
    this.initialize.apply(this, arguments);
}

Scene_MobilePhone.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MobilePhone.prototype.constructor = Scene_MobilePhone;

Scene_MobilePhone.prototype.initialize = function() {
    this.refreshApps();
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_MobilePhone.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createPhoneWindow();
    this.createPhoneMaskLayer();
};

let __RSSD_MP_Scene_MobilePhone_createWindowLayer = Scene_MobilePhone.prototype.createWindowLayer;
Scene_MobilePhone.prototype.createWindowLayer = function() {
    this.createPhoneBackLayer();
    __RSSD_MP_Scene_MobilePhone_createWindowLayer.call(this);
};

Scene_MobilePhone.prototype.createPhoneWindow = function() {
    this._phoneWindow = new Window_PhoneMain(RSSD.MP.windowX, RSSD.MP.windowY);
    this.assignPhoneAppHandlers();
    this._phoneWindow.setHandler('cancel',this.popScene.bind(this));
    this.addWindow(this._phoneWindow);
};

Scene_MobilePhone.prototype.assignPhoneAppHandlers = function() {
    for(const app in RSSD.MP.app) {
        this.setEachAppHandler(app);
    }
};

Scene_MobilePhone.prototype.setEachAppHandler = function(key) {
    if($gameSystem.isPhoneAppVisible(key)) {
        this._phoneWindow.setHandler('phoneApp-'+key, this._appFunction[key].bind(this));
    }
};

Scene_MobilePhone.prototype.refreshApps = function() {
    this._appFunction = null;
    this._appFunction = {};
    for(const app in RSSD.MP.app) {
        this._appFunction[app] = new Function('this.generateApp("'+app+'")');
    }
};

Scene_MobilePhone.prototype.generateApp = function(key) {
    var id = key;
    if(!RSSD.MP.app[id]) return;
    switch(RSSD.MP.app[id].bindType) {
        case 0: // 菜单
            SceneManager.push(eval(RSSD.MP.app[id].menuKey));
            break;
        case 1: // 公共事件
            if(RSSD.MP.app[id].commonEvent){
                if(RSSD.MP.app[id].callCommonMode) {
                    // 等待玩家自行退出
                    this._phoneWindow.activate();
                    $gameTemp.reserveCommonEvent(RSSD.MP.app[id].commonEvent);
                } else {
                    // 立即退出并执行
                    SceneManager.goto(Scene_Map);
                    $gameTemp.reserveCommonEvent(RSSD.MP.app[id].commonEvent);
                }
            }
            break;
        case 2: // 自定义代码
            eval(RSSD.MP.app[id].code);
            break;
    };
    // 打开开关
    if(RSSD.MP.app[id].swi) {
        $gameSwitches.setValue(RSSD.MP.app[id].swi, true);
    };
};

Scene_MobilePhone.prototype.createPhoneBackLayer = function() {
    this._phoneBack = new Sprite();
    this._phoneBack.anchor.x = 0.5;
    this._phoneBack.anchor.y = 0.5;
    const key = $gameSystem.currentPhoneLayout();
    if(key) {
        const layout = RSSD.MP.layout[key];
        if(layout.backBitmap) {
            this._phoneBack.bitmap = ImageManager.loadBitmap('img/phones/', layout.backBitmap);
            this._phoneBack.x = isNaN(+layout.backX) ? eval(layout.backX) : +layout.backX;
            this._phoneBack.y = isNaN(+layout.backY) ? eval(layout.backY) : +layout.backY;
            this._phoneBack.blendMode = layout.backBlendMode;
        }
    }
    this.addChild(this._phoneBack);
};

Scene_MobilePhone.prototype.createPhoneMaskLayer = function() {
    this._phoneMask = new Sprite();
    this._phoneMask.anchor.x = 0.5;
    this._phoneMask.anchor.y = 0.5;
    const key = $gameSystem.currentPhoneLayout();
    if(key) {
        const layout = RSSD.MP.layout[key];
        if(layout.maskBitmap) {
            this._phoneMask.bitmap = ImageManager.loadBitmap('img/phones/', layout.maskBitmap);
            this._phoneMask.x = isNaN(+layout.maskX) ? eval(layout.maskX) : +layout.maskX;
            this._phoneMask.y = isNaN(+layout.maskY) ? eval(layout.maskY) : +layout.maskY;
            this._phoneMask.blendMode = layout.maskBlendMode;
        }
    }
    this.addChild(this._phoneMask);
};

/* 插件指令 */
if(Utils.RPGMAKER_NAME === 'MZ') {
    PluginManager.registerCommand(RSSD.MP.pluginName, '打开手机', (args)=>{
        SceneManager.push(Scene_MobilePhone);
    });
    PluginManager.registerCommand(RSSD.MP.pluginName, '设置手机样式', (args)=>{
        const key = args['样式关键字'];
        if(key) {
            $gameSystem.setPhoneLayout(key);
        }
    });
    PluginManager.registerCommand(RSSD.MP.pluginName, '安装应用', (args)=>{
        const key = args['APP关键字'];
        if(key) {
            $gameSystem.setPhoneAppVisibility(key, true);
        }
    });
    PluginManager.registerCommand(RSSD.MP.pluginName, '卸载应用', (args)=>{
        const key = args['APP关键字'];
        if(key) {
            $gameSystem.setPhoneAppVisibility(key, false);
        }
    });
} else {
    let __RSSD_MP_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        __RSSD_MP_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command.toLowerCase() === '::rssd_mp') {
            switch(args[0].toLowerCase()) {
                case 'open':
                case '打开手机':
                    SceneManager.push(Scene_MobilePhone);
                    break;
                case 'setlayout':
                case '设置样式':
                    var key = args[1] || null;
                    $gameSystem.setPhoneLayout(key);
                    break;
                case 'installApp':
                case '安装应用':
                    var key = args[1];
                    $gameSystem.setPhoneAppVisibility(key, true);
                    break;
                case 'uninstallApp':
                case '卸载应用':
                    var key = args[1];
                    $gameSystem.setPhoneAppVisibility(key, false);
                    break;
            }
        }
    };
}
