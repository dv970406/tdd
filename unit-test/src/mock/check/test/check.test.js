const check = require("../check");

describe("check", () => {
  let onSuccess;
  let onFail;

  beforeEach(() => {
    onSuccess = jest.fn();
    onFail = jest.fn();
  });

  it("should call onSuccess when predicate is true", () => {
    check(() => true, onSuccess, onFail);

    // expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    // expect(onSuccess.mock.calls[0][0]).toBe('yes');
    expect(onSuccess).toHaveBeenCalledWith("yes");
    // expect(onFail.mock.calls.length).toBe(0);
    expect(onFail).toHaveBeenCalledTimes(0);
  });

  it("should call onFail when predicate is false", () => {
    check(() => false, onSuccess, onFail);

    // onFail 함수가 몇 번 호출됐나요? - false를 줬으니 1번 호출
    expect(onFail).toHaveBeenCalledTimes(1);
    // 'no' 라는 인자와 함께 호출됐나요? - false를 줬으니 onFail('no')로 호출됨
    expect(onFail).toHaveBeenCalledWith("no");
    // onSuccess 함수가 몇 번 호출됐나요? - false를 줬으니 0번 호출
    expect(onSuccess).toHaveBeenCalledTimes(0);
  });
});
