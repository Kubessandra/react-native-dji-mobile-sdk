import { NativeModules, NativeEventEmitter } from 'react-native';
import { LINKING_ERROR } from './constant';

export interface EventList {
  NEW_VIDEO_FRAME: {
    bufferString: string;
    size: number;
    id: string;
  };
  PRODUCT_CONNECTED: void;
  REGISTRATION_SUCCESS: void;
  PRODUCT_DISCONNECTED: void;
}

const { ReactEventEmitter } = NativeModules;

if (!ReactEventEmitter) {
  throw new Error(LINKING_ERROR);
}

let eventEmitter = new NativeEventEmitter(ReactEventEmitter);
let sdkEventManager: SDKEventManager | null = null;

const getDJISDKEventEmitter = () => {
  if (!sdkEventManager) {
    sdkEventManager = new SDKEventManager();
  }
  return sdkEventManager;
};

class SDKEventManager {
  #events = new Set<keyof EventList>();

  addListener<T extends keyof EventList>(
    eventName: T,
    listener: (event: EventList[T]) => void
  ) {
    this.#events.add(eventName);
    return eventEmitter.addListener(eventName, listener);
  }

  removeAllListeners<T extends keyof EventList>(eventName?: T) {
    if (eventName) {
      eventEmitter.removeAllListeners(eventName);
    } else {
      this.#events.forEach((event) => {
        eventEmitter.removeAllListeners(event);
      });
      this.#events.clear();
    }
  }
}

export { getDJISDKEventEmitter };
