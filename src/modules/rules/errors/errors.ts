export class RuleNotFoundException extends Error {
  constructor() {
    super(`The rule was not found.`);
  }
}
