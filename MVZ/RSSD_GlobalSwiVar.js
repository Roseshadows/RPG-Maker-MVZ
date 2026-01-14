//=============================================================================
// RSSD_GlobalSwiVar.js
// Author: Rose_shadows
//=============================================================================
/*:
 * @plugindesc 1.0.1 - 跨存档开关 & 变量
 * @author Rose_shadows
 * @target MZ MV
 * @help
 * === 介绍 ===
 * 
 * 该插件允许你将特定游戏开关或变量设置为跨存档的全局变量。
 * 只要在插件中设置好相关开关和变量ID，对应开关和变量的值就不再受限于存档，
 * 而通用于游戏内的任何进程。
 * 搭配这个功能，可以实现多周目流程、通关开启隐藏、收集成就、随剧情改变标题背景等。
 * 
 * 该插件的工作流程是检测相关开关或变量的值（直接检测_data数组某元素）是否被变更，
 * 如有变更，就将更新的数据存入 save/ 文件夹下的加密数据文件：
 * MV 的文件：globalswivar.rpgsave
 * MZ 的文件：globalswivar.rmmzsave
 * 因此，该插件具有良好的兼容性，能够检测到非编辑器操作的开关与变量是否有变更。
 * 
 * 由于该插件覆写了部分方法，为了保证最佳的兼容性，
 * 请将该插件放到插件管理器靠上的位置。
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
 * 1.0.1 - 添加了对 MV 的兼容。
 * 
 * @param Global Switches
 * @text 跨存档开关列表
 * @type switch[]
 * @desc 在这里写入开关ID，即可将开关设为跨存档开关。
 * @default []
 * 
 * @param Global Variables
 * @text 跨存档变量列表
 * @type variable[]
 * @desc 在这里写入变量ID，即可将开关设为跨存档变量。
 * @default []
 */
var Imported = Imported || {};
Imported.RSSD_GlobalSwiVar = true;

var RSSD = RSSD || {};
RSSD.GSV = {};
RSSD.GSV.pluginName = 'RSSD_GlobalSwiVar';

RSSD.GSV.parameters = PluginManager.parameters(RSSD.GSV.pluginName);
RSSD.GSV.switches = JSON.parse(RSSD.GSV.parameters['Global Switches'] || '[]').map((id)=>+id);
RSSD.GSV.variables = JSON.parse(RSSD.GSV.parameters['Global Variables'] || '[]').map((id)=>+id);
RSSD.GSV.isMZ = Utils.RPGMAKER_NAKE === 'MZ';
RSSD.GSV.dataId = -2; // for MV only
RSSD.GSV.filename = 'globalswivar';

//=============================================================================
// DataManager
//=============================================================================

DataManager._globalSwiVarInfo = null;

DataManager.loadGlobalSwiVarInfo = function() {
    if(RSSD.GSV.isMZ) {
        StorageManager.loadObject(RSSD.GSV.filename)
            .then(globalInfo => {
                this._globalSwiVarInfo = globalInfo;
                return 0;
            })
            .catch(() => {
                this._globalSwiVarInfo = this.globalSwiVarEmptyObject();
            });
    } else {
        let json;
        try {
            json = StorageManager.load(RSSD.GSV.dataId);
        } catch (e) {
            console.error(e);
            this._globalSwiVarInfo = this.globalSwiVarEmptyObject();
        }
        if (json) {
            const globalInfo = JSON.parse(json);
            this._globalSwiVarInfo = globalInfo;
        } else {
            this._globalSwiVarInfo = this.globalSwiVarEmptyObject();
        }
    }
};

DataManager.globalSwiVarEmptyObject = function() {
    return {switches: {}, variables: {}};
};

DataManager.saveGlobalSwiVarInfo = function() {
    if(RSSD.GSV.isMZ) StorageManager.saveObject(RSSD.GSV.filename, this._globalSwiVarInfo);
    else StorageManager.save(RSSD.GSV.dataId, JSON.stringify(this._globalSwiVarInfo));
};

DataManager.isGlobalSwiVarInfoLoaded = function() {
    return !!this._globalSwiVarInfo;
};

// Override
DataManager.setupNewGame = function() {
    this.createGameObjects();
    this.setupGlobalSwitches();
    this.setupGlobalVariables();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    if(RSSD.GSV.isMZ) {
        $gamePlayer.setupForNewGame();
    } else {
        $gamePlayer.reserveTransfer($dataSystem.startMapId,
            $dataSystem.startX, $dataSystem.startY);
    }
    Graphics.frameCount = 0;
};

// Override
DataManager.setupBattleTest = function() {
    this.createGameObjects();
    this.setupGlobalSwitches();
    this.setupGlobalVariables();
    $gameParty.setupBattleTest();
    BattleManager.setup($dataSystem.testTroopId, true, false);
    BattleManager.setBattleTest(true);
    BattleManager.playBattleBgm();
};

// Override
DataManager.setupEventTest = function() {
    this.createGameObjects();
    this.setupGlobalSwitches();
    this.setupGlobalVariables();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(-1, 8, 6);
    $gamePlayer.setTransparent(false);
};

DataManager.setupGlobalSwitches = function() {
    const swiData = this._globalSwiVarInfo.switches;
    for(const num in swiData) {
        const id = +num;
        const value = this.globalSwitchInfo(id);
        if(value !== null) $gameSwitches._data[id] = value;
    }
};

DataManager.setupGlobalVariables = function() {
    const varData = this._globalSwiVarInfo.variables;
    for(const num in varData) {
        const id = +num;
        const value = this.globalVariableInfo(id);
        if(value !== null) $gameVariables._data[id] = value;
    }
};

DataManager.globalSwitchInfo = function(switchId) {
    const info = this._globalSwiVarInfo;
    return info && info.switches[''+switchId] ? info.switches[''+switchId] : null;
};

DataManager.globalVariableInfo = function(variableId) {
    const info = this._globalSwiVarInfo;
    return info && info.variables[''+variableId] ? info.variables[''+variableId] : null;
};

DataManager.saveGlobalSwitch = function(switchId) {
    this._globalSwiVarInfo.switches[''+switchId] = $gameSwitches.value(switchId);
    this.saveGlobalSwiVarInfo();
};

DataManager.saveGlobalVariable = function(variableId) {
    this._globalSwiVarInfo.variables[''+variableId] = $gameVariables.value(variableId);
    this.saveGlobalSwiVarInfo();
};

//=============================================================================
// StorageManager
//=============================================================================

if(!RSSD.GSV.isMZ) {
    let __RSSD_GSV_StorageManager_localFilePath = StorageManager.localFilePath;
    StorageManager.localFilePath = function(savefileId) {
        if(savefileId === RSSD.GSV.dataId) {
            return this.localFileDirectoryPath() + RSSD.GSV.filename + '.rpgsave';
        }
        return __RSSD_GSV_StorageManager_localFilePath.call(this, savefileId);
    };

    let __RSSD_GSV_StorageManager_webStorageKey = StorageManager.webStorageKey;
    StorageManager.webStorageKey = function(savefileId) {
        if(savefileId === RSSD.GSV.dataId) {
            return 'RPG GlobalSwiVar';
        }
        return __RSSD_GSV_StorageManager_webStorageKey.call(this, savefileId);
    };
}

//=============================================================================
// Scene_Boot
//=============================================================================

let __RSSD_GSV_Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
    __RSSD_GSV_Scene_Boot_create.call(this);
    this.loadGlobalSwiVarData();
};

Scene_Boot.prototype.loadGlobalSwiVarData = function() {
    DataManager.loadGlobalSwiVarInfo();
};

Scene_Boot.prototype.isGlobalSwiVarDataLoaded = function() {
    return DataManager.isGlobalSwiVarInfoLoaded();
};

let __RSSD_GSV_Scene_Boot_isReady = Scene_Boot.prototype.isReady;
Scene_Boot.prototype.isReady = function() {
    return __RSSD_GSV_Scene_Boot_isReady.call(this) && this.isGlobalSwiVarDataLoaded();
};

//=============================================================================
// Game_Switches
//=============================================================================

let __RSSD_GSV_Game_Switches_initialize = Game_Switches.prototype.initialize;
Game_Switches.prototype.initialize = function() {
    __RSSD_GSV_Game_Switches_initialize.call(this);
    this.setupGlobalSwitchListener();
};

Game_Switches.prototype.setupGlobalSwitchListener = function() {
    const switches = RSSD.GSV.switches;
    for(let i = 0; i < switches.length; i++) {
        const id = switches[i];
        const that = this;
        Object.defineProperty(this._data, ''+id, {
            get: function() {return this._value;},
            set: function(value) {this._value = value; that.synchronizeWithGlobalSave(id);},
            configurable: true
        });
    }
};

Game_Switches.prototype.synchronizeWithGlobalSave = function(switchId) {
    if(switchId > 0 && switchId < $dataSystem.switches.length && RSSD.GSV.switches.includes(switchId)) {
        DataManager.saveGlobalSwitch(switchId);
    }
};

//=============================================================================
// Game_Variables
//=============================================================================

let __RSSD_GSV_Game_Variables_initialize = Game_Variables.prototype.initialize;
Game_Variables.prototype.initialize = function() {
    __RSSD_GSV_Game_Variables_initialize.call(this);
    this.setupGlobalVariableListener();
};

Game_Variables.prototype.setupGlobalVariableListener = function() {
    const variables = RSSD.GSV.variables;
    for(let i = 0; i < variables.length; i++) {
        const id = variables[i];
        const that = this;
        Object.defineProperty(this._data, ''+id, {
            get: function() {return this._value;},
            set: function(value) {this._value = value; that.synchronizeWithGlobalSave(id);},
            configurable: true
        });
    }
};

Game_Variables.prototype.synchronizeWithGlobalSave = function(variableId) {
    if(variableId > 0 && variableId < $dataSystem.variables.length && RSSD.GSV.variables.includes(variableId)) {
        DataManager.saveGlobalVariable(variableId);
    }
};
