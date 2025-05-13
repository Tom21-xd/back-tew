export class CitySparqlEntity {
  id: string;
  name: string;
  capital: boolean;
  country: string;

  constructor(data: any) {
    this.id = data.id.value;
    this.name = data.nombre.value;
    this.capital = data.capital.value === 'true';
    this.country = data.pais.value;
  }
}
