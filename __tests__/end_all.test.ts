import { VirtualTimer } from "..";
import { sleep } from "./utils";

test("End all", async () => {
    const virtualTimer = new VirtualTimer();
    let ticks = 0;
    let tocks = 0;
    const incrementTicks = () => ticks++;
    const incrementTocks = () => tocks++;
    virtualTimer.timeout(incrementTicks, 250);
    virtualTimer.timeout(incrementTocks, 250);
    virtualTimer.interval(incrementTicks, 250);
    virtualTimer.interval(incrementTocks, 250);
    
    virtualTimer.end();

    await sleep(2700);

    expect(ticks).to.be.eq(0);
    expect(tocks).to.be.eq(0);
});
