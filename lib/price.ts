const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianPrice(price: number): string {
  const formatted = price.toLocaleString('en-US')
  return formatted.replace(/\d/g, (d) => persianDigits[Number(d)])
}

export function toPersianNumber(num: number | string): string {
  return String(num).replace(/\d/g, (d) => persianDigits[Number(d)])
}
