import { Injectable } from '@nestjs/common';
import { fusekiClient } from '../utils/sparqlClient';
import { AirportSparqlEntity } from './entity/airport-sparql.entity';
import { AeropuertoEntity } from './entity/airport.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class airportsService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
  ) { }

  async getAllAirportsSparql(): Promise<AirportSparqlEntity[]> {
    const query = `
      PREFIX : <http://www.semanticweb.org/danan/ontologies/2025/3/untitled-ontology-58#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT DISTINCT
        (STR(?id) as ?id_airport)
        ?nombre
        ?ubicacion
        ?tipo
        ?codigo_iata
        (STR(?lat) AS ?latitude)
        (STR(?lon) AS ?longitude)
      WHERE {
        ?aeropuerto rdf:type :aeropuerto ;
                    :idAeropuerto ?id;
                    :nameAeropuerto ?nombre ;
                    :locationAeropuerto ?ubicacion ;
                    :typeAeropuerto ?tipo ;
                    :iataCodeAeropuerto ?codigo_iata;
                    :latitudeAeropuerto ?lat;
                    :longitudeAeropuerto ?lon.
      }
      ORDER BY ?nombre
    `;

    try {
      const result = await fusekiClient.query(query).execute();
      return result.results.bindings.map((item: any) => new AirportSparqlEntity(item));
    } catch (error) {
      console.error('Error al ejecutar la consulta SPARQL:', error);
      throw new Error('No se pudo obtener la lista de aeropuertos');
    }
  }

  async getAllAeropuertos(): Promise<AeropuertoEntity[]> {
    return this.aeropuertoRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async getAeropuertoById(id: number): Promise<AeropuertoEntity | null> {
    return this.aeropuertoRepository.findOneBy({ id });
  }

  async getAllCitiesOnlyGeometries() {
    try {
      const citiesWithGeom = await this.aeropuertoRepository.find({
        order: {
          name: 'ASC',
        },
        select: ['geometry'],
      });

      if (!citiesWithGeom || citiesWithGeom.length === 0) {
        throw new Error('No se encontraron aeropuertos');
      }

      return citiesWithGeom;
    } catch (error) {
      console.error('Error al obtener aeropurtos', error);
      throw new Error('Error al obtener las geometrías de los aeropuertos');
    }
  }
}
