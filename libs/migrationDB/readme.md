### Truncate Data
node -r esm libs/migrationDB/Truncate.js

### Start Sync Data
### node -r esm libs/migrationDB/Sync.js --limit --skip --maxSkip
node -r esm libs/migrationDB/Sync.js 100 0 100
node -r esm libs/migrationDB/Sync.js 100 101 200
node -r esm libs/migrationDB/Sync.js 100 201 300
node -r esm libs/migrationDB/Sync.js 100 301 400
node -r esm libs/migrationDB/Sync.js 100 401 500
node -r esm libs/migrationDB/Sync.js 100 501