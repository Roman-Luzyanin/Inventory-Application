const password = '123';

// --------------------Add Category-------------------------------------

const addCategory = document.querySelector('.addCategory');
const addCategoryForm = document.getElementById('addCategoryForm');

addCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    addCategory.addEventListener('transitionend', () => {
        addCategoryForm.submit();
    }, { once: true });

    addCategory.classList.toggle('visible');
})

function addNewCategory() {
    const addCategoryBtn = document.querySelector('.addCategoryBtn');
    const categoryName = document.getElementById('categoryName');

    categoryName.value = '';
    addCategory.classList.toggle('visible');
    addCategoryBtn.classList.toggle('disabled');
    
    addCategoryBtn.disabled = 
        addCategoryBtn.disabled === true ? false : true;
}

// --------------------Add Sub Category--------------------------------------

const addSubCategory = document.querySelector('.addSubCategory');
const addSubCategoryForm = document.getElementById('addSubCategoryForm');

addSubCategoryForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    addSubCategory.addEventListener('transitionend', () => {
        addSubCategoryForm.submit();
    }, { once: true });

    addSubCategory.classList.toggle('visible');
})

function addNewSubCategory() {
    const subCategoryName = document.getElementById('subCategoryName');
    const subCategoryFile = document.getElementById('subCategoryFile');

    subCategoryName.value = '';
    subCategoryFile.value = '';
    addSubCategory.classList.toggle('visible');
}

// ---------------------Add Item--------------------------------------------

const addItem = document.querySelector('.addItem');
const addItemForm = document.getElementById('addItemForm');

addItemForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    addItem.addEventListener('transitionend', () => {
        addItemForm.submit();
    }, { once: true });

    addItem.classList.toggle('visible');
})

function addNewItem() {
    const itemName = document.getElementById('itemName');
    const description = document.getElementById('description');
    const isPromote = document.getElementById('isPromote');
    const itemFile = document.getElementById('itemFile');
    
    itemName.value = '';
    description.value = '';
    isPromote.checked = false;
    itemFile.value = '';
    addItem.classList.toggle('visible');
}

// -------------------Change Category--------------------------------------

const updateCategory = document.querySelector('.changeCategory');
const changeCategoryForm = document.getElementById('changeCategoryForm');
const catInput = document.querySelector('.catPassword input');

function catPasswordCheck(idx) {
    const catPassword = document.querySelector('.catPassword');
    const changeCategoryDetails = document.querySelector('.changeCategoryDetails');
    const changeCategoryBtns = document.querySelectorAll('.changeCategoryBtn'); 
    const btn = changeCategoryBtns[idx];

    if (btn) {
        changeCategoryDetails.setAttribute('data-id', btn.dataset.id);
        changeCategoryDetails.setAttribute('data-name', btn.dataset.name);
    }

    catInput.value = '';
    catInput.placeholder = '';
    catPassword.classList.toggle('show');
    catInput.focus();

    catInput.addEventListener('keydown', function x(e) {
        if (e.key === 'Enter') changeCategoryDetails.click();
    })
}

changeCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    updateCategory.addEventListener('transitionend', () => {
        changeCategoryForm.submit();
    }, { once: true });

    updateCategory.classList.toggle('visible');
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('changeCategoryDetails')) {
        const btn = e.target;
        if (catInput.value === password) {
            catPasswordCheck();
            changeCategory(btn.dataset.id, btn.dataset.name);
        } else {
            catInput.value = '';
            catInput.placeholder = 'Denied!!!'
        }
    }
});

function changeCategory(id, name) {
    const form = document.querySelector('.changeCategory form');
    const input = document.getElementById('updateCategoryName');
    const changeCategory = document.querySelector('.changeCategory');
    const addCategoryBtn = document.querySelector('.addCategoryBtn');
    
    form.action = `/update/category/${id}`;
    input.value = name;
    changeCategory.classList.toggle('visible');
    addCategoryBtn.classList.toggle('disabled');
    
    addCategoryBtn.disabled = 
        addCategoryBtn.disabled === true ? false : true;
}

// ------------------------------Change Sub Category-------------------------------

const updateSubCategory = document.querySelector('.changeSubCategory');
const changeSubCategoryForm = document.getElementById('changeSubCategoryForm');
const subCatInputs = document.querySelectorAll('.subCatPassword input');

function subCatPasswordCheck(idx, open) {
    const items = document.querySelectorAll('.subCatPassword');
    const subCatPassword = items[idx];
    const okBtns = document.querySelectorAll('.changeSubCategoryDetails');

    open && items.forEach(i => i.classList.remove('show'));
    subCatInputs[idx].value = '';
    subCatInputs[idx].placeholder = '';
    subCatPassword.classList.toggle('show');
    subCatInputs[idx].focus();

    subCatInputs[idx].addEventListener('keydown', function x(e) {
        if (e.key === 'Enter') okBtns[idx].click();
    })
}

changeSubCategoryForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    updateSubCategory.addEventListener('transitionend', () => {
        changeSubCategoryForm.submit();
    }, { once: true });

    updateSubCategory.classList.toggle('visible');
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('changeSubCategoryDetails')) {
        const btn = e.target;
        if (subCatInputs[btn.dataset.idx].value === password) {
            subCatPasswordCheck(btn.dataset.idx);   
            changeSubCategory(btn.dataset.id, btn.dataset.name, btn.dataset.parent, btn.dataset.url);
        } else {
            subCatInputs[btn.dataset.idx].value = '';
            subCatInputs[btn.dataset.idx].placeholder = 'Denied!!!'
        }
    }
});

function changeSubCategory(id, name, parent_id, url) {
    const form = document.querySelector('.changeSubCategory form');
    const newName = document.getElementById('subNameUpdate');
    const imgSrc = document.querySelector('.subPreviewSrc');
    const previewImg = document.querySelector('.previewImg');
    const changeSubCategoryFile = document.getElementById('changeSubCategoryFile');
    const parentId = document.getElementById('parent_id');
    const removeImg = document.querySelector('.removeImg');
    const changeSubCategory = document.querySelector('.changeSubCategory');

    form.action = `/update/subCategory/${id}`;
    newName.value = name;
    imgSrc.src = url ? url : '';
    previewImg.style.display = url ? 'block' : 'none';
    changeSubCategoryFile.value = '';
    parentId.value = parent_id;
    removeImg.value = url ? previewImg.style.display === 'block' ? '' : 'delete' : '';
    changeSubCategory.classList.toggle('visible');
}

// -----------------------------Change Item------------------------------------------------------------

const updateItem = document.querySelector('.changeItem');
const changeItemForm = document.getElementById('changeItemForm');
const itemInput = document.querySelector('.itemPassword input');

function itemPasswordCheck() {
    const itemPassword = document.querySelector('.itemPassword');
    const changeItemDetails = document.querySelector('.changeItemDetails');

    itemInput.value = '';
    itemInput.placeholder = '';
    itemPassword.classList.toggle('show');
    itemInput.focus();

    itemInput.addEventListener('keydown', function x (e) {
        if (e.key === 'Enter') changeItemDetails.click();
    })
}

changeItemForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    updateItem.addEventListener('transitionend', () => {
        changeItemForm.submit();
    }, { once: true });

    updateItem.classList.toggle('visible');
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('changeItemDetails')) {
        const btn = e.target;
        if (itemInput.value === password) {
            itemPasswordCheck();
            changeItem(btn.dataset.url, btn.dataset.name, btn.dataset.description, btn.dataset.promote);
        } else {
            itemInput.value = '';
            itemInput.placeholder = 'Denied!!!'
        }
    }
});

function changeItem(url, name, description, isPromote) {
        const itemNameUpdate = document.getElementById('itemNameUpdate');
        const descriptionUpdate = document.getElementById('descriptionUpdate');
        const isPromoteUpt = document.getElementById('isPromoteUpt');
        const previewImg = document.querySelector('.previewImg');
        const updateItemFile = document.getElementById('updateItemFile');
        const removeImg = document.querySelector('.removeImg');
        const changeItem = document.querySelector('.changeItem');

        itemNameUpdate.value = name;
        descriptionUpdate.value = description;
        isPromoteUpt.checked = isPromote;
        previewImg.style.display = url ? 'block' : 'none';
        updateItemFile.value = '';
        removeImg.value = url ? previewImg.style.display === 'block' ? '' : 'delete' : '';
        changeItem.classList.toggle('visible');
}

// ===================================================================================================================

function removeImg() {
    const removeImg = document.querySelector('.removeImg');
    const previewImg = document.querySelector('.previewImg');

    removeImg.value = 'delete';
    previewImg.style.display = 'none';
}



document.addEventListener('click', () => {
    const checkCat = document.querySelectorAll('.checkCat');
    checkCat.forEach(i => i.classList.remove('err'));
}, {once: true});



function deleteUrlQueryParam(paramName) {
  const currentUrl = new URL(window.location.href);

  currentUrl.searchParams.delete(paramName);
  
  window.history.replaceState(null, '', currentUrl.toString());
}

window.onload = function() {
  deleteUrlQueryParam('deleteCheck'); 
};