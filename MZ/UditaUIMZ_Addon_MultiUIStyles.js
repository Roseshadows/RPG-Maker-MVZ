//=============================================================================================
// UditaUIMZ_Addon_MultiUIStyles.js
// Author: Rose_shadows
//=============================================================================================
/*:
 * @plugindesc 1.0.0 - Wolf RPG Editor 格式的 UI - 扩展 - 多UI更换
 * @author 离影玫 | Rose_shadows
 * @target MZ
 * @help
 * === 介绍 ===
 * 
 * 
 * 该插件扩展了 UditaUIMZ.js 的功能，提供了全局更换Udita样式的功能。
 * 
 * 通过插件指令和事件脚本，可以在游戏时更改皮肤、选项光标和暂停光标的样式图片。
 * 
 * 
 * 
 *  === 事件脚本 ===
 * 
 * 
 * $gameSystem.changeUditaskin('皮肤样式图片名');
 * - 更改Udita皮肤样式。
 * 
 * $gameSystem.changeUditaCursor('选择光标样式图片名');
 * - 更改Udita选择光标样式。
 *   所有Udita选择光标样式的图片格式都必须一致遵照 UditaUIMZ.js 里的设置。
 * 
 * $gameSystem.changeUditaPauseSign('对话暂停光标样式图片名');
 * - 更改Udita对话暂停光标样式。
 *   所有Udita对话暂停光标样式的图片格式都必须一致遵照 UditaUIMZ.js 里的设置。
 * 
 * 
 * 
 * === 开发者脚本 ===
 * 
 * 
 * 基础的方法参见 UditaUIMZ.js 的 “开发者脚本” 部分。
 * 以下是使用该插件时的注意要点和功能：
 * 
 * 1. 如果你希望创建一个**所有UI样式固定不变**的窗口，需要写：
 * 
 * Window_xxx.prototype.isUditaUIStyleStatic = function() {
 *     return true;
 * };
 * 
 *    如果你希望创建一个**仅窗口皮肤/选择光标/对话暂停光标样式固定不变**
 *    的窗口，需要写：
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
 * 2. 如果你希望根据某个你已设好的变量来控制自定义窗口的UI样式，
 *    则添加以下代码：
 * 
 * // 假设你的变量为:
 * // $gameSystem.xxx_skin()      - 控制窗口皮肤图片名的变量
 * // $gameSystem.xxx_cursor()    - 控制选择光标图片名的变量
 * // $gameSystem.xxx_pauseSign() - 控制对话暂停光标图片名的变量
 * 
 * // 设置窗口使用的Udita格式窗口皮肤
 * Window_xxx.prototype.loadUditaskin = function() {
 *     this.uditaskin = ImageManager.loadSystem($gameSystem.xxx_skin());
 * };
 * 
 * // 设置窗口使用的Udita格式对话暂停光标
 * Window_xxx.prototype.loadUditaPauseSign = function() {
 *     this.uditaPauseSign = ImageManager.loadSystem($gameSystem.xxx_cursor());
 * };
 * 
 * // 设置窗口使用的Udita格式选择光标
 * Window_xxx.prototype.loadUditaCursor = function() {
 *     this.uditaCursor = ImageManager.loadSystem($gameSystem.xxx_pauseSign());
 * };
 * 
 * // 控制窗口皮肤样式时需要写：
 * Window_xxx.prototype.isOnMUSkinChange = function() {
 *     return this._temp_uditaskinName !== $gameSystem.xxx_skin();
 * };
 * 
 * // 控制选择光标样式时需要写：
 * Window_xxx.prototype.isOnMUCursorChange = function() {
 *     return this._temp_uditaCursorName !== $gameSystem.xxx_cursor();
 * };
 * 
 * // 控制对话暂停光标样式时需要写：
 * Window_xxx.prototype.isOnMUPauseSignChange = function() {
 *     return this._temp_uditaPauseSignName !== $gameSystem.xxx_pauseSign();
 * };
 * 
 * let _alias = Window_xxx.prototype.updateMUTempStatus;
 * Window_xxx.prototype.updateMUTempStatus = function() {
 *     _alias.call(this);
 *     // 控制窗口皮肤样式时需要写：
 *     this._temp_uditaskinName = $gameSystem.xxx_skin();
 *     // 控制选择光标样式时需要写：
 *     this._temp_uditaCursorName = $gameSystem.xxx_cursor();
 *     // 控制对话暂停光标样式时需要写：
 *     this._temp_uditaPauseSignName = $gameSystem.xxx_pauseSign();
 * };
 * 
 * 
 * 
 * === 使用条款 ===
 * 
 * MIT 协议
 * 
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 *    
 * 
 * @command 更换通用Udita皮肤样式
 * 
 * @arg 目标图片
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 要更换为哪个图片样式？
 * @default 
 * 
 * @command 更换通用Udita选择光标样式
 * 
 * @arg 目标图片
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 要更换为哪个图片样式？
 * @default 
 * 
 * @command 更换通用Udita对话暂停光标样式
 * 
 * @arg 目标图片
 * @type file
 * @dir img/system/
 * @require 1
 * @desc 要更换为哪个图片样式？
 * @default 
 */
var Imported = Imported || {};
Imported.UditaUIMZ_Addon_MultiUIStyles = true;

var RSSD = RSSD || {};
RSSD.UUI_UMS = {};
RSSD.UUI_UMS.pluginName = 'UditaUIMZ_Addon_MultiUIStyles';

if(Imported.UditaUIMZ) {

    //==============================================================================
    // Game_System
    //==============================================================================

    Game_System.prototype.changeUditaskin = function(name) {
        this._uditaskin = name;
    };

    Game_System.prototype.changeUditaCursor = function(name) {
        this._uditaCursor = name;
    };

    Game_System.prototype.changeUditaPauseSign = function(name) {
        this._uditaPauseSign = name;
    };

    //==============================================================================
    // Window_Base
    //==============================================================================

    let __RSSD_UUI_Window_Base_initUditaTempData = Window_Base.prototype.initUditaTempData;
    Window_Base.prototype.initUditaTempData = function() {
        __RSSD_UUI_Window_Base_initUditaTempData.call(this);
        this._temp_uditaskinName = '';
        this._temp_uditaCursorName = '';
        this._temp_uditaPauseSignName = '';
    };

    Window_Base.prototype.isUditaUIStyleStatic = function() {
        return false;
    };

    Window_Base.prototype.isUditaskinStyleStatic = function() {
        return false;
    };

    Window_Base.prototype.isUditaCursorStyleStatic = function() {
        return false;
    };

    Window_Base.prototype.isUditaPauseSignStyleStatic = function() {
        return false;
    };

    let __RSSD_UUI_Window_Base_updateUditaAdditionalStuff = Window_Base.prototype.updateUditaAdditionalStuff
    Window_Base.prototype.updateUditaAdditionalStuff = function() {
        this.updateUditaUIChange();
        __RSSD_UUI_Window_Base_updateUditaAdditionalStuff.call(this);
        this.updateMUTempStatus();  // Multiple UditaUI styles
    };

    Window_Base.prototype.updateUditaUIChange = function() {
        if(!this.isUditaUIStyleStatic()) {
            this.updateUditaskinChange();
            this.updateUditaCursorChange();
            this.updateUditaPauseSignChange();
        }
    };

    Window_Base.prototype.updateUditaskinChange = function() {
        if(!this.isUditaskinStyleStatic()) {
            if(this.isOnMUSkinChange()) {
                this.loadUditaskin();
            }
        }
    };

    Window_Base.prototype.updateUditaCursorChange = function() {
        if(!this.isUditaCursorStyleStatic()) {
            if(this.isOnMUCursorChange()) {
                this.loadUditaCursor();
            }
        }
    };

    Window_Base.prototype.updateUditaPauseSignChange = function() {
        if(!this.isUditaPauseSignStyleStatic()) {
            if(this.isOnMUPauseSignChange()) {
                this.loadUditaPauseSign();
            }
        }
    };

    Window_Base.prototype.isOnMUSkinChange = function() {
        return this._temp_uditaskinName !== $gameSystem.uditaskin();
    };

    Window_Base.prototype.isOnMUCursorChange = function() {
        return this._temp_uditaCursorName !== $gameSystem.uditaCursor();
    };

    Window_Base.prototype.isOnMUPauseSignChange = function() {
        return this._temp_uditaPauseSignName !== $gameSystem.uditaPauseSign();
    };

    Window_Base.prototype.updateMUTempStatus = function() {
        this._temp_uditaskinName = $gameSystem.uditaskin();
        this._temp_uditaCursorName = $gameSystem.uditaCursor();
        this._temp_uditaPauseSignName = $gameSystem.uditaPauseSign();
    };

    //==============================================================================
    // PluginManager
    //==============================================================================

    PluginManager.registerCommand(RSSD.UUI_UMS.pluginName, '更换通用Udita皮肤样式', (args)=>{
        const filename = args['目标图片'];
        if(filename) {
            $gameSystem.changeUditaskin(filename);
        }
    });

    PluginManager.registerCommand(RSSD.UUI_UMS.pluginName, '更换通用Udita选择光标样式', (args)=>{
        const filename = args['目标图片'];
        if(filename) {
            $gameSystem.changeUditaCursor(filename);
        }
    });

    PluginManager.registerCommand(RSSD.UUI_UMS.pluginName, '更换通用Udita对话暂停光标样式', (args)=>{
        const filename = args['目标图片'];
        if(filename) {
            $gameSystem.changeUditaPauseSign(filename);
        }
    });
}