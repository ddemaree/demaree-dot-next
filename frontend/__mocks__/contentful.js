const contentful = jest.genMockFromModule('contentful');

let mockClient = {
  getEntries() {
    return Promise.resolve(mockFiles)
  }
}

const createClient = () => {
  return mockClient;
}

let mockFiles = Object.create(null);
const __setResponse = (data = {}) => {
  mockFiles = data;
}

const __getData = () => {
  return mockFiles;
}

const __resetData = () => {
  __setResponse(Object.create(null));
}

contentful.__getData = __getData;
contentful.__setResponse = __setResponse;
contentful.__resetData = __resetData;
contentful.createClient = createClient;

module.exports = contentful;