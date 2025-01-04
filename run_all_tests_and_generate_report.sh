#!/usr/bin/env bash
rm -rf cypress/reports && npx cypress run
npx mochawesome-merge cypress/reports/*.json -o cypress/reports/report.json
npx marge cypress/reports/report.json -f report -o cypress/reports
