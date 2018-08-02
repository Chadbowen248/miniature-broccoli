
const getCatergories = arr => object => object[arr];

const buildDropDownMarkUp = arr => arr.map((item, index) =>  `<li class='list-item'>
                                                                <input type='checkbox'
                                                                    id='${item}-${index}'
                                                                    value='${item}'
                                                                    class='list-style'>
                                                                <label for='${item}-${index}'>${item}</label>
                                                              </li>`).join('');

const buildResultsMarkUp = arr => arr.map((item, index) => `<li>${item}-${index}</li>`).join('');

const appendToParent = node => html => document.getElementById(node).innerHTML = html;

const inspect = a => {
    console.log(a)
    return a
  }

const pipe = (...fns) => start => fns.reduce((x,y) => y(x), start);

const renderMarkup = category => pipe(getCatergories(category), buildDropDownMarkUp, appendToParent(category));

const populateDropDowns = (res) => {
    renderMarkup('categories')(res);
    renderMarkup('programs')(res);
}

const getVTMdata = fetch('programdata.json')
                .then(res => res.json())
                .then(res => populateDropDowns(res))

const addRemoveClass = (options) => e => {
    // e.stopPropagation();
    const {className, applyToSibling} = options
    const ele = applyToSibling ? e.target.nextElementSibling : e.target
    ele.classList.toggle(className)  
}

const toggleDropdowns = addRemoveClass({className:'show', applyToSibling: true})

const addListeners = (options) => {
    const {type, selector, fn} = options
    const eles = document.querySelectorAll(selector);
    eles.forEach(item => {
        item.addEventListener(type, fn)
    })
}

addListeners({type: 'click',
            selector: '.dropdowns',
            fn: toggleDropdowns});

const checkTargetAgainstList = (target, nodes) => {
    const arr = [].slice.call(document.querySelectorAll(nodes));
    // console.log(arr)
    const test = arr.includes(target)
    console.log(test)
    return test
}



document.addEventListener('click', e => {
    if (e.target.closest("#interests11")){
        console.log('stay open');
        return
    }
    document.querySelectorAll('.dropdown-content')[0].classList.remove('show')
})

document.addEventListener('click', e => {
    if (e.target.closest("#programs11")){
        console.log('stay open');
        return
    }
    document.querySelectorAll('.dropdown-content')[1].classList.remove('show')
})



// var box = document.querySelector(".box");

// // Detect all clicks on the document
// document.addEventListener("click", function(event) {

// // If user clicks inside the element, do nothing
// if (event.target.closest(".box")) return;

// // If user clicks outside the element, hide it!
//     box.classList.add("js-is-hidden");
// });


// document.body.addEventListener('click', e => {
//     checkTargetAgainstList(e.target, '.dropdowns, .dropdown-content, .list-item')
// })
