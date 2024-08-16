// vendor object and its properties will be here.

export class Vendor {
  id: number | undefined;
  code = "";
  name = "";
  address = "";
  city = "";
  state = "";
  zip = "";
  phone: string | null = "";
  email: string | null = "";

  get isNew(): boolean {
    //acts as a property(if theres not an id then this vendor is new and it will add a new one. if not it will update.)
    return this.id === undefined; //if the id is undefined it will return true, if not it will be false
  } //used for the save component(in the form) (if (vendor.isNew) await vendorAPI.post(vendor) else do a put)

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.code) this.code = initializer.code;
    if (initializer.address) this.address = initializer.address;
    if (initializer.city) this.city = initializer.city;
    if (initializer.state) this.state = initializer.state;
    if (initializer.zipcode) this.zip = initializer.zipCode;
    if (initializer.phone) this.phone = initializer.phone;
    if (initializer.email) this.email = initializer.email;
  }
}
