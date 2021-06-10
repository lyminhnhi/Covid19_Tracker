export const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    cb()
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    cb()
  }
};

