import { createElement } from "./code";
import render from "./code/render";
import render_re from "./code/render_re"
const node = createElement("h1",{
    className:"title",
    style:"background-color:red"

},
"hello",createElement("p",{
    className:"p",
    style:"background-color:blue;height:60px",
    
},"world"))

render(node,document.getElementById("root"))
