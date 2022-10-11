"use strict";
// TODO: Setup user database
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mysql_1 = require("mysql");
var vars_config_1 = require("./../vars.config");
var queries_1 = require("./sql/queries");
var dataSource = vars_config_1.DATA_SOURCES.mySqlDataSource;
var dbCreatePool = function () {
    try {
        var pool = (0, mysql_1.createPool)({
            connectionLimit: dataSource.DB_CONNECTION_LIMIT,
            host: dataSource.DB_HOST,
            user: dataSource.DB_USER,
            password: dataSource.DB_PASSWORD,
            database: dataSource.DB_DATABASE
        });
        console.log("pool created");
        return pool;
    }
    catch (error) {
        console.error("[mysql.connector][init][Error]: ", error);
        throw new Error("failed to initialized pool");
    }
};
var addUser = function (pool, email, name, highScore) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, execute(pool, queries_1.Queries.AddUser, [email, name, highScore || 0])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.affectedRows > 0];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUser = function (pool, name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, execute(pool, queries_1.Queries.GetUser, [name])];
    });
}); };
var updateUser = function (pool, name, highScore) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, execute(pool, queries_1.Queries.UpdateUser, [highScore, name])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result.affectedRows > 0];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
var execute = function (pool, query, params) {
    try {
        if (!pool)
            throw new Error("Pool was not created. Ensure pool is created when running the app.");
        return new Promise(function (resolve, reject) {
            pool.query(query, params, function (error, results) {
                if (error)
                    reject(error);
                else
                    resolve(results);
            });
        });
    }
    catch (error) {
        console.error("[mysql.connector][execute][Error]: ", error);
        throw new Error("failed to execute MySQL query");
    }
};
module.exports = { dbCreatePool: dbCreatePool, addUser: addUser, updateUser: updateUser, getUser: getUser };
