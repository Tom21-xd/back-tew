export class AirportSparqlEntity {
  id: string;
  name: string;
  location: string;
  type: string;
  iataCode: string;
  latitude: number;
  longitude: number;

  constructor(data: any) {
    this.id = data.id_airport.value;
    this.name = data.nombre.value;
    this.location = data.ubicacion.value;
    this.type = data.tipo.value;
    this.iataCode = data.codigo_iata.value;
    this.latitude = parseFloat(data.latitude.value);
    this.longitude = parseFloat(data.longitude.value);
  }
}
