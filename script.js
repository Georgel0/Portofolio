document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 100);
  
  // Project Filter 
  
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => card.classList.add('show'));
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.add('show');
        } else {
          card.classList.remove('show');
        }
      });
    });
  });
  
  // Reach Out Button Animation
  
  const reachOutBtn = document.getElementById('reach-out-btn');
  const contactFormContainer = document.getElementById('contact-form-container');
  
  reachOutBtn.addEventListener('click', () => {
    contactFormContainer.classList.toggle('visible');
    
    reachOutBtn.classList.add('fade-out');
    
    setTimeout(() => {
      if (contactFormContainer.classList.contains('visible')) {
        reachOutBtn.textContent = 'Close';
      } else {
        reachOutBtn.textContent = 'Reach Out';
      }
      reachOutBtn.classList.remove('fade-out');
    }, 300);
  });
});

// Dark Mode Toggle 

const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function setTheme (theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    
    localStorage.setItem('theme', 'light');
  }
}

toggleButton.addEventListener('click', () => {
  const isDarkMode = body.classList.contains('dark-mode');
  themeIcon.classList.add('rotated');
  
  setTimeout(() => {
    setTheme(isDarkMode ? 'light' : 'dark');
    
    themeIcon.classList.remove('rotated');
  }, 500);
});

window.onload = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
};