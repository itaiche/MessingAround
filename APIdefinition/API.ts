const ClassData = [
  { id: 1, name: "hello", subs : {
    "blond" : "Blonde is the new black",
    "red" : "Hell is a hot place",
    "blue" : "The sky is falling"
  }},
  { id: 2, name: "santa be crazy", subs : {
    "react" : "wrapper",
    "build" : "runtime",
    "components" : "abstracted"
  }},
  { id: 3, name: "grinch is coming", subs : {
    "react" : "native",
    "build" : "edit time",
    "components" : "native"
  }}
];

interface IDataFilter {
  name?: string;
  id?: number;
  query?: string;
}

interface IDataResponse {
  results: string
}

function getData(filter: IDataFilter = {name: "hello", id: 1, query: "blond"}): IDataResponse {
  let result = "";
  result += ClassData.map(function (dataItem) {
    if (dataItem.id === filter.id || dataItem.name === filter.name) {
      return dataItem.subs[filter.query] || dataItem.subs[Object.keys(dataItem.subs)[0]];
    }
  });
  return {results: result || "NA"};
}

function computeDataDiff(filter: IDataFilter = { name: "hello", id: 1, query: "blond"  }, mutator: Function ) : IDataResponse{
  const result = getData(filter);
  try {
    return mutator(result);
  }catch (exc){
    return result;
  }
}

export  {
  IDataResponse,
  IDataFilter,
  getData,
  computeDataDiff
}