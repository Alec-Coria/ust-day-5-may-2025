export class Auth {
  _id: string | undefined;
  name: string = '';
  email: string = '';
  password: string = '';
  get isNew(): boolean {
    return this._id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer._id) this._id = initializer._id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.password) this.password = initializer.password;
  }
}