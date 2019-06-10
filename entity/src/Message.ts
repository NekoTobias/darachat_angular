export class Message {
  constructor(
    private text: string,
    private sender: any,
    private timestamp: string
  ) {}

  public getMessage(): string {
    return `${this.sender.username}: ${this.text}`;
  }
}
