function sum (a) {
    return (b) =>  {
        return (c) => {
            return a+b+c
        }
    }
}

const result = sum(1)(2)(3)

console.log(result)