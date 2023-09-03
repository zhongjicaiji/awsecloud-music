

function throttle(fn:Function, delay:number) {
    let last = 0;
    let timer:any = null;
    return function (...args:any) {
        //@ts-ignore
        let context = this;
   
        let now = +new Date();
        if (now - last < delay) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, delay);

        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}
export default throttle
