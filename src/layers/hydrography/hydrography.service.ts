// src/hydrography/hydrography.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hydrography } from './entity/hydrography.entity';
import { fusekiClient } from '../utils/sparqlClient';  // Cliente SPARQL
import { HydrographySparqlEntity } from './entity/hydrography-sparql.entity';

@Injectable()
export class HydrographyService {
  constructor(
    @InjectRepository(Hydrography)
    private readonly hydrographyRepository: Repository<Hydrography>,
  ) {}

async getAllHydrographySparql(): Promise<HydrographySparqlEntity[]> {
    const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX ns1: <http://www.semanticweb.org/danan/ontologies/2025/3/untitled-ontology-58#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT DISTINCT ?nombre ?id ?cuenca
      WHERE {
        ?hidrografia rdf:type ns1:hidrografia ;
                     ns1:idHidrografia ?id;
                     ns1:nombreHidrografia ?nombre .

        OPTIONAL { ?hidrografia ns1:cuencaHidrografia ?cuenca }
      }
      ORDER BY ?nombre
    `;

    try {
      const result = await fusekiClient.query(query).execute();
      return result.results.bindings.map((item: any) => new HydrographySparqlEntity(item));
    } catch (error) {
      console.error('Error al ejecutar la consulta SPARQL:', error);
      throw new Error('No se pudo obtener la lista de hidrografía');
    }
  }
}
