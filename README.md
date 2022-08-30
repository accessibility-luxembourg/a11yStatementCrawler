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

## License

This software is developed by the [Information and press service](https://sip.gouvernement.lu/en.html) of the luxembourgish government and licensed under the MIT license.