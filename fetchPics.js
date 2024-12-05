export const fetchImageUrl = async () => {
    const randomId = Math.floor(Math.random() * 5000) + 1;
    const url = `https://jsonplaceholder.typicode.com/photos/${randomId}`;
    console.log('Fetching image from:', url);

    const controller = new AbortController();
    const signal = controller.signal;

    const timeout = setTimeout(() => {
        controller.abort();
    }, 3000);

    try {
        const response = await fetch(url, { signal });

        clearTimeout(timeout);

        if (!response.ok) {
            console.error(`Ошибка загрузки: ${response.status}`);
            return 'images/error.jpg';
        }

        const data = await response.json();
        return data?.thumbnailUrl || 'images/error.jpg';
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn('Запрос прерван');
        } else {
            console.error('Ошибка загрузки:', error.message);
        }
        return 'images/error.jpg';
    }
};

export const fetchImageForCard = async (card) => {
    const imageElement = card.querySelector('.wine-image');
    const randomId = Math.floor(Math.random() * 5000) + 1;
    const url = `https://jsonplaceholder.typicode.com/photos/${randomId}`;
    imageElement.src = 'images/spinn.gif';


    try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
            console.error(`Ошибка загрузки: ${response.status}`);
            imageElement.src = 'images/error.jpg';
            return;
        }

        const data = await response.json();
        imageElement.src = data?.thumbnailUrl || 'images/error.jpg';
    } catch (error) {
            console.error('Ошибка загрузки:', error.message);
        imageElement.src = 'images/error.jpg';
    }
};
