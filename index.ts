import { IntervalController, prcIntervalWithDelta } from "precision-timeout-interval";

type DeltaReceivingCallback = (delta?: number) => any;
type CallbackInfo = {
    fn: DeltaReceivingCallback,
    timeout: number,
    interval: number,
    startTime: number,
    repeats: boolean
}

export class VirtualTimer {
    private callbacks: CallbackInfo[] = [];
    private precision = 20;
    private controller: IntervalController;
    private time = 0;

    constructor(precision?: number) {
        this.precision = precision ?? 20;
        this.controller = prcIntervalWithDelta(this.precision, this.#mainLoop.bind(this));
    }

    timeout(callback: DeltaReceivingCallback, milliseconds: number) {
        const cbInfo = {
            fn: callback,
            repeats: false,
            startTime: this.time,
            interval: milliseconds,
            timeout: this.time + milliseconds
        };
        this.callbacks.push(cbInfo);
        return {
            cancel: () => this.#remove(cbInfo)
        }
    }

    interval(callback: DeltaReceivingCallback, milliseconds: number) {
        const cbInfo = {
            fn: callback,
            repeats: true,
            startTime: this.time,
            interval: milliseconds,
            timeout: this.time + milliseconds
        };
        this.callbacks.push(cbInfo);
        return {
            cancel: () => this.#remove(cbInfo)
        }
    }

    #remove(c: CallbackInfo) {
        this.callbacks = this.callbacks.filter(cb => cb != c);
    }

    #mainLoop(delta: number) {
        this.time += delta;
        for (let i = 0; i < this.callbacks.length; i++) {
            const callback = this.callbacks[i];
            if (callback.timeout <= this.time) {
                callback.fn(this.time - callback.startTime);
                if (callback.repeats) {
                    callback.startTime = this.time;
                    callback.timeout = callback.startTime + callback.interval;
                } else {
                    this.callbacks.splice(i, 1);
                }
            }
        }
    }

    end() {
        this.callbacks = [];
        this.controller.cancel();
    }
}