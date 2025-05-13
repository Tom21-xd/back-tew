export class DepartmentSparqlEntity {
  id: string;
  name: string;
  codDane?: string;
  shapeArea?: number;
  shapeLen?: number;

  constructor(data: any) {
    this.id = data.id.value;
    this.name = data.nombre.value;
    this.codDane = data.codDane?.value;
    this.shapeArea = data.shapeArea ? parseFloat(data.shapeArea.value) : undefined;
    this.shapeLen = data.shapeLen ? parseFloat(data.shapeLen.value) : undefined;
  }
}
