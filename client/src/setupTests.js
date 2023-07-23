import "@testing-library/jest-dom";

const authObjectMock = {
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true))
  };
const authMock = jest.fn(() => authObjectMock);
  
export { authMock };