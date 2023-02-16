function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const result = originalMethod.apply(this, args);
    console.log(`Current state of queue: ${JSON.stringify(this.queue)}`);
    return result;
  };

  return descriptor;
}

function delay(ms: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);
    };

    return descriptor;
  };
}

export class Queue {
  private queue: any[] = [];

  @log
  public add(element: any) {
    this.queue.push(element);
    return this.queue;
  }

  @log
  @delay(1000)
  public remove() {
    return this.queue.shift();
  }
}
