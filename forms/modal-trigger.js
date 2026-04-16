// Add this to your homepage for a modal form experience
// This keeps users on the same page while filling the form

function openProjectForm() {
    // Option 1: Open in modal iframe
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;
    
    modal.innerHTML = `
        <div style="width: 90%; max-width: 600px; height: 90vh; background: white; border-radius: 16px; position: relative;">
            <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer;">✕</button>
            <iframe src="forms/intake-form-v2.html" style="width: 100%; height: 100%; border: none; border-radius: 16px;"></iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Update your CTA button:
// <a href="#" onclick="openProjectForm(); return false;" class="cta-button">Start Your Project</a>