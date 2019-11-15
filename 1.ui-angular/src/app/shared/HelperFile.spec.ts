import {add} from "./HelperFile.js";

fdescribe('HelperFile', () => {
  it('should add 2 files', () => {
    let sum = add(2, 3);
    sum = 10;
    expect(sum).toEqual(5);
  });
});
