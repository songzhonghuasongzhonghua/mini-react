function render(element,container){
    if (!(container instanceof HTMLElement)) {
        throw new Error("Container is not a valid DOM element");
    }
    console.log(container, 'container---------')
   const dom =  element.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type)

   Object.keys(element.props).forEach(key => {
        if(key !== 'children'){
            dom[key] = element.props[key]
        }
   })
   const children = element.props.children || []
   children.forEach(child => {
    render(child,dom)
   })
container.appendChild(dom)
   
}
export default render