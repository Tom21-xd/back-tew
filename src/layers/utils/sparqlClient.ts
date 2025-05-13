import { SparqlClient } from 'sparql-client-2';

const endpoint = 'http://localhost:3030/aeropuerto/sparql';

export const fusekiClient = new SparqlClient(endpoint, {
    updateEndpoint: 'http://localhost:3030/aeropuerto/update', 
}).register({
    '': 'http://www.semanticweb.org/danan/ontologies/2025/3/untitled-ontology-58#', // Prefijo por defecto
    rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',              // Prefijo RDF
    xsd: 'http://www.w3.org/2001/XMLSchema#',                       // Prefijo XSD
    owl: 'http://www.w3.org/2002/07/owl#',                         // Prefijo OWL
    rdfs: 'http://www.w3.org/2000/01/rdf-schema#'                  // Prefijo RDFS
});
