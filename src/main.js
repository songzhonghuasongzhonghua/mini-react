import { createElement } from "./code";
import render from "./code/render";
const node = createElement("h1",{
    class:"title",
    style:"background-color:red"

},
"hello",createElement("p",{
    class:"p",
    style:"background-color:blue"
}))

render(node,document.getElementById("root"))
