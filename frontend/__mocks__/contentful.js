

const contentful = jest.genMockFromModule('contentful');

let mockFiles = Object.create(null);
function __setResponse(data = {}){
  mockFiles = data;
}

let mockClient = {
  getEntries() {
    return Promise.resolve(mockFiles)
  }
}

const createClient = () => {
  return mockClient;
}

const __getData = () => {
  return mockFiles;
}

const __resetData = () => {
  __setResponse(Object.create(null));
}

contentful.__getData = __getData;
contentful.__setResponse = __setResponse;
contentful.createClient = createClient;
console.log(contentful);

module.exports = contentful;