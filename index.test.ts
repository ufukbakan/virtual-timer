import { VirtualTimer } from ".";

describe("Test virtual timeout & interval", () => {
    test("Test without precision arg",
        async () => {
            let ticks = 0;
            let tocks = 0;
            const virtualTimer = new VirtualTimer();
            await new Promise(r => setTimeout(r, 1000)); // wait one second
            const fiveSeconds = () => new Promise(r => setTimeout(r, 5000));

            virtualTimer.interval((delta) => {
                ticks++;
            }, 500);

            virtualTimer.interval(() => {
                ticks++;
            }, 500).cancel();

            virtualTimer.timeout((delta) => {
                tocks++;
            }, 750);

            virtualTimer.timeout((delta) => {
                tocks++;
            }, 500).cancel();

            virtualTimer.timeout(() => virtualTimer.end(), 2700);

            await fiveSeconds();

            expect(ticks, `ticks=${ticks}`).to.be.eq(5);
            expect(tocks, `tocks=${tocks}`).to.be.eq(1);
        },
        {
            timeout: 6500
        }
    );

    test("Test with precision arg",
        async () => {
            let ticks = 0;
            let tocks = 0;

            const precision = 50;
            const virtualTimer = new VirtualTimer(precision);
            await new Promise(r => setTimeout(r, 1000)); // wait one second
            const fiveSeconds = () => new Promise(r => setTimeout(r, 5000));

            virtualTimer.interval((delta) => {
                ticks++;
            }, 500);

            virtualTimer.interval(() => {
                ticks++;
            }, 500).cancel();

            virtualTimer.timeout((delta) => {
                tocks++;
            }, 750);

            virtualTimer.timeout((delta) => {
                tocks++;
            }, 500).cancel();

            virtualTimer.timeout(() => virtualTimer.end(), 2700);

            await fiveSeconds();

            expect(ticks, `ticks=${ticks}`).to.be.eq(5);
            expect(tocks, `tocks=${tocks}`).to.be.eq(1);
        },
        {
            timeout: 6500
        }
    );

})