import { supabase } from './supabase-client';

console.log('Frosthaven Extension Service Worker Loaded');

chrome.runtime.onMessage.addListener((message: { action?: string }) => {
  if (message.action === 'signIn') {
    void supabase.auth
      .signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: chrome.identity.getRedirectURL('auth.html'),
        },
      })
      .then(({ data, error }) => {
        if (error) console.error('Sign in error:', error);
        if (data.url) {
          chrome.identity.launchWebAuthFlow(
            {
              url: data.url,
              interactive: true,
            },
            (redirectUrl) => {
              if (redirectUrl) {
                // Parse session from URL and set it
                // Note: Supabase handling of implicit flow in extension is tricky.
                // Often better to use supabase.auth.getSession() if the redirect sets cookies,
                // but extensions don't share cookies easily.
                // For now, we'll assume the standard flow and might need to refine.
                console.log('Auth flow completed', redirectUrl);
              }
            }
          );
        }
      });
  }
});
