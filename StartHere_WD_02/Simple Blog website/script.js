let posts = JSON.parse(localStorage.getItem('posts')) || [];

function createPost() {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    if (title && content) {
        const post = {
            id: posts.length + 1,
            title,
            content,
            date: new Date().toLocaleDateString()
        };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post created successfully!');
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        renderAdminPosts(); 
    }
}

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderAdminPosts(); 
}

function editPost(id) {
    const post = posts.find(post => post.id === id);
    if (post) {
        const newTitle = prompt('Edit Title:', post.title);
        const newContent = prompt('Edit Content:', post.content);
        if (newTitle !== null && newContent !== null) {
            post.title = newTitle;
            post.content = newContent;
            localStorage.setItem('posts', JSON.stringify(posts));
            renderAdminPosts(); 
        }
    }
}

function renderAdminPosts() {
    const postsContainer = document.getElementById('posts');
    if (postsContainer) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('card');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content.slice(0, 100)}...</p>
                <p><em>${post.date}</em></p>
                <button onclick="readMore(${post.id})">Read More</button>
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }
}

function renderBlogPosts() {
    const postsContainer = document.getElementById('posts');
    if (postsContainer) {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('card');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content.slice(0, 100)}...</p>
                <p><em>${post.date}</em></p>
                <button onclick="readMore(${post.id})">Read More</button>
            `;
            postsContainer.appendChild(postElement);
        });
    }
}

function readMore(id) {
    const post = posts.find(post => post.id === id);
    if (post) {
        alert(post.content);
    }
}

if (document.getElementById('posts')) {
    if (window.location.pathname.includes('admin.html')) {
        renderAdminPosts();
    } else {
        renderBlogPosts();
    }
}
