document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categorySearchInput = document.getElementById('category-search');

    // talksData will be injected here by the build script
    const allTalks = window.talksData || [];

    function renderTalks(talksToRender) {
        scheduleContainer.innerHTML = ''; // Clear existing talks
        talksToRender.forEach(talk => {
            const talkElement = document.createElement('div');
            talkElement.classList.add('talk');
            if (talk.id === 'lunch') {
                talkElement.classList.add('lunch');
            }

            const speakers = talk.speakers.length > 0 ? `<p class="talk-speakers">Speaker(s): <span>${talk.speakers.join(', ')}</span></p>` : '';
            const categories = talk.category.length > 0 ? `<p class="talk-category">Categories: ${talk.category.map(cat => `<span>${cat}</span>`).join('')}</p>` : '';

            talkElement.innerHTML = `
                <p class="talk-time">${talk.time}</p>
                <h3>${talk.title}</h3>
                ${speakers}
                ${categories}
                <p>${talk.description}</p>
            `;
            scheduleContainer.appendChild(talkElement);
        });
    }

    function filterTalks() {
        const searchTerm = categorySearchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            renderTalks(allTalks);
            return;
        }

        const filtered = allTalks.filter(talk => {
            if (talk.id === 'lunch') { // Always show lunch
                return true;
            }
            return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
        });
        renderTalks(filtered);
    }

    categorySearchInput.addEventListener('input', filterTalks);

    // Initial render of all talks
    renderTalks(allTalks);
});