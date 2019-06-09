export class Message {
  constructor(
    private text: string,
    private sender: string,
    private timestamp: string
  ) {}

  public getMessage(): string {
    return `${this.sender}: ${this.text}`;
  }
}
