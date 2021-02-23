import { schema } from './../graphql/schema-loader'
import { getIntrospectionQuery, graphqlSync, IntrospectionQuery } from 'graphql'
import Textile from './textitle'

import { fromIntrospectionQuery } from 'graphql-2-json-schema'
import { JSONSchema4 } from 'json-schema'
import { graphQlSchema } from '../graphql/schema-loader'
import { camelCase, forOwn, unset } from 'lodash'
import { type } from 'os'

const createJsonSchemaFromGraphQl = () => {
  const result = graphqlSync(graphQlSchema, getIntrospectionQuery())
  const introspection = result.data as IntrospectionQuery
  const jsonSchema = fromIntrospectionQuery(introspection, {
    ignoreInternals: true
  })
  return jsonSchema
}

const createCollections = async (
  textile: Textile,
  definitions: {
    [k: string]: JSONSchema4
  }
) => {
  for (let key of Object.keys(definitions)) {
    if (key === 'Subscription') continue // Remove hack
    const entity = definitions[key] as JSONSchema4
    await textile.newCollection({ name: key, schema: entity })
  }
}

const convertToTextileSchema = (schema: JSONSchema4) => {
  if (!schema.definitions) return
  delete schema.definitions.Subscription

  for (const key of Object.keys(schema.definitions)) {
    const entity = schema.definitions[key]
    updateProperties(entity)
  }
}

const updateProperties = (entity: JSONSchema4) => {
  if (!entity.properties) return
  for (const propName of Object.keys(entity.properties)) {
    const prop = entity.properties[propName]
    isOneToOneRelation(prop) && convertOneToOneRelation(propName, entity.properties)
    isOneToOneRelation(prop) && console.log('ENTITY', entity)
  }
}

const isOneToOneRelation = (prop: JSONSchema4): boolean =>
  prop.type === 'object' &&
  prop.properties &&
  prop.properties.return &&
  prop.properties.return.$ref &&
  !prop.properties.return.type
    ? true
    : false

const convertOneToOneRelation = (propName: string, properties: JSONSchema4) => {
  delete properties[propName]
  properties[camelCase(`${propName}Id`)] = { type: 'string' }
}

export const createDatabase = async (textile: Textile) => {
  const jsonSchema = createJsonSchemaFromGraphQl()
  convertToTextileSchema(jsonSchema)
  jsonSchema.definitions && (await createCollections(textile, jsonSchema.definitions))
}
