#!/bin/bash

# You must replace the placeholders below with your REAL tokens.
# Do NOT use the bullet characters (•), as they will cause a ByteString error in the HTTP headers.

export AUTONOMA_API_URL="https://api.autonoma.app"
export AUTONOMA_SHARED_SECRET="<REPLACE_ME_WITH_REAL_SHARED_SECRET>"
export AUTONOMA_DISTINCT_ID="cmsviechy00zk01bpty51lvte"
export AUTONOMA_API_TOKEN="<REPLACE_ME_WITH_REAL_API_TOKEN>"
export AUTONOMA_GENERATION_ID="cmsvntn5a015b01bpa3vgge45"
export AUTONOMA_APPLICATION_ID="cmsvntmjl015601bpu6t8s87b"

# We use --resume so it picks up where it left off, and --project . to target this repository.
npx "@autonoma-ai/planner@latest" --resume --project .
