export function is_safari(): boolean {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve: (value: void | PromiseLike<void>) => void) =>
    setTimeout(resolve, ms)
  );
}

export function is_in_viewport(el: Element | HTMLElement | null): boolean {
  if (!el) {
    return false;
  }
  const rect: DOMRect = el.getBoundingClientRect();

  return (
    rect.bottom >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function read_json(url: string, callback: (data: any) => void): void {
  let xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onreadystatechange = function (): void {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let my_data: any = JSON.parse(xhr.response);
      callback(my_data);
    }
  };
  xhr.send();
}

export default read_json;
