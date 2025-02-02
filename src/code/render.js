function createDom(fiber){
   const dom =  fiber.type === "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type)

   Object.keys(fiber.props).forEach(key => {
        if(key !== 'children'){
            dom[key] = fiber.props[key]
        }
   })
   const children = fiber.props.children || []
   children.forEach(child => {
    render(child,dom)
   })
  return dom 
}
let network = null
//重写render函数
function render(el,container){
    network = {
        dom:container,
        props:{
            children:[el]
        },
        child:null
    }
}
function performUnitOfWork(fiber){
    if(fiber.dom === null){
        fiber.dom = createDom(fiber)
    }
    if(fiber.parent){
        fiber.parent.dom.append(fiber.dom)
    }

    let prevFiber = null
    const children = fiber.props.children
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
        }else {
            prevFiber.sibling = newFiber
        }
        prevFiber = newFiber
    })
    if(fiber.child) return fiber.child
    const nextFiber = fiber
    while(nextFiber){
        if(nextFiber.sibling) return nextFiber.sibling
        nextFiber = fiber.parent
    }
}


//任务调度器
function workLoop(deadline){
    const time = deadline.timeRemaining()
    let shouldRun = false
    while(!shouldRun && network){
        shouldRun = deadline.timeRemaining() < 1
        network = performUnitOfWork(network)
    }
    requestIdleCallback(workLoop)
}

//空闲时间调用执行
requestIdleCallback(workLoop)
export default render