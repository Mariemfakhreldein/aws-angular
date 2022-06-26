import { StudentSearchByNamePipe } from './student-search-by-name.pipe';

describe('StudentSearchByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new StudentSearchByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
