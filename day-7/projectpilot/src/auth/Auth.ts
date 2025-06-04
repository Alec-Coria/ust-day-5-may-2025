export class Auth {
  _id: string | undefined;
  name: string = '';
  accessToken: string = '';
  refreshToken: string = '';
  get isNew(): boolean {
    return this._id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer._id) this._id = initializer._id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.accessToken) this.accessToken = initializer.accessToken;
    if (initializer.refreshToken) this.refreshToken = initializer.refreshToken;
  }
}