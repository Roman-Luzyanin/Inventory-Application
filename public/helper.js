function addNewCategory() {
    const addCategory = document.querySelector('.addCategory');
    const categories = document.querySelector('.categories');
    const addCategoryBtn = document.querySelector('.addCategoryBtn');

    addCategory.style.display = 
        addCategory.style.display === 'none' ? 'block' : 'none';

    categories.style.display =
        categories.style.display === 'none' ? 'block' : 'none';

    addCategoryBtn.disabled = 
        addCategoryBtn.disabled === true ? false : true;

}

function addNewSubCategory() {
    const addSubCategory = document.querySelector('.addSubCategory');
    const subCategories = document.querySelector('.subCategories');

    addSubCategory.style.display = 
        addSubCategory.style.display === 'none' ? 'block' : 'none';

    subCategories.style.display =
        subCategories.style.display === 'none' ? 'flex' : 'none';

}

function addNewItem() {
    const addItem = document.querySelector('.addItem');
    const items = document.querySelector('.items');

    addItem.style.display = 
        addItem.style.display === 'none' ? 'block' : 'none';

    items.style.display =
        items.style.display === 'none' ? 'flex' : 'none';
}

function changeCategory(id, name) {
    const changeCategory = document.querySelector('.changeCategory');
    const categories = document.querySelector('.categories');
    const form = document.querySelector('.changeCategory form');
    const input = document.querySelector('.changeCategory form input');
    const addCategoryBtn = document.querySelector('.addCategoryBtn');
    
    addCategoryBtn.disabled = 
        addCategoryBtn.disabled === true ? false : true;

    form.action = `/update/category/${id}`;
    input.value = name;

    changeCategory.style.display = 
        changeCategory.style.display === 'none' ? 'block' : 'none';

    categories.style.display =
        categories.style.display === 'none' ? 'block' : 'none';
}

function changeSubCategory(id, name, parent_id) {
    const changeSubCategory = document.querySelector('.changeSubCategory');
    const subCategories = document.querySelector('.subCategories');
    const form = document.querySelector('.changeSubCategory form');
    const newName = document.querySelector('.changeSubCategory #update');
    const parentId = document.querySelector('.changeSubCategory #parent_id');

    form.action = `/update/subCategory/${id}`;
    newName.value = name;
    parentId.value = parent_id;   

    changeSubCategory.style.display = 
        changeSubCategory.style.display === 'none' ? 'block' : 'none';

    subCategories.style.display =
        subCategories.style.display === 'none' ? 'flex' : 'none';
}

function changeItem() {
        const itemDetails = document.querySelector('.itemDetails');
        const changeItem = document.querySelector('.changeItem');

        itemDetails.style.display = 
                itemDetails.style.display === 'none' ? 'block' : 'none';

        changeItem.style.display =
            changeItem.style.display === 'none' ? 'block' : 'none';
    }