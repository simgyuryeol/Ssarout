function createElem(tag, attrs, children) {
  const el = document.createElement(tag);
  if(tag==="button"){
    console.log('이건버튼')
    el.setAttribute("class","btn")
  }
  Object.keys(attrs).forEach(key => {
      if (key === 'class') {
          let classes = attrs[key];
          if (!Array.isArray(classes)) {
              classes = [classes];
          }
          el.classList.add(...classes);
      } else {
          el.setAttribute(key, attrs[key]);
      }
  });

  if (typeof children === 'string') {
      const textNode = document.createTextNode(children);
      el.appendChild(textNode);
  } else if (Array.isArray(children)) {
      children.forEach(ch => { el.appendChild(ch); });
  } else if (children !== undefined) {
      el.appendChild(children);
  }

  return el;
}

export default createElem