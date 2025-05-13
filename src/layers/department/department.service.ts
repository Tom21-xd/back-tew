// src/department/department.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoEntity } from './entity/department.entity';
import { fusekiClient } from '../utils/sparqlClient';  // Cliente SPARQL
import { DepartmentSparqlEntity } from './entity/department-sparql.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartamentoEntity)
    private readonly departmentRepository: Repository<DepartamentoEntity>,
  ) {}
 async getAllDepartmentsSparql(): Promise<DepartmentSparqlEntity[]> {
    const query = `
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX ns1: <http://www.semanticweb.org/danan/ontologies/2025/3/untitled-ontology-58#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>

      SELECT DISTINCT ?nombre ?id
                      ?codDane ?shapeArea ?shapeLen
      WHERE {
        ?departamento rdf:type ns1:departamento ;
                      ns1:idDepartamento ?id;
                      ns1:nameDepartamento ?nombre .
        OPTIONAL { ?departamento ns1:codDaneDepartamento ?codDane }
        OPTIONAL { ?departamento ns1:shapeAreaDepartamento ?shapeArea }
        OPTIONAL { ?departamento ns1:shapeLenDepartamento ?shapeLen }
      }
      ORDER BY ?nombre
    `;

    try {
      const result = await fusekiClient.query(query).execute();
      return result.results.bindings.map((item: any) => new DepartmentSparqlEntity(item));
    } catch (error) {
      console.error('Error al ejecutar la consulta SPARQL:', error);
      throw new Error('No se pudo obtener la lista de departamentos');
    }
  }
  
  async getAllDepartamentos(): Promise<DepartamentoEntity[]> {
    return this.departmentRepository.find({
      order: {
        nom_depart: 'ASC',
      },
    });
  }

  async getDepartamentoById(id: number): Promise<DepartamentoEntity | null> {
    return this.departmentRepository.findOneBy({ gid: id });
  }
}
