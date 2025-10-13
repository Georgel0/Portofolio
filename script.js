document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('loading');
  }, 100);
  
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