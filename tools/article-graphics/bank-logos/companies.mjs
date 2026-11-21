// 45 banks for /blog/bank-logos (Nov 2026 refresh), five boards of nine.
export const boards = [
  { name: "Big US banks", companies: [
    ["Chase","https://www.chase.com/"],["Bank of America","https://www.bankofamerica.com/"],["Wells Fargo","https://www.wellsfargo.com/"],
    ["Citi","https://www.citi.com/"],["U.S. Bank","https://www.usbank.com/"],["PNC","https://www.pnc.com/"],
    ["Truist","https://www.truist.com/"],["Capital One","https://www.capitalone.com/"],["TD Bank","https://www.td.com/us/en/personal-banking"] ] },
  { name: "European banks", companies: [
    ["HSBC","https://www.hsbc.com/"],["Barclays","https://home.barclays/"],["Lloyds Bank","https://www.lloydsbank.com/"],
    ["Santander","https://www.santander.com/"],["BBVA","https://www.bbva.com/"],["BNP Paribas","https://group.bnpparibas/en/"],
    ["Deutsche Bank","https://www.db.com/"],["ING","https://www.ing.com/"],["UBS","https://www.ubs.com/"] ] },
  { name: "Banks around the world", companies: [
    ["RBC","https://www.rbc.com/"],["Scotiabank","https://www.scotiabank.com/"],["Commonwealth Bank","https://www.commbank.com.au/"],
    ["DBS","https://www.dbs.com/"],["MUFG","https://www.mufg.jp/english/"],["Itaú","https://www.itau.com.br/"],
    ["Standard Chartered","https://www.sc.com/"],["Société Générale","https://www.societegenerale.com/en"],["Raiffeisen","https://www.rbinternational.com/"] ] },
  { name: "Investment banks and wealth managers", companies: [
    ["Goldman Sachs","https://www.goldmansachs.com/"],["Morgan Stanley","https://www.morganstanley.com/"],["J.P. Morgan","https://www.jpmorgan.com/"],
    ["Charles Schwab","https://www.schwab.com/"],["Lazard","https://www.lazard.com/"],["Rothschild & Co","https://www.rothschildandco.com/"],
    ["Fidelity","https://www.fidelity.com/"],["BNY","https://www.bny.com/"],["State Street","https://www.statestreet.com/"] ] },
  { name: "Digital banks and neobanks", companies: [
    ["Chime","https://www.chime.com/"],["Revolut","https://www.revolut.com/"],["Monzo","https://monzo.com/"],
    ["Nubank","https://international.nubank.com.br/"],["SoFi","https://www.sofi.com/"],["N26","https://n26.com/en-us"],
    ["Starling Bank","https://www.starlingbank.com/"],["Ally","https://www.ally.com/"],["Mercury","https://mercury.com/"] ] },
];
export const slug = (name) => name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/&/g,"and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
