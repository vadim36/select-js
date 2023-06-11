document.querySelectorAll('[data-select]').forEach(select => {
   const selectDropdownList = select.querySelector('[data-dropdown-list]');
   const selectDropdownButton = select.querySelector('[data-dropdown-button]');
   const selectValueInput = select.querySelector('[data-value-item]');

   const showSelect = () => {
      selectDropdownList.classList.toggle('hidden');
      selectDropdownButton.classList.add('select-custom__dropdown-button--active');
   }

   const closeSelect = () => {
      selectDropdownList.classList.add('hidden');
      selectDropdownButton.classList.remove('select-custom__dropdown-button--active');
   }

   selectDropdownButton.addEventListener('click', () => showSelect());

   selectDropdownButton.addEventListener('keydown', event => {
      if (event.key === 'KeyEnter') showSelect();
   });

   selectDropdownList.addEventListener('click', event => {
      if (event.target.closest('[data-dropdown-list-item]')) {
         event.stopPropagation();

         const activeItem = selectDropdownList.querySelector('[data-selected]');

         selectDropdownButton.innerHTML = event.target.innerHTML;
         selectValueInput.value = event.target.dataset.value;

         selectDropdownButton.focus();
         event.target.dataset.selected = '';
         activeItem.removeAttribute('data-selected');

         closeSelect();
      }
   });

   document.addEventListener('click', event => {
      if (!event.target.closest('[data-select]')) closeSelect();
   });

   selectDropdownButton.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Tab') closeSelect();
   });
});