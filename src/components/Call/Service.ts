export class AppService {
  url: string;
  public constructor(url: string) {
    this.url = url;
  }

  public async getItems(): Promise<any> {
    const response = await fetch(this.url);
    return await response.json();
  }
}
