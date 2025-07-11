// Sample course data
const courses = [
    {
        id: 1,
        title: "Complete JavaScript Course",
        instructor: "John Smith",
        category: "programming",
        duration: "40 hours",
        level: "Beginner",
        rating: 4.8,
        price: "$99",
        description: "Master JavaScript from basics to advanced concepts. Learn ES6+, DOM manipulation, async programming, and modern frameworks.",
        image: "/img/Js.jpg",
        curriculum: [
            "JavaScript Fundamentals",
            "DOM Manipulation",
            "ES6+ Features",
            "Async Programming",
            "API Integration",
            "Modern JavaScript Frameworks"
        ]
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        instructor: "Sarah Johnson",
        category: "design",
        duration: "35 hours",
        level: "Intermediate",
        rating: 4.9,
        price: "$129",
        description: "Learn to create beautiful and functional user interfaces. Master design principles, prototyping, and user research.",
        image: "/img/uxui.jpg",
        curriculum: [
            "Design Principles",
            "User Research",
            "Wireframing",
            "Prototyping",
            "Visual Design",
            "Usability Testing"
        ]
    },
    {
        id: 3,
        title: "Digital Marketing Strategy",
        instructor: "Mike Davis",
        category: "marketing",
        duration: "25 hours",
        level: "Beginner",
        rating: 4.7,
        price: "$79",
        description: "Build comprehensive digital marketing strategies. Learn SEO, social media marketing, content marketing, and analytics.",
        image: "/img/digital.jpg",
        curriculum: [
            "Marketing Fundamentals",
            "SEO Optimization",
            "Social Media Marketing",
            "Content Strategy",
            "Email Marketing",
            "Analytics & Reporting"
        ]
    },
    {
        id: 4,
        title: "Business Leadership",
        instructor: "Emily Chen",
        category: "business",
        duration: "30 hours",
        level: "Advanced",
        rating: 4.6,
        price: "$149",
        description: "Develop essential leadership skills for modern business. Learn team management, strategic thinking, and decision making.",
        image: "/img/leadership.jpg",
        curriculum: [
            "Leadership Fundamentals",
            "Team Management",
            "Strategic Planning",
            "Decision Making",
            "Communication Skills",
            "Change Management"
        ]
    },
    {
        id: 5,
        title: "Python for Data Science",
        instructor: "Dr. Robert Wilson",
        category: "programming",
        duration: "45 hours",
        level: "Intermediate",
        rating: 4.8,
        price: "$119",
        description: "Master Python for data analysis and machine learning. Learn pandas, numpy, matplotlib, and scikit-learn.",
        image: "/img/py.jpg",
        curriculum: [
            "Python Basics",
            "Data Manipulation with Pandas",
            "Data Visualization",
            "Statistical Analysis",
            "Machine Learning Basics",
            "Real-world Projects"
        ]
    },
    {
        id: 6,
        title: "Graphic Design Fundamentals",
        instructor: "Lisa Anderson",
        category: "design",
        duration: "28 hours",
        level: "Beginner",
        rating: 4.7,
        price: "$89",
        description: "Learn the fundamentals of graphic design. Master typography, color theory, composition, and design software.",
        image: "/img/gd.jpg",
        curriculum: [
            "Design Principles",
            "Typography",
            "Color Theory",
            "Adobe Creative Suite",
            "Brand Identity",
            "Print vs Digital Design"
        ]
    }
];

// Application state
let enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
let currentFilter = 'all';

// DOM elements
const coursesGrid = document.getElementById('coursesGrid');
const courseModal = document.getElementById('courseModal');
const enrolledCoursesGrid = document.getElementById('enrolledCoursesGrid');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderCourses();
    updateDashboard();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            updateActiveNavLink(this);
        });
    });

    // Course filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.category;
            updateActiveFilter(this);
            renderCourses();
        });
    });

    // Modal close
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === courseModal) {
            closeModal();
        }
    });

    // Enroll button
    document.getElementById('enrollBtn').addEventListener('click', function() {
        const courseId = parseInt(this.dataset.courseId);
        enrollInCourse(courseId);
    });

    // Hero buttons
    document.querySelector('.hero-actions .btn-primary').addEventListener('click', function() {
        showSection('courses');
        updateActiveNavLink(document.querySelector('a[href="#courses"]'));
    });

    document.querySelector('.hero-actions .btn-outline').addEventListener('click', function() {
        showSection('courses');
        updateActiveNavLink(document.querySelector('a[href="#courses"]'));
    });
}

// Render courses based on current filter
function renderCourses() {
    const filteredCourses = currentFilter === 'all' 
        ? courses 
        : courses.filter(course => course.category === currentFilter);

    coursesGrid.innerHTML = filteredCourses.map(course => `
        <div class="course-card" onclick="openCourseModal(${course.id})">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}" />
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-instructor">By ${course.instructor}</p>
                <div class="course-meta">
                    <span class="duration"><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span class="level"><i class="fas fa-signal"></i> ${course.level}</span>
                    <span class="rating"><i class="fas fa-star"></i> ${course.rating}</span>
                </div>
                <p class="course-description">${course.description.substring(0, 100)}...</p>
                <div class="course-footer">
                    <span class="course-price">${course.price}</span>
                    <button class="btn-primary" onclick="event.stopPropagation(); openCourseModal(${course.id})">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open course modal
function openCourseModal(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    document.getElementById('modalCourseTitle').textContent = course.title;
    document.getElementById('modalInstructor').textContent = course.instructor;
    document.getElementById('modalDuration').textContent = course.duration;
    document.getElementById('modalLevel').textContent = course.level;
    document.getElementById('modalRating').textContent = course.rating;
    document.getElementById('modalDescription').textContent = course.description;
    document.getElementById('modalPrice').textContent = course.price;
    
    const curriculumList = document.getElementById('modalCurriculum');
    curriculumList.innerHTML = course.curriculum.map(item => `<li>${item}</li>`).join('');

    const enrollBtn = document.getElementById('enrollBtn');
    const isEnrolled = enrolledCourses.some(ec => ec.id === courseId);
    
    if (isEnrolled) {
        enrollBtn.textContent = 'Already Enrolled';
        enrollBtn.disabled = true;
        enrollBtn.style.opacity = '0.6';
    } else {
        enrollBtn.textContent = 'Enroll Now';
        enrollBtn.disabled = false;
        enrollBtn.style.opacity = '1';
        enrollBtn.dataset.courseId = courseId;
    }

    courseModal.style.display = 'block';
}

// Close modal
function closeModal() {
    courseModal.style.display = 'none';
}

// Enroll in course
function enrollInCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const enrolledCourse = {
        ...course,
        enrolledDate: new Date().toISOString(),
        progress: 0,
        completed: false
    };

    enrolledCourses.push(enrolledCourse);
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    
    updateDashboard();
    closeModal();
    
    // Show success message
    alert(`Successfully enrolled in "${course.title}"!`);
}

// Update dashboard
function updateDashboard() {
    const enrolledCount = enrolledCourses.length;
    const completedCount = enrolledCourses.filter(course => course.completed).length;
    const totalHours = enrolledCourses.reduce((total, course) => {
        const hours = parseInt(course.duration.split(' ')[0]);
        return total + (course.progress / 100) * hours;
    }, 0);

    document.getElementById('enrolledCount').textContent = enrolledCount;
    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('totalHours').textContent = Math.round(totalHours);

    renderEnrolledCourses();
}

// Render enrolled courses
function renderEnrolledCourses() {
    if (enrolledCourses.length === 0) {
        enrolledCoursesGrid.innerHTML = '<p style="text-align: center; color: var(--gray); grid-column: 1 / -1;">No courses enrolled yet. Start learning today!</p>';
        return;
    }

    enrolledCoursesGrid.innerHTML = enrolledCourses.map(course => `
        <div class="enrolled-course-card">
            <h4 style="color: var(--navy-blue); margin-bottom: 0.5rem;">${course.title}</h4>
            <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 1rem;">By ${course.instructor}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <span style="font-size: 0.9rem; color: var(--gray);">${course.progress}% Complete</span>
                <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="continueLesson(${course.id})">
                    ${course.progress === 0 ? 'Start' : 'Continue'}
                </button>
            </div>
        </div>
    `).join('');
}

// Continue lesson (simulate progress)
function continueLesson(courseId) {
    const courseIndex = enrolledCourses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) return;

    // Simulate progress increment
    const currentProgress = enrolledCourses[courseIndex].progress;
    const newProgress = Math.min(currentProgress + Math.floor(Math.random() * 20) + 10, 100);
    
    enrolledCourses[courseIndex].progress = newProgress;
    
    if (newProgress === 100) {
        enrolledCourses[courseIndex].completed = true;
        alert('Congratulations! You have completed this course!');
    }

    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    updateDashboard();
}

// Show section
function showSection(sectionId) {
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Update active filter
function updateActiveFilter(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize with home section visible
showSection('home');