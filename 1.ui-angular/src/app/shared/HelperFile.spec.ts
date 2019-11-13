import {add} from "./HelperFile.js";

describe('HelperFile', () => {
  it('should add 2 files', () => {
    const sum = add(2, 3);
    expect(sum).toEqual(5);
  });
});
