document.addEventListener('DOMContentLoaded', () => {
  const videoDark = document.getElementById('video-dark');
  const videoLight = document.getElementById('video-light');
  
  const toggleButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  videoDark.playbackRate = 0.8;
  videoLight.playbackRate = 0.8;
  videoDark.load();
  videoLight.load();
  
  //Video Background Activation Function
  function activateVideo(isDarkMode) {
  
    videoDark.classList.remove('active');
    videoLight.classList.remove('active');
    videoDark.style.zIndex = '-2';
    videoLight.style.zIndex = '-2';
    
    let targetVideo = isDarkMode ? videoDark : videoLight;
    let otherVideo = isDarkMode ? videoLight : videoDark;

    otherVideo.pause();

    targetVideo.classList.add('active');
    targetVideo.style.zIndex = '-1';

    targetVideo.play().catch(e => console.debug("Play prevented:", e.message));
  }

  //Combined Theme Switching Function
  function setTheme (theme) {
    const isDarkMode = (theme === 'dark');
    
    if (!isDarkMode) { 
      body.classList.add('dark-mode'); 
      
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      toggleButton.setAttribute('aria-label', 'Toggle dark mode');
      localStorage.setItem('theme', 'light');
    } else { 
      body.classList.remove('dark-mode'); 
      
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      toggleButton.setAttribute('aria-label', 'Toggle light mode');
      localStorage.setItem('theme', 'dark');
    }
    
    // Switch the video background (true = dark video, false = light video)
    activateVideo(isDarkMode);
  }
  
  function filterProjects(filter) {
    projectCards.forEach(card => {

      const hasAnimationClass = card.classList.contains('animate-on-scroll'); 
      
      if (filter === 'all' || card.getAttribute('data-category') === filter || (filter === 'design' && card.getAttribute('data-category') === 'design')) {
        card.classList.add('show');
        
        if (hasAnimationClass) {
             card.classList.add('in-view'); 
        }
        
      } else {
        card.classList.remove('show');
        if (hasAnimationClass) {
             card.classList.remove('in-view'); 
        }
      }
    });
  }

  //Initialization on Load
  setTimeout(() => {
    document.body.classList.remove('loading');
    
    // Manually trigger animation 
    const initialElements = document.querySelectorAll('.animate-on-scroll');
    initialElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('in-view');
        }
    });
    
    filterProjects('all');
    
  }, 100);
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  } else {
    setTheme('dark'); 
  }

  //Event Listeners
  
  // Theme Toggle Click
  toggleButton.addEventListener('click', () => {
    const isCurrentlyLight = body.classList.contains('dark-mode'); 
    themeIcon.classList.add('rotated');
    
    setTimeout(() => {
      setTheme(isCurrentlyLight ? 'dark' : 'light'); 
      themeIcon.classList.remove('rotated');
    }, 500); 
  });
  
  // Autoplay handler
  document.body.addEventListener('click', () => {
    videoDark.play().catch(() => {});
    videoLight.play().catch(() => {});
  }, { once: true });

  //Project Filter Logic
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      
      const filter = button.getAttribute('data-filter');
      
      filterProjects(filter);
    });
  });
  
  //Reach Out Button Animation
  const reachOutBtn = document.getElementById('reach-out-btn');
  const contactFormContainer = document.getElementById('contact-form-container');
  
  reachOutBtn.addEventListener('click', () => {
    const isVisible = contactFormContainer.classList.toggle('visible');
    reachOutBtn.setAttribute('aria-expanded', isVisible);
    
    reachOutBtn.classList.add('fade-out');
    
    setTimeout(() => {
      reachOutBtn.textContent = isVisible ? 'Close' : 'Reach Out';
      reachOutBtn.classList.remove('fade-out');
    }, 300); 
  });
});
