export class HydrographySparqlEntity {
  id: string;
  name: string;
  basin?: string;

  constructor(data: any) {
    this.id = data.id.value;
    this.name = data.nombre.value;
    this.basin = data.cuenca?.value;
  }
}
