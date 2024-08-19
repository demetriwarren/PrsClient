
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
    if(initializer.name) this.price = initializer.price;
    if(initializer.name) this.unit = initializer.unit;
    if(initializer.name) this.photopath = initializer.photopath;

}
}