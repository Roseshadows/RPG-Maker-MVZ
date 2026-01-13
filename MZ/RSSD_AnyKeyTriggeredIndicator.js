//=============================================================================
// RSSD_AnyKeyTriggeredIndicator.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.0 - 检测任意键盘按键是否被按下
 * @author Rose_shadows
 * @help
 * 
 * Input.isAnyKeyTriggered()
 * - 检测键盘上是否有任意按键被按下
 * 
 * 
 * === 更新日志 ===
 * 
 * 1.0.0 - 完成。
 */
var Imported = Imported || {};
Imported.RSSD_AnyKeyTriggeredIndicator = true;

var RSSD = RSSD || {};
RSSD.AKTI = {};
RSSD.AKTI.pluginName = "RSSD_AnyKeyTriggeredIndicator";

//=============================================================================
// Input
//=============================================================================

let __RSSD_AKTI_Input_clear = Input.clear;
Input.clear = function() {
    __RSSD_AKTI_Input_clear.call(this);
    this.__private_RSSD_AKTI_temp_latestKeyCode = null;
    this.__private_RSSD_AKTI_isAnyKeyTriggered = false;
};

let __RSSD_AKTI_Input__onKeyDown = Input._onKeyDown;
Input._onKeyDown = function(event) {
    this.__private_RSSD_AKTI_isAnyKeyTriggered = false;
    __RSSD_AKTI_Input__onKeyDown.call(this, event);
    if(event.keyCode !== this.__private_RSSD_AKTI_temp_latestKeyCode) {
        this.__private_RSSD_AKTI_isAnyKeyTriggered = true;
    }
    this.__private_RSSD_AKTI_temp_latestKeyCode = event.keyCode;
};

Input.isAnyKeyTriggered = function() {
    return this.__private_RSSD_AKTI_isAnyKeyTriggered;
};