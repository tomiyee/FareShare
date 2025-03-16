#!/bin/bash
curl http://localhost:3000/api-docs/openapi.json -o backend/openapi.json
npx openapi-typescript backend/openapi.json --output frontend/api/types.ts