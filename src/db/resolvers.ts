
const fieldData = [
    {name: "Soccer Cage", address: "444 NW ST Miami FL, 33134"},
    {name: "Rooftop", address: "1239 NE ST Miami FL, 33137"}
]

const techData = [
    {name: "Golang"},
    {name: "Java"}
]

export const resolvers = {
    Query: {
        getFields: () => fieldData,
        getTech: () => techData
    }
}