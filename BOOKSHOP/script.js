// Sample book data
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "fiction",
    price: 12.99,
    rating: 4.5,
    image: "/img/The Great Gatsby.jpg",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "fiction",
    price: 14.99,
    rating: 4.8,
    image: "/img/To Kill a Mockingbird.jpg",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
  },
  {
    id: 3,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "fiction",
    price: 13.99,
    rating: 4.2,
    image: "/img/The Catcher in the Rye.jpg",
    description: "A controversial coming-of-age story following Holden Caulfield's journey through New York City.",
  },
  {
    id: 4,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "non-fiction",
    price: 16.99,
    rating: 4.6,
    image: "/img/Sapiens.jpg",
    description: "A fascinating exploration of human history and how Homo sapiens came to dominate the world.",
  },
  {
    id: 5,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    category: "mystery",
    price: 15.99,
    rating: 4.4,
    image: "/img/The Girl with the Dragon Tattoo.jpg",
    description: "A gripping Swedish crime thriller featuring journalist Mikael Blomkvist and hacker Lisbeth Salander.",
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "romance",
    price: 11.99,
    rating: 4.7,
    image: "/img/Pride and Prejudice.jpg",
    description: "A timeless romance following Elizabeth Bennet and Mr. Darcy in 19th century England.",
  },
  {
    id: 7,
    title: "Dune",
    author: "Frank Herbert",
    category: "sci-fi",
    price: 17.99,
    rating: 4.5,
    image: "/img/Dune.jpg",
    description:
      "An epic science fiction novel set on the desert planet Arrakis, featuring political intrigue and mystical powers.",
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "fantasy",
    price: 13.99,
    rating: 4.8,
    image: "/img/The Hobbit.jpg",
    description: "Follow Bilbo Baggins on his unexpected journey to help a group of dwarves reclaim their homeland.",
  },
  {
    id: 9,
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "mystery",
    price: 14.99,
    rating: 4.3,
    image: "/img/Gone Girl.jpg",
    description: "A psychological thriller about a marriage gone terribly wrong when Amy Dunne disappears.",
  },
  {
    id: 10,
    title: "The Notebook",
    author: "Nicholas Sparks",
    category: "romance",
    price: 12.99,
    rating: 4.4,
    image: "/img/The Notebook.jpg",
    description: "A heartwarming love story that spans decades, proving that true love never dies.",
  },
  {
    id: 11,
    title: "1984",
    author: "George Orwell",
    category: "sci-fi",
    price: 13.99,
    rating: 4.6,
    image: "/img/1984.jpg",
    description: "A dystopian masterpiece about totalitarian control and the power of independent thought.",
  },
  {
    id: 12,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "fantasy",
    price: 15.99,
    rating: 4.9,
    image: "/img/Harry Potter and the Sorcerer's Stone.jpg",
    description: "The magical beginning of Harry Potter's journey at Hogwarts School of Witchcraft and Wizardry.",
  },
]

// Shopping cart
let cart = []

// DOM elements
const booksGrid = document.getElementById("booksGrid")
const cartBtn = document.getElementById("cartBtn")
const cartCount = document.getElementById("cartCount")
const cartModal = document.getElementById("cartModal")
const bookModal = document.getElementById("bookModal")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const categoryFilter = document.getElementById("categoryFilter")
const sortFilter = document.getElementById("sortFilter")

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  displayBooks(books)
  setupEventListeners()
  updateCartUI()
})

// Display books
function displayBooks(booksToShow) {
  booksGrid.innerHTML = ""

  booksToShow.forEach((book) => {
    const bookCard = createBookCard(book)
    booksGrid.appendChild(bookCard)
  })
}

// Create book card element
function createBookCard(book) {
  const bookCard = document.createElement("div")
  bookCard.className = "book-card"
  bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="book-image">
        <div class="book-info">
            <h3>${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <span class="book-category">${book.category}</span>
            <div class="book-price">$${book.price}</div>
            <div class="book-rating">${"⭐".repeat(Math.floor(book.rating))} ${book.rating}</div>
            <button class="add-to-cart" onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `

  // Add click event to show book details (except for the button)
  bookCard.addEventListener("click", (e) => {
    if (!e.target.classList.contains("add-to-cart")) {
      showBookDetails(book)
    }
  })

  return bookCard
}

// Show book details modal
function showBookDetails(book) {
  document.getElementById("bookTitle").textContent = book.title
  document.getElementById("bookImage").src = book.image
  document.getElementById("bookAuthor").textContent = book.author
  document.getElementById("bookCategory").textContent = book.category
  document.getElementById("bookPrice").textContent = book.price
  document.getElementById("bookRating").textContent = book.rating
  document.getElementById("bookDescription").textContent = book.description

  const addToCartBtn = document.getElementById("addToCartFromModal")
  addToCartBtn.onclick = () => addToCart(book.id)

  bookModal.style.display = "block"
}

// Add to cart
function addToCart(bookId) {
  const book = books.find((b) => b.id === bookId)
  const existingItem = cart.find((item) => item.id === bookId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...book, quantity: 1 })
  }

  updateCartUI()
  showNotification(`${book.title} added to cart!`)
}

// Update cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  cartCount.textContent = totalItems
}

// Show cart modal
function showCart() {
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>'
    cartTotal.textContent = "0.00"
  } else {
    cartItems.innerHTML = ""
    let total = 0

    cart.forEach((item) => {
      total += item.price * item.quantity
      const cartItem = createCartItem(item)
      cartItems.appendChild(cartItem)
    })

    cartTotal.textContent = total.toFixed(2)
  }

  cartModal.style.display = "block"
}

// Create cart item element
function createCartItem(item) {
  const cartItem = document.createElement("div")
  cartItem.className = "cart-item"
  cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
            <h4>${item.title}</h4>
            <p>by ${item.author}</p>
            <p>$${item.price}</p>
        </div>
        <div class="cart-item-actions">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `
  return cartItem
}

// Update quantity
function updateQuantity(bookId, change) {
  const item = cart.find((item) => item.id === bookId)
  if (item) {
    item.quantity += change
    if (item.quantity <= 0) {
      removeFromCart(bookId)
    } else {
      updateCartUI()
      showCart() // Refresh cart display
    }
  }
}

// Remove from cart
function removeFromCart(bookId) {
  cart = cart.filter((item) => item.id !== bookId)
  updateCartUI()
  showCart() // Refresh cart display
}

// Clear cart
function clearCart() {
  cart = []
  updateCartUI()
  showCart() // Refresh cart display
}

// Search books
function searchBooks() {
  const searchTerm = searchInput.value.toLowerCase()
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm),
  )
  displayBooks(filteredBooks)
}

// Filter books by category
function filterBooks() {
  const category = categoryFilter.value
  const filteredBooks = category === "all" ? books : books.filter((book) => book.category === category)
  displayBooks(sortBooks(filteredBooks))
}

// Sort books
function sortBooks(booksToSort = books) {
  const sortBy = sortFilter.value
  const sorted = [...booksToSort]

  switch (sortBy) {
    case "title":
      sorted.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "price-low":
      sorted.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      sorted.sort((a, b) => b.price - a.price)
      break
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating)
      break
  }

  return sorted
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`)
  cart = []
  updateCartUI()
  cartModal.style.display = "none"
}

// Setup event listeners
function setupEventListeners() {
  // Cart button
  cartBtn.addEventListener("click", showCart)

  // Search
  searchBtn.addEventListener("click", searchBooks)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBooks()
    }
  })

  // Filters
  categoryFilter.addEventListener("change", filterBooks)
  sortFilter.addEventListener("change", () => {
    const currentBooks = getCurrentDisplayedBooks()
    displayBooks(sortBooks(currentBooks))
  })

  // Modal close buttons
  document.getElementById("closeCart").addEventListener("click", () => {
    cartModal.style.display = "none"
  })

  document.getElementById("closeBook").addEventListener("click", () => {
    bookModal.style.display = "none"
  })

  // Cart actions
  document.getElementById("clearCart").addEventListener("click", clearCart)
  document.getElementById("checkout").addEventListener("click", checkout)

  // Category cards
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.dataset.category
      categoryFilter.value = category
      filterBooks()
      document.getElementById("books").scrollIntoView()
    })
  })

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none"
    }
    if (e.target === bookModal) {
      bookModal.style.display = "none"
    }
  })
}

// Get currently displayed books (for sorting)
function getCurrentDisplayedBooks() {
  const category = categoryFilter.value
  const searchTerm = searchInput.value.toLowerCase()

  let filteredBooks = books

  if (category !== "all") {
    filteredBooks = filteredBooks.filter((book) => book.category === category)
  }

  if (searchTerm) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm),
    )
  }

  return filteredBooks
}

// Add CSS animation for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
