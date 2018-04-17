export default class Cookie {
  read(name: string) {
    const result = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)').exec(document.cookie);
    return result ? result[1] : null;
  }
  
  write(name: string, value: string, days?: number) {
    if (!days) {
      days = 365 * 20;
    }
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = '; expires=' + date.toUTCString();
    
    document.cookie = name + '=' + value + expires + '; path=/';
  }
  
  remove(name: string) {
    this.write(name, '', -1);
  }
}