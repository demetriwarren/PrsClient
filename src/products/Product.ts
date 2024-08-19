
export class Product {
    id: number | undefined;
    name = "";
    price = 0;
    unit = "";
    photopath: string | null = "";
    vendorId: number | null = 0;


get isNew(): boolean {
    return this.id === undefined;       
}       

constructor(initializer?: any){
    if(!initializer) return;
    if(initializer.id) this.id = initializer.id;
    if(initializer.name) this.name = initializer.name;
    if(initializer.price) this.price = initializer.price;
    if(initializer.unit) this.unit = initializer.unit;
    if(initializer.photopath) this.photopath = initializer.photopath;

}
}