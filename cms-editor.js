/**
 * CMS Editor - Production Version with Supabase
 * One-line integration for any website
 */

(function() {
    'use strict';
    
    // Get configuration from script tag
    const currentScript = document.currentScript;
    const config = {
        siteId: currentScript.getAttribute('data-site-id') || 'default-site',
        supabaseUrl: currentScript.getAttribute('data-supabase-url') || '',
        supabaseKey: currentScript.getAttribute('data-supabase-key') || '',
        authKey: currentScript.getAttribute('data-auth-key') || 'cms-login'
    };
    
    // Check authentication
    const urlParams = new URLSearchParams(window.location.search);
    const isAuthenticated = urlParams.get(config.authKey) === 'true' || 
                          localStorage.getItem(`cms-auth-${config.siteId}`) === 'true';
    
    if (!isAuthenticated) return;
    
    // Store auth in localStorage
    localStorage.setItem(`cms-auth-${config.siteId}`, 'true');
    
    const CMS = {
        fields: {},
        originalContent: {},
        changes: {},
        supabase: null,
        
        init() {
            this.injectStyles();
            this.findEditableFields();
            this.createUI();
            this.bindEvents();
            
            if (config.supabaseUrl && config.supabaseKey) {
                this.initSupabase();
                this.loadContent();
            }
        },
        
        initSupabase() {
            // Load Supabase client
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
            script.onload = () => {
                this.supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
            };
            document.head.appendChild(script);
        },
        
        async loadContent() {
            if (!this.supabase) return;
            
            try {
                const { data, error } = await this.supabase
                    .from('content')
                    .select('field_id, content')
                    .eq('site_id', config.siteId);
                
                if (data) {
                    data.forEach(item => {
                        const element = document.querySelector(`[data-cms-field="${item.field_id}"]`);
                        if (element) {
                            element.textContent = item.content;
                            this.originalContent[item.field_id] = item.content;
                        }
                    });
                }
            } catch (err) {
                console.error('Failed to load content:', err);
            }
        },
        
        async saveContent() {
            if (!this.supabase || Object.keys(this.changes).length === 0) {
                this.showNotification('No changes to save', 'info');
                return;
            }
            
            const updates = Object.entries(this.changes).map(([field_id, content]) => ({
                id: `${config.siteId}_${field_id}`,
                site_id: config.siteId,
                field_id,
                content,
                updated_at: new Date().toISOString()
            }));
            
            try {
                const { error } = await this.supabase
                    .from('content')
                    .upsert(updates);
                
                if (error) throw error;
                
                this.showNotification('Changes saved successfully!', 'success');
                this.changes = {};
                this.updateUI();
                
            } catch (err) {
                console.error('Failed to save:', err);
                this.showNotification('Failed to save changes', 'error');
            }
        },
        
        injectStyles() {
            const style = document.createElement('style');
            style.textContent = `
                /* CMS Editor Styles */
                .cms-highlight {
                    outline: 3px solid #3b82f6 !important;
                    outline-offset: 4px;
                    background-color: rgba(59, 130, 246, 0.1) !important;
                    animation: cms-pulse 2s ease-out;
                }
                
                @keyframes cms-pulse {
                    0% { 
                        outline-color: #3b82f6;
                        outline-width: 3px;
                    }
                    50% { 
                        outline-color: #60a5fa;
                        outline-width: 4px;
                    }
                    100% { 
                        outline-color: #3b82f6;
                        outline-width: 3px;
                    }
                }
                
                #cms-editor {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                }
                
                .cms-fab {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .cms-fab:hover {
                    background: #2563eb;
                    transform: scale(1.05);
                }
                
                #cms-panel {
                    position: fixed;
                    right: 0;
                    top: 0;
                    height: 100vh;
                    width: 360px;
                    background: white;
                    box-shadow: -2px 0 8px rgba(0,0,0,0.1);
                    transform: translateX(100%);
                    transition: transform 0.3s;
                    z-index: 10001;
                    display: flex;
                    flex-direction: column;
                }
                
                #cms-panel.open {
                    transform: translateX(0);
                }
                
                .cms-notification {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 12px 24px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 10002;
                    animation: slideDown 0.3s;
                }
                
                .cms-notification.success {
                    background: #10b981;
                }
                
                .cms-notification.error {
                    background: #ef4444;
                }
                
                .cms-notification.info {
                    background: #3b82f6;
                }
                
                @keyframes slideDown {
                    from { transform: translate(-50%, -100%); }
                    to { transform: translate(-50%, 0); }
                }
            `;
            document.head.appendChild(style);
        },
        
        createUI() {
            // Create FAB button
            const editorDiv = document.createElement('div');
            editorDiv.id = 'cms-editor';
            editorDiv.innerHTML = `
                <button class="cms-fab" id="cms-toggle">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
            `;
            
            // Create side panel
            const panel = document.createElement('div');
            panel.id = 'cms-panel';
            panel.innerHTML = `
                <div style="padding: 16px 20px; border-bottom: 1px solid #e5e7eb; position: relative;">
                    <h2 style="margin: 0; font-size: 18px; font-weight: 600;">Edit Content</h2>
                    <button id="cms-close" style="position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; padding: 4px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div id="cms-fields" style="flex: 1; overflow-y: auto; padding: 20px 20px 16px;">
                    <!-- Fields will be populated here -->
                </div>
                <div style="padding: 16px 20px; border-top: 1px solid #e5e7eb;">
                    <button id="cms-save" style="width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer; font-size: 14px;">
                        Save Changes
                    </button>
                </div>
            `;
            
            document.body.appendChild(editorDiv);
            document.body.appendChild(panel);
        },
        
        findEditableFields() {
            document.querySelectorAll('[data-cms-field]').forEach(element => {
                const fieldId = element.getAttribute('data-cms-field');
                this.fields[fieldId] = element;
                this.originalContent[fieldId] = element.textContent.trim();
                
                // Make clickable
                element.style.cursor = 'pointer';
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.editField(fieldId);
                });
            });
        },
        
        editField(fieldId) {
            const element = this.fields[fieldId];
            if (!element) return;
            
            // Highlight field
            element.classList.add('cms-highlight');
            setTimeout(() => element.classList.remove('cms-highlight'), 2000);
            
            // Open panel if closed
            document.getElementById('cms-panel').classList.add('open');
            
            // Focus on field in panel
            const input = document.getElementById(`cms-input-${fieldId}`);
            if (input) {
                input.focus();
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
        
        updateUI() {
            const container = document.getElementById('cms-fields');
            container.innerHTML = '';
            
            Object.entries(this.fields).forEach(([fieldId, element]) => {
                const div = document.createElement('div');
                div.style.marginBottom = '16px';
                div.innerHTML = `
                    <label style="display: block; font-size: 13px; font-weight: 500; margin-bottom: 4px; color: #374151;">
                        ${this.formatFieldName(fieldId)}
                    </label>
                    <input type="text" 
                           id="cms-input-${fieldId}"
                           value="${element.textContent.trim()}"
                           style="width: 100%; padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
                `;
                
                const input = div.querySelector('input');
                input.addEventListener('input', (e) => {
                    const newValue = e.target.value;
                    element.textContent = newValue;
                    
                    if (newValue !== this.originalContent[fieldId]) {
                        this.changes[fieldId] = newValue;
                    } else {
                        delete this.changes[fieldId];
                    }
                });
                
                // Add focus highlighting
                input.addEventListener('focus', () => {
                    // Remove any existing highlights
                    document.querySelectorAll('.cms-highlight').forEach(el => {
                        el.classList.remove('cms-highlight');
                    });
                    // Highlight the corresponding element
                    element.classList.add('cms-highlight');
                    // No scrolling - just highlight
                });
                
                input.addEventListener('blur', () => {
                    // Remove highlight after a delay
                    setTimeout(() => {
                        element.classList.remove('cms-highlight');
                    }, 500);
                });
                
                container.appendChild(div);
            });
        },
        
        formatFieldName(fieldId) {
            return fieldId
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        },
        
        bindEvents() {
            document.getElementById('cms-toggle').addEventListener('click', () => {
                document.getElementById('cms-panel').classList.toggle('open');
                this.updateUI();
            });
            
            document.getElementById('cms-close').addEventListener('click', () => {
                document.getElementById('cms-panel').classList.remove('open');
            });
            
            document.getElementById('cms-save').addEventListener('click', () => {
                this.saveContent();
            });
        },
        
        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `cms-notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CMS.init());
    } else {
        CMS.init();
    }
})();