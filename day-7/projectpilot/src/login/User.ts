export class Project {
  _id: string | undefined;
  username: string = '';
  email: string = '';
  password: string = '';
  get isNew(): boolean {
    return this._id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer._id) this._id = initializer._id;
    if (initializer.username) this.username = initializer.username;
    if (initializer.email) this.email = initializer.email;
    if (initializer.password) this.password = initializer.password;
  }
}