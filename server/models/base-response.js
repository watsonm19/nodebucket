class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  toObject() {
    return {
      code: this.code,
      msg: this.msg,
    }
  }
}

