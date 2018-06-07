import {strictEqual} from "assert";


const ClassData = [
  {
    id: 1, name: "hello", subs: {
      "blond": "Blonde is the new black",
      "red": "Hell is a hot place",
      "blue": "The sky is falling"
    }
  },
  {
    id: 2, name: "santa be crazy", subs: {
      "react": "wrapper",
      "build": "runtime",
      "components": "abstracted"
    }
  },
  {
    id: 3, name: "grinch is coming", subs: {
      "react": "native",
      "build": "edit time",
      "components": "native"
    }
  }
];

let sym: symbol;
sym = Symbol();

/**
 * Interface for requesting data
 * @param name - the name of the data we want
 * @param id - the id of the data we want
 * @param query - the query string
 */
interface IDataFilter {
  name?: string;
  id?: number;
  query?: string;
}

interface IDataResponse {
  results: string
}

/**
 * This function gets some data from the API calls
 * @param {IDataFilter} filter
 * @returns {IDataResponse}
 */
export function getData(filter: IDataFilter = {name: "hello", id: 1, query: "blond"}): IDataResponse {

  let result = "";
  result += ClassData.map(function (dataItem) {
    if (dataItem.id === filter.id || dataItem.name === filter.name) {
      return dataItem.subs[filter.query] || dataItem.subs[Object.keys(dataItem.subs)[0]];
    }
  });
  return {results: result || "NA"};
}

/**
 * This gets data and applies the mutation function to it
 * @param {IDataFilter} filter
 * @param {Function} mutator
 * @returns {IDataResponse}
 */
function computeDataDiff(filter: IDataFilter = {
  name: "hello",
  id: 1,
  query: "blond"
}, mutator: Function): IDataResponse {
  const result = getData(filter);
  try {
    return mutator(result);
  } catch (exc) {
    return result;
  }
}

export const fooBar = "foobar";

export class foo {
  private fooBar: String = "foobar";

  constructor() {
  }

  fuckFoo() {
    this.fooBar = "fucked";
  }
}

export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

class  bar {
  constructor() {}
}

class FUZZ {
  b:bar;
  constructor() {
    this.b = new bar();
  }
}