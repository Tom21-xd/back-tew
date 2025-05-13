// src/city/city.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiudadEntity } from './entity/city.entity';
import { fusekiClient } from '../utils/sparqlClient';  // Cliente SPARQL
import { CitySparqlEntity } from './entity/city-sparql.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CiudadEntity)
    private readonly cityRepository: Repository<CiudadEntity>,
  ) { }

  async getCitiesFromDatabase() {
    return this.cityRepository.find();
  }

  async getAllCitiesOnlyGeometries() {
    try {
      const citiesWithGeom = await this.cityRepository.find({
        order: {
          ciudad: 'ASC',
        },
        select: ['geom'],
      });

      if (!citiesWithGeom || citiesWithGeom.length === 0) {
        throw new Error('No se encontraron ciudades con geometría en la base de datos');
      }

      return citiesWithGeom;
    } catch (error) {
      console.error('Error al obtener geometrías de ciudades:', error);
      throw new Error('Error al obtener las geometrías de las ciudades');
    }
  }

  async getAllCitiesSparql(): Promise<CitySparqlEntity[]> {
    const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX ns1: <http://www.semanticweb.org/danan/ontologies/2025/3/untitled-ontology-58#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT DISTINCT ?nombre 
                      ?id
                      ?capital 
                      ?pais
      WHERE {
        ?ciudad rdf:type ns1:ciudad ;
                ns1:idCiudad ?id;
                ns1:capitalCiudad ?capital; 
                ns1:paisCiudad ?pais;
                ns1:nameCiudad ?nombre .
      }
      ORDER BY ?nombre
    `;

    try {
      const result = await fusekiClient.query(query).execute();
      return result.results.bindings.map((item: any) => new CitySparqlEntity(item));
    } catch (error) {
      console.error('Error al ejecutar la consulta SPARQL:', error);
      throw new Error('No se pudo obtener la lista de ciudades');
    }
  }

}
