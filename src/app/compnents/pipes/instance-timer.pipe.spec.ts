import { InstanceTimerPipe } from './instance-timer.pipe';

describe('InstanceTimerPipe', () => {
  it('create an instance', () => {
    const pipe = new InstanceTimerPipe();
    expect(pipe).toBeTruthy();
  });
});
