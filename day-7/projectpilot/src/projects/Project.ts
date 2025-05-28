export class Project {
  _id: string | undefined;
  name: string = '';
  description: string = '';
  imageUrl: string = '';
  contractTypeId: number | undefined;
  contractSignedOn: Date = new Date();
  budget: number = 0;
  isActive: boolean = false;
  get isNew(): boolean {
    return this._id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer._id) this._id = initializer._id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.description = initializer.description;
    if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
    if (initializer.contractTypeId)
      this.contractTypeId = initializer.contractTypeId;
    if (initializer.contractSignedOn)
      this.contractSignedOn = new Date(initializer.contractSignedOn);
    if (initializer.budget) this.budget = initializer.budget;
    if (initializer.isActive) this.isActive = initializer.isActive;
  }
}