
const getCatergories = arr => object => object[arr];
const dropdownMarkup = (item, index) => `<li class='list-item'>
                                            <input type='checkbox'
                                                id='${item}-${index}'
                                                value='${item}'
                                                class='list-style'>
                                            <label for='${item}-${index}'>${item}</label>
                                        </li>`


const buildMarkUp = arr => arr.map((item, index) => dropdownMarkup(item, index)).join('');


// const buildMarkUp = arr => {
//   return arr.map((item, index) => `<li class='list-item'>
//                                     <input type='checkbox'
//                                         id='${item}-${index}'
//                                         value='${item}'
//                                         class='list-style'>
//                                     <label for='${item}-${index}'>${item}</label>
//                               </li>`).join('');
//                             }

const appendToParent = node => html => {
    const ele = document.getElementById(node);
    ele.innerHTML = html
}

const inspect = a => {
    console.log(a)
    return a
  }

const pipe = (...fns) => start => fns.reduce((x,y) => y(x), start);
const renderMarkup = category => pipe(getCatergories(category), buildMarkUp, appendToParent(category), inspect);
const populateDropDowns = (res) => {
    renderMarkup('categories')(res);
    renderMarkup('programs')(res);
}

const getVTMdata = fetch('programdata.json')
                .then(res => res.json())
                .then(res => populateDropDowns(res))

const addRemoveClass = (options) => e => {
    const {className, applyToSibling} = options
    const el = e.target;
    const sibling = el.nextElementSibling;
    const ele = applyToSibling ? sibling : target
    ele.classList.toggle(className)  
}

const toggleDropdowns = addRemoveClass({className:'show', applyToSibling: true})

const addListeners = (options) => {
    const {type, className, fn} = options
    const eles = [].slice.call(document.querySelectorAll(className));
    eles.forEach(item => {
        item.addEventListener(type, fn)
    })
}

addListeners({type: 'click',
            className: '.dropdowns',
            fn: toggleDropdowns});

document.body.addEventListener('click', e => console.log(e.target))
