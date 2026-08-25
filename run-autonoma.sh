#!/bin/bash

# You must replace the placeholders below with your REAL tokens.
# Alternatively, provide them as environment variables.
# Do NOT use the bullet characters (•), as they will cause a ByteString error in the HTTP headers.

export AUTONOMA_API_URL="${AUTONOMA_API_URL:-https://api.autonoma.app}"
export AUTONOMA_SHARED_SECRET="${AUTONOMA_SHARED_SECRET:-<REPLACE_ME_WITH_REAL_SHARED_SECRET>}"
export AUTONOMA_DISTINCT_ID="${AUTONOMA_DISTINCT_ID:-<REPLACE_ME_WITH_REAL_DISTINCT_ID>}"
export AUTONOMA_API_TOKEN="${AUTONOMA_API_TOKEN:-<REPLACE_ME_WITH_REAL_API_TOKEN>}"
export AUTONOMA_GENERATION_ID="${AUTONOMA_GENERATION_ID:-<REPLACE_ME_WITH_REAL_GENERATION_ID>}"
export AUTONOMA_APPLICATION_ID="${AUTONOMA_APPLICATION_ID:-<REPLACE_ME_WITH_REAL_APPLICATION_ID>}"

# We use --resume so it picks up where it left off, and --project . to target this repository.
npx "@autonoma-ai/planner@latest" --resume --project .
