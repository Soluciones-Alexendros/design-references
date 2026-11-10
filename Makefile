.PHONY: install validate test build dev acceptance

install:
	npm install

validate:
	npm run validate:tokens

test:
	npm test

build:
	npm run build -w @soluciones-alexendros/ds
	npm run build -w @soluciones-alexendros/ds-docs

dev:
	npm run dev -w @soluciones-alexendros/ds-docs

acceptance:
	node scripts/acceptance-stubs.mjs
