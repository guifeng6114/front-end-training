import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[password]'
})
export class PasswordDirective {
    private inputArr: string[] = [];
    private lastLength = 0;

    constructor(
        private elem: ElementRef
    ) {

    }

    @HostListener('input')
    private onInput(): void {
        const value: string = this.elem.nativeElement.value;
        if (value.length > this.lastLength) {
            this.inputArr.push(value.slice(-1));
            this.elem.nativeElement.value = '•'.repeat(value.length - 1) + value.slice(-1);
            setTimeout(() => {
                this.elem.nativeElement.value = this.inputArr.map((item: string) => item = '•').join('');
            }, 1500);
        } else {
            this.inputArr.length = value.length;
            this.elem.nativeElement.value = '•'.repeat(value.length);
        }
        this.lastLength = value.length;
        console.log(this.inputArr);
        console.log(this.lastLength);
    }
}
