// src/country/country.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';
import { fusekiClient } from '../utils/sparqlClient';  // Cliente SPARQL
import { CountrySparqlEntity } from './entity/country-sparql.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,  // Inyectamos el repositorio de Country
  ) { }

  // Obtener todos los países desde la base de datos
  async getCountriesFromDatabase() {
    return this.countryRepository.find();  // Obtenemos todos los países
  }

  async getAllCountriesSparql(): Promise<CountrySparqlEntity[]> {
    const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX ns1: <http://www.semanticweb.org/danan/ontologies/2025/3/untitled-ontology-58#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT DISTINCT 
        ?nombre 
        ?area 
        ?poblacion
        ?continente
        ?region
        ?subregion
        ?abreviatura
      WHERE {
        ?pais rdf:type ns1:pais ;
              ns1:namePais ?nombre .
        OPTIONAL { ?pais ns1:areaPais ?area }
        OPTIONAL { ?pais ns1:populationPais ?poblacion }
        OPTIONAL { ?pais ns1:continentPais ?continente }
        OPTIONAL { ?pais ns1:regionPais ?region }
        OPTIONAL { ?pais ns1:subregionPais ?subregion }
        OPTIONAL { ?pais ns1:abbrevPais ?abreviatura }
      }
      ORDER BY ?nombre
    `;

    try {
      const result = await fusekiClient.query(query).execute();
      return result.results.bindings.map((item: any) => new CountrySparqlEntity(item));
    } catch (error) {
      console.error('Error al ejecutar la consulta SPARQL:', error);
      throw new Error('No se pudo obtener la lista de países');
    }
  }


  async getAllHydrography(): Promise<Country[]> {
    return this.countryRepository.find({
      select: ['geom','name'],
      order: {
        name: 'ASC',
      },
    });
  }
}
