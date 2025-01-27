"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runRedisOperations = runRedisOperations;
const redis_1 = require("redis");
let redisClient;
function runRedisOperations() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!redisClient) {
            redisClient = (0, redis_1.createClient)({
                username: 'default',
                password: 'O0I8G6lDsqwm0idy1ULm6GNUV7xfTe9T',
                socket: {
                    host: 'redis-15129.c14.us-east-1-2.ec2.redns.redis-cloud.com',
                    port: 15129,
                },
            });
            redisClient.on('error', (err) => console.error('Redis Client Error:', err));
            yield redisClient.connect();
        }
        return redisClient;
    });
}
