export class EventEmitter {
  addListener() { return { remove: () => {} }; }
  removeAllListeners() {}
  emit() {}
}

export class CodedError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'CodedError';
  }
}

export class NativeModule extends EventEmitter {}

export const registerWebModule = (moduleClass: unknown) => moduleClass;
export const NativeModulesProxy = {};
export const UnavailabilityError = CodedError;
export const Platform = {
  OS: 'web',
  select: (obj: Record<string, unknown>) => obj.web ?? obj.default,
};

export type EventSubscription = { remove: () => void };
