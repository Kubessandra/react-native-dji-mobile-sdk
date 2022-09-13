import { SDKManager } from './SDKManager';
import { getDJISDKEventEmitter } from './SDKEventEmitter';

const sdkManager = new SDKManager();

export { getDJISDKEventEmitter, sdkManager };

export type { SDKAircraft as SDKDrone } from './SDKAircraft';
export type { SDKManager } from './SDKManager';
