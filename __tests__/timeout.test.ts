import { VirtualTimer } from "..";
import { sleep } from "./utils";

test("Test virtual timeouts", async () => {
  const virtualTimer = new VirtualTimer();
  let ticks = 0;
  let tocks = 0;
  const incrementTicks = () => ticks++;
  const incrementTocks = (delta: number) => tocks++;

  virtualTimer.timeout(incrementTicks, 500).cancel();
  virtualTimer.timeout(incrementTocks, 500).cancel();

  virtualTimer.timeout(incrementTicks, 500);
  virtualTimer.timeout(incrementTocks, 500);

  await sleep(2500);

  expect(ticks).to.be.eq(1);
  expect(tocks).to.be.eq(1);
});
