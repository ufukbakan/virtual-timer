import { VirtualTimer } from "..";
import { sleep } from "./utils";

test("Test virtual intervals", async () => {
  const virtualTimer = new VirtualTimer(50);
  let ticks = 0;
  let tocks = 0;
  const incrementTicks = () => ticks++;
  const incrementTocks = (delta: number) => tocks++;

  virtualTimer.interval(incrementTicks, 500).cancel();
  virtualTimer.interval(incrementTocks, 500).cancel();

  virtualTimer.interval(incrementTicks, 500);
  virtualTimer.interval(incrementTocks, 500);

  await sleep(2700);

  expect(ticks).to.be.eq(5);
  expect(tocks).to.be.eq(5);
});
