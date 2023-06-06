// Fetch data from the API and display it on the UI
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        const blogsContainer = document.getElementById('blogs');

        data.forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.classList.add('blog');
            blogElement.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.body}</p>
                <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
            `;
            blogsContainer.appendChild(blogElement);
        });
    });

// Function to add a new blog
function addBlog(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');

    const newBlog = {
        title: titleInput.value,
        body: bodyInput.value,
    };

    // Make a POST request to add the new blog
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
    })
        .then(response => response.json())
        .then(blog => {
            const blogsContainer = document.getElementById('blogs');

            const blogElement = document.createElement('div');
            blogElement.classList.add('blog');
            blogElement.innerHTML = `
                <h2>${blog.title}</h2>
                <p>${blog.body}</p>
                <button class="delete-btn" onclick="deleteBlog(${blog.id})">Delete</button>
            `;
            blogsContainer.appendChild(blogElement);

            // Clear input fields after adding the blog
            titleInput.value = '';
            bodyInput.value = '';
        });
}

// Function to delete a blog
function deleteBlog(blogId) {
    // Make a DELETE request to remove the blog
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
        method: 'DELETE',
    });

    // Remove the blog element from the UI
    const blogElement = document.querySelector(`.blog:nth-child(${blogId})`);
    blogElement.remove();
}

// Event listener for adding a new blog
const addBlogForm = document.getElementById('addBlogForm');
addBlogForm.addEventListener('submit', addBlog);
