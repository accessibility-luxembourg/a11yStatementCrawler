#!/bin/bash
echo "Website;Statement URL;Organization;URLs;Conformance level;Creation Date;Renewal Date;e-mail" > statements.csv
cat list-sites.txt| while read i; do node main.js $i --csv; done >> statements.csv