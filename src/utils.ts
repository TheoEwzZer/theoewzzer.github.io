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
