document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Search Modal (if using custom modal)
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('modalSearchInput');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('show');
      setTimeout(() => searchInput && searchInput.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('show')) closeSearch();
    });
  }

  // Back to Top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

  // AI Prompt Component Logic
  function initPromptBoxes() {
    const promptBoxes = document.querySelectorAll('.ai-prompt-box');
    promptBoxes.forEach((box, index) => {
        const textDiv = box.querySelector('.ai-prompt-text');
        const viewBtn = box.querySelector('.view-prompt-btn');
        const downloadBtn = box.querySelector('.download-prompt-btn');
        const hideBtn = box.querySelector('.hide-prompt-btn');
        const copyBtn = box.querySelector('.copy-prompt-btn');
        const headerActions = box.querySelector('.ai-prompt-header-actions');
        const footerActions = box.querySelector('.ai-prompt-footer');

        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                box.classList.remove('collapsed');
                if (headerActions) headerActions.style.display = 'flex';
                if (footerActions) footerActions.style.display = 'none';
            });
        }
        
        if (hideBtn) {
            hideBtn.addEventListener('click', () => {
                box.classList.add('collapsed');
                if (headerActions) headerActions.style.display = 'none';
                if (footerActions) footerActions.style.display = 'flex';
            });
        }
        
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const textToCopy = box.getAttribute('data-prompt') || textDiv.innerText;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = copyBtn.innerText;
                    copyBtn.innerText = 'Copied!';
                    setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
                });
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                const textToDownload = box.getAttribute('data-prompt') || textDiv.innerText;
                
                // Construct a filename based on article slug if possible, or just default
                let filename = "prompt.txt";
                const pathParts = window.location.pathname.split('/').filter(p => p);
                if (pathParts.length > 0) {
                    const slug = pathParts[pathParts.length - 1];
                    filename = `${slug}-prompt${index > 0 ? '-' + (index + 1) : ''}.txt`;
                }

                const blob = new Blob([textToDownload], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }
    });
}
document.addEventListener('DOMContentLoaded', initPromptBoxes);

