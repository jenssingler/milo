self.onmessage = async (e) => {
  const { createC2pa, createL2ManifestStore, generateVerifyUrl } = await import('../deps/c2pa/c2pa.esm.min.js');
  const c2pa = await createC2pa({
    wasmSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.24.0/dist/assets/wasm/toolkit_bg.wasm',
    workerSrc: 'https://cdn.jsdelivr.net/npm/c2pa@0.24.0/dist/c2pa.worker.min.js',
  });

  const imgSources = e.data;
  for (const [imgSource, result] of Object.entries(imgSources)) {
    const { manifestStore } = await c2pa.read(imgSource);
    if (manifestStore) {
      const {manifestStore: l2ManifestStore} = await createL2ManifestStore(
        manifestStore,
      );
      result.verifyUrl = generateVerifyUrl(imgSource);
      result.l2ManifestStore = l2ManifestStore;
    }
  }
  self.postMessage(imgSources);
}
