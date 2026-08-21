//==============================================================================
// RSSD_MouseHoverPosRecord.js
// Author: Rose_shadows
//==============================================================================
/*:
 * @plugindesc 1.0.0 - 鼠标位置记录模式
 * @author Rose_shadows
 * @target MZ MV
 * @help
 * ！注意！为了更好的兼容性，请将该插件放在插件管理器靠上的位置。
 * 
 * === 介绍 ===
 * 
 * 使 TouchInput._x 和 TouchInput._y 在仅移动鼠标时即可正确记录鼠标位置。
 * 还提供根据开关状态，决定鼠标位置是否需要按住左键才可记录的功能。
 * 结合脚本，搭配共通事件的并行处理或外部插件，可以做出拖动、滑动的效果。
 * 
 * 适用版本：
 * MV: 1.6.0+
 * MZ: 1.0.1+
 * 
 * 该插件提供了两种可切换的记录方式，满足条件，鼠标位置才会被实时记录：
 * 1. 移动鼠标（滑动）
 * 2. 移动鼠标+按住左键（拖动）
 * 如果不用该插件，MV 默认使用记录方式#2，MZ 默认使用记录方式#1。
 * 
 * 安装好插件后，默认情况下，移动鼠标（记录方式#1）即可记录鼠标位置。
 * 如果想切换到移动鼠标+按住左键（记录方式#2），
 * 请将在插件参数中设置的开关打开。
 * 如果关掉开关或不设置开关，那么将使用记录方式#1。
 * 
 * ！注意！虽然兼容 MZ，但由于 MZ 自带鼠标悬停坐标检测方法，
 * 且将该方法用于自动选择菜单指令，
 * 如果打开了开关，切换到移动鼠标+按住左键（记录方式#2），
 * 那么鼠标自动选中菜单指令的功能也会失效，变成像 MV 一样的点选方式。
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
 * @param 切换开关ID
 * @type switch
 * @desc 切换鼠标位置记录方式的开关ID。若为 0 则不使用开关。
 * @default 0
 */
var Imported = Imported || {};
Imported.RSSD_MouseHoverPosRecord = true;

var RSSD = RSSD || {};
RSSD.MHPR = {};
RSSD.MHPR.pluginName = 'RSSD_MouseHoverPosRecord';

RSSD.MHPR.parameters = PluginManager.parameters(RSSD.MHPR.pluginName);
RSSD.MHPR.swiID = +RSSD.MHPR.parameters['切换开关ID'] || 0;

if(Utils.RPGMAKER_NAME === 'MZ') {

    TouchInput._onMouseMove = function(event) {
        const x = Graphics.pageToCanvasX(event.pageX);
        const y = Graphics.pageToCanvasY(event.pageY);
        var needsPressed = RSSD.MHPR.swiID && $gameSwitches && $gameSwitches.value(RSSD.MHPR.swiID);
        if (this._mousePressed && needsPressed || !needsPressed) {
            this._onMove(x, y);
        }
        if (Graphics.isInsideCanvas(x, y) && !this._mousePressed && !needsPressed) {
            this._onHover(x, y);
        }
    };

} else {

    TouchInput._onMouseMove = function(event) {
        var x = Graphics.pageToCanvasX(event.pageX);
        var y = Graphics.pageToCanvasY(event.pageY);
        var needsPressed = RSSD.MHPR.swiID && $gameSwitches && $gameSwitches.value(RSSD.MHPR.swiID);
        if (this._mousePressed && needsPressed || !needsPressed) {
            this._onMove(x, y);
        }
    };

}