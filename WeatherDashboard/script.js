// Weather Dashboard JavaScript

class WeatherDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.updateTime();
        this.setupEventListeners();
        this.animateCharts();
        this.startTimeUpdater();
    }

    // Update current time and date
    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
        }) + ' | ' + now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');
        
        if (timeElement) timeElement.textContent = timeString;
        if (dateElement) dateElement.textContent = dateString;
    }

    // Start time updater interval
    startTimeUpdater() {
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    // Setup all event listeners
    setupEventListeners() {
        this.setupTabListeners();
        this.setupHoverEffects();
        this.setupNavigationListeners();
    }

    // Setup tab functionality
    setupTabListeners() {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target);
            });
        });
    }

    // Switch active tab
    switchTab(clickedTab) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        clickedTab.classList.add('active');
        
        // Update forecast data based on selected tab
        const tabType = clickedTab.getAttribute('data-tab');
        this.updateForecastData(tabType);
    }

    // Update forecast data (placeholder for future API integration)
    updateForecastData(tabType) {
        console.log(`Updating forecast for: ${tabType}`);
        // This would typically fetch new data from an API
        // For now, we'll just log the tab change
    }

    // Setup hover effects
    setupHoverEffects() {
        // User controls hover effects
        const userControls = document.querySelectorAll('.user-controls > div');
        userControls.forEach(control => {
            this.addHoverEffect(control);
        });

        // Navigation icons hover effects
        const navIcons = document.querySelectorAll('.nav-icon');
        navIcons.forEach(icon => {
            this.addHoverEffect(icon);
        });

        // Chart options hover effects
        const chartOptions = document.querySelectorAll('.chart-options');
        chartOptions.forEach(option => {
            option.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
            });
            
            option.addEventListener('mouseleave', function() {
                this.style.opacity = '0.7';
            });
        });
    }

    // Add hover effect to element
    addHoverEffect(element) {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Setup navigation listeners
    setupNavigationListeners() {
        const navIcons = document.querySelectorAll('.nav-icon');
        navIcons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                this.switchNavigation(icon, index);
            });
        });
    }

    // Switch active navigation
    switchNavigation(clickedIcon, index) {
        // Remove active class from all nav icons
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        
        // Add active class to clicked icon
        clickedIcon.classList.add('active');
        
        // Handle navigation action
        this.handleNavigation(index);
    }

    // Handle navigation actions
    handleNavigation(index) {
        const actions = ['Home', 'Users', 'Notifications', 'Analytics', 'Settings'];
        console.log(`Navigating to: ${actions[index]}`);
        
        // Add visual feedback
        this.showNotification(`Switched to ${actions[index]}`);
    }

    // Animate charts on load
    animateCharts() {
        // Animate rainfall bars
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('animate');
            }, index * 100);
        });

        // Animate chart line (if needed)
        const chartLine = document.querySelector('.chart-line');
        if (chartLine) {
            setTimeout(() => {
                chartLine.style.opacity = '1';
            }, 500);
        }
    }

    // Show notification (placeholder)
    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-size: 14px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Simulate weather data update
    updateWeatherData() {
        // This would typically fetch real weather data
        const temperatures = ['18°C', '19°C', '20°C', '21°C', '22°C'];
        const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Stormy'];
        
        // Randomly update temperature (for demo)
        const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
        const tempDisplay = document.querySelector('.temp-display');
        if (tempDisplay) {
            tempDisplay.textContent = randomTemp;
        }
    }

    // Get current weather data (placeholder for API integration)
    getCurrentWeather() {
        return {
            temperature: '20°C',
            condition: 'Partly Cloudy',
            humidity: '15%',
            windSpeed: '20 Km/h',
            location: 'Rajshahi, Bangladesh'
        };
    }

    // Get forecast data (placeholder for API integration)
    getForecastData(days = 5) {
        const forecast = [
            { day: 'Wednesday, July 12', condition: 'Cloudy', temp: '18°C', icon: 'cloudy' },
            { day: 'Thursday, July 13', condition: 'Rain', temp: '16°C', icon: 'rainy' },
            { day: 'Friday, July 14', condition: 'Thunderstorm', temp: '17°C', icon: 'stormy' },
            { day: 'Saturday, July 15', condition: 'Cloudy', temp: '22°C', icon: 'cloudy' },
            { day: 'Sunday, July 16', condition: 'Sunny', temp: '24°C', icon: 'sunny' }
        ];
        
        return forecast.slice(0, days);
    }
}

// Utility functions
const utils = {
    // Format date
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Format time
    formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    },

    // Debounce function for performance
    debounce(func, wait) { 
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const dashboard = new WeatherDashboard();
    
    // Optional: Update weather data periodically
    setInterval(() => {
        dashboard.updateWeatherData();
    }, 300000); // Update every 5 minutes
    
    console.log('Weather Dashboard initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', utils.debounce(function() {
    console.log('Window resized - adjusting layout if needed');
    // Add any responsive adjustments here
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - pausing updates');
    } else {
        console.log('Page visible - resuming updates');
    }
});