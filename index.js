import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Search Form
searchForm.addEventListener('submit', e =>{
    // Get search term
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get limit
    const searchLimit = document.getElementById('limit').value;
    //Check input
    if (searchTerm === '') {
        //Show Mesage
        showMessage('Please add a search term', 'alert-danger');
    }
    //Clear input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        let output = '<div class="card-columns">';
        // Loop through posts
        results.forEach(post => {

        //Check for image
        let image = post.preview ? post.preview.images[0].source.url : 'https://images.app.goo.gl/DZncdoHE3nDxfyJN6'
            output += `
            <div class="card" >
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${truncateText(post.selftext, 100)}.</p>
            <a href="${post.url}"target="_blank"class="btn btn-primary">Read More</a>
            </div>
        </div>
            `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });

    e.preventDefault();
})

//Show Message
function showMessage(message, className) {
    //Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    // Get parent container
    const searchContainer = document.getElementById('search-container');
    // Get search
    const search = document.getElementById('search');
    //Insert message
    searchContainer.insertBefore(div, search);
    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(),3000);

}

// Truncate text
function truncateText (text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}