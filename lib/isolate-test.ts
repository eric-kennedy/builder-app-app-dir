import ivm from 'isolated-vm';

export default function runIsolated () {
    const code = `++count;`;

    const isolate = new ivm.Isolate({ memoryLimit: 8 /* MB */ });
    const script = isolate.compileScriptSync(code);
    const context = isolate.createContextSync();
    
    context.evalSync('let count = 0;');
    
    console.log(script.runSync(context)); // Prints "1"
    console.log(script.runSync(context)); // Prints "2"
}
