export class CountrySparqlEntity {
  name: string;
  area?: number;
  population?: number;
  continent?: string;
  region?: string;
  subregion?: string;
  abbreviation?: string;

  constructor(data: any) {
    this.name = data.nombre.value;
    this.area = data.area ? parseFloat(data.area.value) : undefined;
    this.population = data.poblacion ? parseInt(data.poblacion.value) : undefined;
    this.continent = data.continente?.value;
    this.region = data.region?.value;
    this.subregion = data.subregion?.value;
    this.abbreviation = data.abreviatura?.value;
  }
}
