import { getIntrospectionQuery, graphqlSync, IntrospectionQuery } from 'graphql'
import Textile from './textitle'

import { fromIntrospectionQuery } from 'graphql-2-json-schema'
import { JSONSchema4 } from 'json-schema'
import { graphQlSchema } from '../graphql/schema-loader'

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
    const definition = definitions[key] as JSONSchema4
    await textile.newCollection({ name: key, schema: definition })
  }
}

const convertToTextileSchema = (schema: JSONSchema4) => {
  if (!schema.definitions) return

  for (const key of Object.keys(schema.definitions)) {
    const definition = schema.definitions[key]
  }
}

export const createDatabase = async (textile: Textile) => {
  const jsonSchema = createJsonSchemaFromGraphQl()
  convertToTextileSchema(jsonSchema)
  jsonSchema.definitions && (await createCollections(textile, jsonSchema.definitions))
}
