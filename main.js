// Usage: node main.js url [--csv]
// by default this script generates a json output. If the flag --csv is given at the end of the command line, the output will be in csv.

const puppeteer = require('puppeteer');

let site = process.argv[2].trim();
if (!site.includes('http')) {
  site = 'http://'+site
}

const toCSV = process.argv[3] == '--csv';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(site);
  try {
  await page.waitForNetworkIdle();
  } catch (e) {}
  let urls = await page.evaluate(() => {
    const keyword = {
        'fr': 'accessibilité', 
        'en': 'accessibility', 
        'de': 'barrierefreiheit', 
        'lb': 'accessibilitéit',
        'lu': 'accessibilitéit'
    }    
    let lang = document.querySelector('html').getAttribute('lang');
    if (lang === null || lang == "") {
        lang = 'fr'
    }
    lang = lang.substring(0,2)
    const res = document.evaluate( "//a[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '"+keyword[lang]+"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null )
    const result = []
    for ( var i=0 ; i < res.snapshotLength; i++ ){
        result.push(res.snapshotItem(i).href);
    }
    return result;
  });

  // remove duplicates
  urls = [...new Set(urls)]

  const payloads = {}
  for (let i=0; i< urls.length; i++) {
    await page.goto(urls[i])
    let payload = await page.evaluate(() => {
        const orga = document.querySelector('.basic-information.organization-name')?document.querySelector('.basic-information.organization-name').innerText.trim().replace(/^["“”]|["“”]$/g, '').trim():''
        const website = Array.from(document.querySelectorAll('.basic-information.website-name')).map(e => {return e.innerText})
        const conformance = Array.from(document.querySelector('.basic-information.conformance-status')?document.querySelector('.basic-information.conformance-status').classList:[]).filter(e => { if (['total', 'partial', 'none'].includes(e)) return e})[0]
        const creationDate = document.querySelector('.basic-information.statement-created-date')?document.querySelector('.basic-information.statement-created-date').innerText:''
        const renewalDate = document.querySelector('.basic-information.statement-renewal-date')?document.querySelector('.basic-information.statement-renewal-date').innerText:''
        const email = document.querySelector('.basic-information.feedback.h-card .email')?document.querySelector('.basic-information.feedback.h-card .email').href.replace('mailto:', ''):''
        const nonCompliant = Array.from(document.querySelectorAll('.technical-information.non-compliant')).map(e => {return e.innerText})
        const disproportionateBurden = Array.from(document.querySelectorAll('.technical-information.disproportionate-burden')).map(e => {return e.innerText})
        const exception = Array.from(document.querySelectorAll('.technical-information.exception')).map(e => {return e.innerText})
        const result = (orga === '' || website === '')?{}:{'organization': orga, 'conformance': conformance, 'urls': website, 'creationDate': creationDate, 'renewalDate': renewalDate, 'email': email, 'limitations': {'nonCompliant': nonCompliant, 'disproportionateBurden': disproportionateBurden, 'exception': exception}}
        return result;
    })
    if (payload !== {}) {
        payloads[urls[i]]=payload
    }
  }

  const result = {}
  result[site] = payloads

  function csvfield(e) {
    return (e === undefined)?'':e
  }
  if (toCSV) {
    Object.keys(result).forEach(site => {
        if (Object.keys(result[site]).length == 0) {
            console.log(site+';;;;;;;')
        } else {
            Object.keys(result[site]).forEach(url => {
                let e = result[site][url]
                console.log(site+';'+url+';'+csvfield(e['organization'])+';'+csvfield(e['urls'])+';'+csvfield(e['conformance'])+';'+csvfield(e['creationDate'])+';'+csvfield(e['renewalDate'])+';'+csvfield(e['email'])) 
            });
        }
    });
  } else {
    console.log(JSON.stringify(result, null, 4));
  }

  await browser.close();
})();