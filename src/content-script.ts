import { extractScenarios } from './dom-extract'
import { createOverlay } from './overlay'
import { supabase, supabaseLoad, supabaseSave } from './supabase-client'
import './style.css'

console.log('Frosthaven Extension Content Script Loaded');

async function init() {
    // 1. Extract scenarios from DOM
    const scenarios = extractScenarios();
    if (scenarios.length === 0) {
        console.log('No unlocked incomplete scenarios found.');
        return;
    }

    // 2. Get User ID
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    // 3. Load existing order
    let order: number[] = [];
    if (userId) {
        try {
            order = await supabaseLoad(userId, 'frosthaven');
        } catch (e) {
            console.error('Failed to load order', e);
        }
    }

    // 4. Sort scenarios based on order
    // Create a map for quick lookup
    const scenarioMap = new Map(scenarios.map(s => [s.id, s]));
    const sortedScenarios = [];

    // Add scenarios in order
    order.forEach(id => {
        const s = scenarioMap.get(id);
        if (s) {
            sortedScenarios.push(s);
            scenarioMap.delete(id);
        }
    });

    // Add remaining scenarios (newly unlocked ones)
    // Sort them by ID by default
    const remaining = Array.from(scenarioMap.values()).sort((a, b) => a.id - b.id);
    sortedScenarios.push(...remaining);

    // 5. Create Overlay
    createOverlay(sortedScenarios, async (newOrder) => {
        console.log('Reordered:', newOrder);
        if (userId) {
            try {
                await supabaseSave(userId, 'frosthaven', newOrder);
            } catch (e) {
                console.error('Failed to save order', e);
            }
        } else {
            console.warn('User not logged in, cannot save order.');
            // TODO: Show login prompt in UI
        }
    });
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

