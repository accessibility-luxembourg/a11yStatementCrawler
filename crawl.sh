#!/bin/bash
echo "Website;Statement URL;Organization;URLs;Conformance level;Creation Date;Renewal Date;e-mail" > statements.csv
cat list-sites.txt| while read i; do echo "$i"; node main.js "$i" --csv >> statements.csv; done