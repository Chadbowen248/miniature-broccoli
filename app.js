


const getCatergories = arr => object => object[arr];

const buildDropDownMarkUp = arr => arr.map((item, index) =>  `<li class='list-item'>
                                                                <input type='checkbox'
                                                                    id='${item}-${index}'
                                                                    value='${item}'
                                                                    class='list-style list-checked' checked>
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

// const getVTMdata = fetch('https://services.share.aarp.org/applications/CoreServices/WSOWebService/vtmresource/jobdata')
//                 .then(res => res.json())
//                 .then(res => (res.data))
//                 .then(res => populateDropDowns(res))
const getVTMdata = fetch('programdata.json')
                .then(res => res.json())
                .then(res => populateDropDowns(res))

const addRemoveClass = (options) => e => {
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

const closeDropdownOutsideClick = (id, dropdown) => e => {
    if(e.target.closest(id)) {
        return
    }
    document.getElementById(dropdown).classList.remove('show');
}
const closeDropDownPrograms = closeDropdownOutsideClick('#programs11','programs');
const closeDropDownInterests = closeDropdownOutsideClick('#interests11','categories');

const getCheckedValues = nodelist => {
    const arr = [];
    nodelist.forEach(item => {
        arr.push(encodeURIComponent(item.value));
    })
    return arr
}

const getInputValue = input => input.value

const postSearchData = e => {
    e.preventDefault();
    const interestArr = getCheckedValues(document.querySelectorAll('#categories input[type=checkbox]:checked'));
    const programsArr = getCheckedValues(document.querySelectorAll('#programs input[type=checkbox]:checked'));
    const zipcode = getInputValue(document.getElementById('postalCode'));
    const distance = getInputValue(document.getElementById('zipcode'));
    console.log(interestArr, programsArr, zipcode, distance)
}

addListeners({type: 'click', selector: '.dropdowns', fn: toggleDropdowns});

addListeners({type: 'click', selector: 'body', fn: closeDropDownPrograms});

addListeners({type: 'click', selector: 'body', fn: closeDropDownInterests});

addListeners({type: 'click', selector: '#test', fn: postSearchData});
