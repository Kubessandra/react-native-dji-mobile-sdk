import { SDKManager } from './SDKManager';
import { getDJISDKEventEmitter } from './SDKEventEmitter';

const sdkManager = new SDKManager();

export { getDJISDKEventEmitter, sdkManager };

// Components
export { DJIVideoView } from './components/DJIVideoView';

// Types
export type { SDKAircraft as SDKDrone } from './SDKAircraft';
export type { SDKManager } from './SDKManager';
