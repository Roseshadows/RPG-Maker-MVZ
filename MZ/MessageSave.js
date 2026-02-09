//=============================================================================
// MessageSave.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 对话消息即时存档
 * @author Rose_shadows
 * @target MZ
 * @help
 * ！注意！
 * 该插件覆写了部分方法，所以请将该插件放到插件管理器靠上的位置。
 * 
 * 默认情况下，RM不支持像AVG那样在对话中即时存档的功能。
 * 虽然可以在对话时打开控制台输入代码强制存档，但读取这个存档后，就会发现对话文本
 * 并不是从存档时显示的对话开始，而是从其下一条对话开始的。
 * 在显示选项、数字输入处理、物品选择处理时强制存档，读取时甚至会直接跳过选择的过
 * 程。
 * 
 * 该插件提供了一个专用的存档方法以实现对话消息即时存档的功能，
 * 只要在对话、选择选项、数字输入处理、物品选择处理时调用这个方法存档，读取存档时
 * 就能从正确的地方开始。
 * 
 * 脚本：
 * DataManager.executeSaveWithinMessage(savefileId);
 * - 在显示对话消息时存档。可以在控制台测试。
 *    savefileId: 存档槽位ID。如果启用了自动保存功能，建议大于等于2。
 * 
 */

var Imported = Imported || {};
Imported.MessageSave = true;

//=============================================================================
// Game_Temp
//=============================================================================

let __Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    __Game_Temp_initialize.call(this);
    this._interpreterCmdJumpIndex = 1;
};

Game_Temp.prototype.setInterpreterCmdJumpIndex = function(value) {
    this._interpreterCmdJumpIndex = value;
};

Game_Temp.prototype.interpreterCmdJumpIndex = function() {
    return this._interpreterCmdJumpIndex;
};

//=============================================================================
// Game_System
//=============================================================================

let __Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
    __Game_System_onBeforeSave.call(this);
    this.prepareInterpreterIndexForSavefile();
};

Game_System.prototype.prepareInterpreterIndexForSavefile = function() {
    const interpreter = $gameMap._interpreter;
    if(interpreter) {
        interpreter._index -= $gameTemp.interpreterCmdJumpIndex();
    }
};

Game_System.prototype._private_onAfterSave = function() {
    const interpreter = $gameMap._interpreter;
    if(interpreter) {
        interpreter._index += $gameTemp.interpreterCmdJumpIndex();
    }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Override
Game_Interpreter.prototype.executeCommand = function() {
    const command = this.currentCommand();
    if (command) {
        this._indent = command.indent;
        const prevIndex = this._index;
        const methodName = "command" + command.code;
        if (typeof this[methodName] === "function") {
            if (!this[methodName](command.parameters)) {
                return false;
            }
        }
        this._index++;
        const newIndex = this._index;
        $gameTemp.setInterpreterCmdJumpIndex(newIndex - prevIndex);
    } else {
        this.terminate();
    }
    return true;
};

//=============================================================================
// DataManager
//=============================================================================

DataManager.executeSaveWithinMessage = function(savefileId) {
    $gameSystem.setSavefileId(savefileId);
    $gameSystem.onBeforeSave();
    this.saveGame(savefileId);
    $gameSystem._private_onAfterSave();
};