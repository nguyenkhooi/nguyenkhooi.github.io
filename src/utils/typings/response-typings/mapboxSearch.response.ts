export type RESP_QueryResult = {
  bbox: [number, number, number, number]
  center: [number, number]
  context: [
    {
      id: string
      text: string
      wikidata: string
    },
    {
      id: string
      short_code: string
      text: string
      wikidata: string
    },
    {
      id: string
      short_code: string
      text: string
      wikidata: string
    },
  ]
  geometry: { coordinates: [number, number]; type: string }
  id: string
  place_name: string
  place_type: [string]
  properties: {}
  relevance: number
  text: string
  type: string
}

// const Example = {
//   address: "156",
//   center: [-72.310962, 40.90649],
//   context: [
//     { id: "postcode.3904924303812140", text: "11976" },
//     { id: "place.4588052563761620", text: "Water Mill", wikidata: "Q3460040" },
//     { id: "region.17349986251855570", short_code: "US-NY", text: "New York", wikidata: "Q1384" },
//     { id: "country.19678805456372290", short_code: "us", text: "United States", wikidata: "Q30" },
//   ],
//   geometry: { coordinates: [-72.310962, 40.90649], interpolated: true, type: "Point" },
//   id: "address.4031209594299894",
//   place_name: "156 Jobs Lane, Water Mill, New York 11976, United States",
//   place_type: ["address"],
//   properties: { accuracy: "interpolated" },
//   relevance: 1,
//   text: "Jobs Lane",
//   type: "Feature",
// }
