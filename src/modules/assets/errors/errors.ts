export class AssetNotFoundException extends Error {
  constructor() {
    super(`The asset was not found.`);
  }
}
