import { Pipe, PipeTransform } from '@angular/core';

interface TruncateOptions {
  trail: string;
  wordCount: number;
}

@Pipe({
  name: 'oxford',
})
export class OxfordPipe implements PipeTransform {
  private static trim(value: any): string {
    return ('' + value).trim();
  }

  transform(
    values: string[],
    conjunction = 'and',
    truncate: TruncateOptions = null,
    ...args: any[]
  ): any {
    if (values === null || values === undefined) {
      throw new TypeError(`Wrong value for Oxford Pipe provided: ${values} is not an array`);
    }

    if (conjunction === null || conjunction === '') {
      throw new TypeError(`Wrong conjunction for Oxford Pipe provided: ${conjunction} is not a word`);
    }

    let trimmedValues = values.map(OxfordPipe.trim);

    if (truncate) {
      if (truncate.wordCount > values.length) {
        throw new RangeError('The truncated word count is larger than the amount of words');
      }
      trimmedValues = trimmedValues.slice(0, truncate.wordCount);
    }

    if (trimmedValues.length < 2) {
      return trimmedValues[0] || '';
    }

    if (trimmedValues.length === 2) {
      return `${trimmedValues[0]} ${OxfordPipe.trim(conjunction)} ${trimmedValues[1]}`;
    }

    let result = '';
    for (let i = 0; i < trimmedValues.length - 1; i++) {
      result += `${OxfordPipe.trim(trimmedValues[i])}, `;
    }
    if (!truncate) {
      result += `${OxfordPipe.trim(conjunction)} ${OxfordPipe.trim(
        trimmedValues[trimmedValues.length - 1],
      )}`;
    } else {
      result += `${trimmedValues[trimmedValues.length - 1]}, ${truncate.trail}`;
    }

    return result;
  }
}
