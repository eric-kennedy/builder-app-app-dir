import ivm from 'isolated-vm';

const isolate = new ivm.Isolate({ memoryLimit: 128 });
const context = isolate.createContextSync();

export default context;
