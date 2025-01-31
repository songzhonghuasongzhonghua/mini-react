import { createElement ,createTextNode} from "./createElement"
const node = createElement("h1",{
    class:"title",
    style:"background-color:red"
},
"hello",createElement("p",{
    class:"p",
    style:"background-color:blue"
}))
console.log(node);
export {
    createElement,
    createTextNode
    
}
