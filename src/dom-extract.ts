export interface Scenario {
    id: number;
    unlocked: boolean;
    complete: boolean;
    element: HTMLElement;
}

export function extractScenarios(): Scenario[] {
    const scenarioElements = document.querySelectorAll('.scenario');
    const scenarios: Scenario[] = [];

    scenarioElements.forEach((element) => {
        const numberEl = element.querySelector('.number');
        if (!numberEl) return;

        const id = parseInt(numberEl.textContent || '0', 10);
        const isLocked = !!element.querySelector('.locked-marker');

        // Check for completion
        // Assuming "complete" value radio is checked
        const completeRadio = element.querySelector('input[type="radio"][value="complete"]') as HTMLInputElement;
        const isComplete = completeRadio?.checked || false;

        if (!isLocked && !isComplete) {
            scenarios.push({
                id,
                unlocked: true,
                complete: false,
                element: element as HTMLElement
            });
        }
    });

    return scenarios;
}
