const { sum, reverse } = require('../utils/example')

test('sum of 2 , 3', () => {
    const total = sum(2, 3)
    expect(total).toBe(5)
})

test('sum of 4, 5', () => {
    expect(sum(4, 5)).toBe(9)
})

test('reverse of apple', () => {
    expect(reverse('apple')).toBe('elppa')
})

test('reverse of empty string', () => {
    expect(reverse('')).toBe('')
})