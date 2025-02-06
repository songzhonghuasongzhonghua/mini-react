function createDom(el){
    const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode("") : document.createElement(el.type)

    Object.keys(el.props).forEach(key => {
        if(key !== 'children'){
            dom[key]=el.props[key]
        }
    })
    // el.props.children.forEach(child => {
    //     render(child,dom)
    // })
    return dom
    // container.appendChild(dom)
}

let nextwork = null
let root = null
function render(el,container){
    nextwork = {
        dom:container,
        props:{
            children:[el]
        },
    }
    root = nextwork
}
function fiber(fiber){
    if(!fiber.dom){
        fiber.dom = createDom(fiber)
    }
    // if(fiber.parent){
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }
    
    let prevFiber = null
    const children = fiber.props.children || []
    children.forEach((child,index) => {
        const newFiber = {
            dom:null,
            type:child.type,
            props:child.props,
            parent:fiber,
            child:null,
            sibling:null
        }
        if(index === 0){
            fiber.child = newFiber
        }else{
            prevFiber.sibling = newFiber
        }
        prevFiber = newFiber 
    })
    if(fiber.child) {
        return fiber.child
    }
    // if(fiber.sibling){
    //     return fiber.sibling
    // }
    // return fiber.parent
    // let f = fiber
    // while(f){
    //     if(f.sibling) return f.sibling
    //     f = fiber.parent        
    // }
    if(fiber.sibling){
        return fiber.sibling
    }
    if(fiber.parent && fiber.parent.sibling){
        return fiber.parent.sibling
    }
}

function commitRoot(){
    commitWork(root.child)
    root = null
}
function commitWork(fiber){
    if(fiber == null){
        return
    }
    
    let parentFiber = fiber.parent
    while(!parentFiber.dom){
        parentFiber = parentFiber.parent
    }
    const parentDom = parentFiber.dom
    parentDom.appendChild(fiber.dom)

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function workLoop(deadline){
    let shouldRun = false
    while(!shouldRun && nextwork){
        shouldRun = deadline.timeRemaining() < 1
        nextwork = fiber(nextwork)
    }
    if(!nextwork && root){
        console.log(root);
        
        commitRoot()
    }
    requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

export default render