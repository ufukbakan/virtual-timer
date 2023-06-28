<h1 align="center">
    Virtual Timers
</h1>

<p align="center">
    <img style="display: inline" src="https://raw.githubusercontent.com/ufukbakan/virtual-timer/master/badges/badge-branches.svg">
    <img style="display: inline" src="https://raw.githubusercontent.com/ufukbakan/virtual-timer/master/badges/badge-functions.svg">
    <img style="display: inline" src="https://raw.githubusercontent.com/ufukbakan/virtual-timer/master/badges/badge-lines.svg">
    <img style="display: inline" src="https://raw.githubusercontent.com/ufukbakan/virtual-timer/master/badges/badge-statements.svg">
</p>


## What is it
It creates only a single timer with specified precision (like a virtual cpu tick),
and handles all timeouts and intervals in it.
## Pros
- Performance gain when you set hundreds, thousands, billions of intervals & timeouts.
## Cons
- Performances loss when you set a few intervals & timeouts.

## Usage
```ts
import { VirtualTimer } from "virtual-timer";

const virtualTimer = new VirtualTimer();
virtualTimer.timeout(
    (delta) => { console.log(`Timeout running after ${delta} ms`) },
    1000
);
virtualTimer.interval(
    (delta) => { console.log(`Interval running after ${delta} ms`) },
    1000
);
```

You may specify precision (lower is more precise)
```ts
const virtualTimer = new VirtualTimer(5);
```
You may not use delta:
```ts
virtualTimer.timeout(
    () => { console.log("delta is optional") },
    1000
);
```
