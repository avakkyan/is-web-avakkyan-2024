(function () {
    window.addEventListener("load", function () {
        const [performanceEntry] = performance.getEntriesByType("navigation");

        const loadTime =
            performanceEntry.domContentLoadedEventEnd -
            performanceEntry.startTime;

        const footer = document.getElementById("load-stats");

        footer.innerHTML = `Страничка загрузилась: ${Math.round(loadTime)} мс`;
    });
})();
