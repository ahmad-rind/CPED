/**
 * Scroll Performance Benchmarking Tool
 * Programmatically scrolls the page to profile FPS, frame drop rates, and long tasks.
 * Activates ONLY when appending '?benchmark=true' to the URL, ensuring zero overhead in production.
 */
export function runBenchmark() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('benchmark')) return;

    console.log("%c[BENCHMARK] Starting scrolling performance profiling...", "color: #FFB800; font-weight: bold; font-size: 14px;");

    const frames = [];
    let lastTime = performance.now();
    let longTasksCount = 0;
    const longTaskDurations = [];

    // Initialize PerformanceObserver to track long CPU tasks (>50ms)
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            longTasksCount++;
            longTaskDurations.push(entry.duration);
            console.warn(`[BENCHMARK] Long Task: ${entry.duration.toFixed(2)}ms`);
        }
    });

    try {
        observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        console.log("[BENCHMARK] PerformanceObserver for longtask is not supported in this browser.");
    }

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const totalScroll = scrollHeight - clientHeight;
    const duration = 3000; // 3 seconds scrolling duration
    const startTime = performance.now();

    function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, progress * totalScroll);

        const delta = now - lastTime;
        // Skip first frame delta calculation to avoid initialization outliers
        if (frames.length > 0 || delta < 100) {
            frames.push(delta);
        }
        lastTime = now;

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            // Stop observing long tasks
            observer.disconnect();
            
            // Calculate scrolling FPS metrics
            const fpsValues = frames.map(f => 1000 / f);
            const avgFps = fpsValues.reduce((a, b) => a + b, 0) / fpsValues.length;
            const minFps = Math.min(...fpsValues);

            const results = {
                avgFps: parseFloat(avgFps.toFixed(2)),
                minFps: parseFloat(minFps.toFixed(2)),
                longTasks: longTasksCount,
                longTaskDurations: longTaskDurations
            };

            // Expose globally so testing tools or consoles can read it programmatically
            window.__benchmarkResults = results;

            console.log("%c[BENCHMARK] Completed successfully!", "color: #E8651A; font-weight: bold; font-size: 14px;");
            console.dir(results);
        }
    }

    // Wait a brief delay after load to stabilize before running scroll loop
    setTimeout(() => {
        lastTime = performance.now();
        requestAnimationFrame(tick);
    }, 1000);
}
