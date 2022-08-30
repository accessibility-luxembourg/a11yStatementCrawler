# a11yStatementCrawler

a11yStatementCrawler enables to crawl websites to detect if an accessibility statement is available based on heuristics. If an accessibility statement is found, it will try to extract the content of this accessibility statement in a structured way. This tool is compatible with the accessibility statements generated with [https://github.com/accessibility-luxembourg/a11yStatementGen](a11yStatementGen), which are mainly published in Luxembourg.


## Installation
```
git clone https://github.com/accessibility-luxembourg/a11yStatementCrawler.git
cd a11yStatementCrawler
npm install
chmod a+x *.sh
```

## Usage

### Analyse one website and get the results as JSON
```
node main.js https://website.to.be.checked
```

### Analyse multiple websites and get the results as CSV
put a list of websites (one url per line) in a file named `list-sites.txt`, then launch the following command. The result will be available in a file called `statements.csv`.
```
./crawl.sh
```

## Warning

As this tool is based on heuristics, it can fail to detect accessibility statements (false negatives) or detect pages which do not contain an accessibility statement (false positives). Even if the heuristics in this software could be improved, there is not exact way to detect the presence of an accessibility statement on a website. 
When this tool is able to detect the metadata from an accessibility statement (ex: conformance level, creation date, ...), the confidence level is pretty high. However, all declarations generated with [https://github.com/accessibility-luxembourg/a11yStatementGen](a11yStatementGen) before february 2021 did not have any metadata and the metadata which is included in the HTML code of an accessibility statement can also be cleaned by CMSes.

## Accessibility statements in Luxembourg
In Luxembourg, websites owners from the public sector have to inform the [information and press service](https://sip.gouvernement.lu) everytime they publish or update an accessibility statement. The [official list of published accessibility statements in Luxembourg](https://data.public.lu/fr/datasets/declarations-daccessibilite/) is available as open data. 

## License

This software is developed by the [Information and press service](https://sip.gouvernement.lu/en.html) of the luxembourgish government and licensed under the MIT license.