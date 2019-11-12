const getData = () => {
  fetch(`api/recipes`)
    .then(response => response.json())
    .then(recipes => renderStories(recipes))
    .catch(error => console.error(error));
};

const renderStories = recipes => {
  const el = document.querySelector('#app');
  el.innerHTML = recipes
    .map(recipe => {
      return `<div>
      <img src="img/${recipe.image}" />
      <h3><a href="detail.html?recipe=${recipe._id}">${recipe.title}</a></h3>
      <p>${recipe.description}</p>
      <a data-id=${recipe._id} href="#">Delete</a>
    </div>`;
    })
    .join('');
};

const handleClicks = () => {
  if (event.target.matches('[data-id]')) {
    fetch(`api/recipes/${event.target.dataset.id}`, {
      method: 'DELETE',
    });
    event.preventDefault();
    location.reload();
  }
};

document.addEventListener('click', handleClicks);

if (document.readyState !== 'loading') {
  getData();
} else {
  document.addEventListener('DOMContentLoaded', getData());
}