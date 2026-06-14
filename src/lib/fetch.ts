export async function measuredFetch(
  input: string | URL | Request,
  options?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const fetchOptions = { ...options };
  const upstreamSignal = fetchOptions.signal;
  const abortFromUpstream = () => controller.abort();
  if (upstreamSignal?.aborted) {
    controller.abort();
  } else if (upstreamSignal) {
    upstreamSignal.addEventListener("abort", abortFromUpstream, { once: true });
  }
  fetchOptions.signal = controller.signal;

  const urlString = input instanceof Request ? input.url : input.toString();
  const start = performance.now();

  try {
    const response = await fetch(input, fetchOptions);
    const duration = performance.now() - start;
    console.info(`[Fetch] ${urlString} completed in ${duration.toFixed(2)}ms`);
    return response;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(
      `[Fetch] ${urlString} failed after ${duration.toFixed(2)}ms`,
      error
    );
    throw error;
  } finally {
    clearTimeout(timeoutId);
    upstreamSignal?.removeEventListener("abort", abortFromUpstream);
  }
}
