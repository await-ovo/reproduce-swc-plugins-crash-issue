## Steps to reproduce:

1. `pnpm i`
2. `RUST_BACKTRACE=1 node ./index.mjs`:

Then you can see the following error:

```
$ RUST_BACKTRACE=1 node ./index.mjs
thread '<unnamed>' panicked at 'assertion failed: prev.start > max', /Users/runner/.cargo/registry/src/index.crates.io-6f17d22bba15001f/wasmer-compiler-3.2.0/src/engine/trap/frame_info.rs:224:9
stack backtrace:
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.
/Users/await-ovo/Documents/test/reproduce-swc-plugins-crash-issue/node_modules/.pnpm/@swc+core@1.3.52/node_modules/@swc/core/index.js:241
            return bindings.transformSync(isModule ? JSON.stringify(src) : src, isModule, toBuffer(newOptions));
                            ^

Error: failed to handle: assertion failed: prev.start > max

Stack backtrace:
   0: _napi_register_module_v1
   1: _wasmer_vm_imported_memory32_atomic_notify
   2: <unknown>
   3: __ZN6v8impl12_GLOBAL__N_123FunctionCallbackWrapper6InvokeERKN2v820FunctionCallbackInfoINS2_5ValueEEE
   4: __ZN2v88internal25FunctionCallbackArguments4CallENS0_15CallHandlerInfoE
   5: __ZN2v88internal12_GLOBAL__N_119HandleApiCallHelperILb0EEENS0_11MaybeHandleINS0_6ObjectEEEPNS0_7IsolateENS0_6HandleINS0_10HeapObjectEEESA_NS8_INS0_20FunctionTemplateInfoEEENS8_IS4_EENS0_16BuiltinArgumentsE
   6: __ZN2v88internal21Builtin_HandleApiCallEiPmPNS0_7IsolateE
    at Compiler.transformSync (/Users/await-ovo/Documents/test/reproduce-swc-plugins-crash-issue/node_modules/.pnpm/@swc+core@1.3.52/node_modules/@swc/core/index.js:241:29)
    at transformSync (/Users/await-ovo/Documents/test/reproduce-swc-plugins-crash-issue/node_modules/.pnpm/@swc+core@1.3.52/node_modules/@swc/core/index.js:348:21)
    at file:///Users/await-ovo/Documents/test/reproduce-swc-plugins-crash-issue/index.mjs:5:16
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:385:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12) {
  code: 'GenericFailure'
}
```

3. Re-execute `node ./index.mjs`: you can see that transform is work as expected:

```
$ node ./index.mjs 
transform output: import A from "lodash/A";
console.log(A);
```

Delete the `.swc` directory, and then execute `node ./index.mjs`. The error in step 2 will appear again.


## Additional info

It looks like this error only occurs if you set up multiple plugins, if you comment out the `@swc/plugin-noop` in index.mjs, `node . /index.mjs` will work fine.