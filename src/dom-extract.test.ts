import { describe, it, expect, beforeEach } from 'vitest';
import { extractScenarios } from './dom-extract';

describe('DOM Extraction', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('extracts unlocked and incomplete scenarios', () => {
    // Fixture:
    // Scenario 1: Unlocked, Incomplete (Should be extracted)
    // Scenario 2: Locked (Has "×" marker) (Should be ignored)
    // Scenario 3: Unlocked, Complete (Checked radio) (Should be ignored)

    document.body.innerHTML = `
      <div class="scenario-list">
        <!-- Scenario 1 -->
        <div id="scenario-1" class="scenario">
          <span class="number">1</span>
          <input type="radio" name="s1" value="incomplete" checked>
          <input type="radio" name="s1" value="complete">
        </div>

        <!-- Scenario 2 (Locked) -->
        <div id="scenario-2" class="scenario">
          <span class="number">2</span>
          <span class="locked-marker">×</span>
          <input type="radio" name="s2" value="incomplete" checked>
        </div>

        <!-- Scenario 3 (Complete) -->
        <div id="scenario-3" class="scenario">
          <span class="number">3</span>
          <input type="radio" name="s3" value="incomplete">
          <input type="radio" name="s3" value="complete" checked>
        </div>
      </div>
    `;

    const scenarios = extractScenarios();

    expect(scenarios).toHaveLength(1);
    expect(scenarios[0].id).toBe(1);
    expect(scenarios[0].unlocked).toBe(true);
    expect(scenarios[0].complete).toBe(false);
  });

  it('returns empty list if no scenarios found', () => {
    document.body.innerHTML = '<div class="empty"></div>';
    const scenarios = extractScenarios();
    expect(scenarios).toEqual([]);
  });
});
